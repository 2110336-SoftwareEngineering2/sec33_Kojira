"use strict";
const InterfaceController = require("./InterfaceController");

class ReservationController extends InterfaceController {
    constructor() {
        super();
        this.validator = this.joi.object({
            nont_id: this.joi.array().items(this.joiOid.objectId()).required(),
            room_id: this.joiOid.objectId().required(),
            start_datetime: this.joi.date().required(),
            end_datetime: this.joi.date().required(),
            price: this.joi.number().integer().min(1).required(),
        });
    }

    // GET 
    getReservation = async (req,res) => {
        try {            
            const reservation = await this.Reservation.find(); 
            return res.send(reservation);
        }
        catch (error){
            return res.status(500).send('Internal Server Error, Please try again');
        }
    }
    getReservationByID = async (req,res) => {
        try{            
            const reservation = await this.Reservation.findById(req.params.id)
            .populate('nont_id').populate('nontowner_id').populate('room_id').populate('shelter_id').populate('nontsitter_id'); 
            return res.send(reservation);
        }
        catch (error){
            //console.log(error.message);
            return res.status(500).send('Internal Server Error, Please try again');
        }
    }

    getReservationUnpopByID = async (req,res) => {
        try{            
            const reservation = await this.Reservation.findById(req.params.id);
            return res.send(reservation);
        }
        catch (error){
            //console.log(error.message);
            return res.status(500).send('Internal Server Error, Please try again');
        }
    }

    getReservationByNontOwnerID =  async (req,res) => { //nont owner id
        try{            
            const reservation = await this.Reservation.find({nontowner_id: req.params.id})
            .populate('nont_id').populate('room_id').populate('shelter_id'); 
            return res.send(reservation);
        }
        catch (error){
            return res.status(500).send('Internal Server Error, Please try again');
        }
    }
    getReservationByNontSitterID = async (req, res) => { //nont sitter id
        try{            
            const reservation = await this.Reservation.find({nontsitter_id: req.params.id}) 
            .populate('nont_id').populate('room_id').populate('shelter_id').populate('nontowner_id'); 
            return res.send(reservation);
        }
        catch (error){
            return res.status(500).send('Internal Server Error, Please try again');
        }
    }
    getReservationByShelterID = async (req, res) => { //shelter id
        try{            
            const reservation = await this.Reservation.find({shelter_id: req.params.id})
            .populate('nont_id').populate('room_id');
            return res.send(reservation);
        }
        catch (error){
            return res.status(500).send('Internal Server Error, Please try again');
        }
    }

    getReservationByRoomID = async (req, res) => { // room id
        try {
            const reservation = await this.Reservation.find({room_id: req.params.id});
            return res.send(reservation);
        }
        catch (error) {
            return res.status(500).send('Internal Server Error, Please try again');
        }
    }

    // POST create new reservation
    create = async (req, res) => {
        const validationResult = this.validator.validate(req.body);
        if (validationResult.error){
            return res.status(400).send(validationResult.error.details[0].message);
        }
        try{ //assume that the selected nonts (to reserve) are all belongs to 1 nontowner
            //console.log(this.NontOwner.Email)
            const now = new Date();
            //1. check if start_datetime must less than end_datetime
            if(req.body.end_datetime <= req.body.start_datetime) return res.status(403).send("start/end datetime is invalid");
           
            const room = await this.Room.findById(req.body.room_id);
            //2. check if the number of nont doens't exceed the room capacity (room.amount)
            if((req.body.nont_id).length > room.amount) return res.status(403).send('The room capacity is not enough for all nonts');

            //3. check if the supported nont type of room matches with the type of nont
            let nont;
            for(const element of req.body.nont_id){
                nont = await this.Nont.findById(element);
                if(nont.type !== room.nont_type) return res.status(403).send('Nont type of some nonts is not supported for the room');
            }

            //*cancel all reservations that are not paid within 1 day (PUT update status:cancelled)
            const unpaidReservation = await this.Reservation.find({status:'payment-pending'});
            for(const element of unpaidReservation) {
                if(new Date(element.reserve_datetime) < new Date(now.getTime()-1000*3600*24)) {
                    await this.Reservation.updateOne({_id:element._id},{status:'cancelled', cancel_datetime:now.toString()})
                }
            }

            //4. check if the selected nont room is available at the time by looping reservation
            const sameRoom = await this.Reservation.find({room_id: req.body.room_id});
            for(const element of sameRoom){
                if(element.status !== 'checked-out' && element.status !== 'cancelled') {
                    if((new Date(req.body.start_datetime)>=new Date(element.start_datetime) && new Date(req.body.start_datetime)<=new Date(element.end_datetime)) 
                    || (new Date(req.body.end_datetime)>=new Date(element.start_datetime) && new Date(req.body.end_datetime)<=new Date(element.end_datetime))
                    || (new Date(req.body.start_datetime)<new Date(element.start_datetime) && new Date(req.body.end_datetime)>new Date(element.end_datetime))){
                        return res.status(403).send('The room is not available in this period of time');
                    }
                }
            }

            //5. check if some nonts in req.body.nont_id are already reserved in other rooms in the intersect time as selected time
            const sameNontOwner = await this.Reservation.find({nontowner_id: nont.nontowner_id});
            for(const element of sameNontOwner){
                if(element.status !== 'checked-out' && element.status !== 'cancelled') {
                    if((new Date(req.body.start_datetime)>=new Date(element.start_datetime) && new Date(req.body.start_datetime)<=new Date(element.end_datetime)) 
                    || (new Date(req.body.end_datetime)>=new Date(element.start_datetime) && new Date(req.body.end_datetime)<=new Date(element.end_datetime))
                    || (new Date(req.body.start_datetime)<new Date(element.start_datetime) && new Date(req.body.end_datetime)>new Date(element.end_datetime))){
                        if((element.nont_id).some((e) => (req.body.nont_id).includes(e.toString()))) { //really confused why toString() is needed???!!!
                            return res.status(403).send('Some nonts have been reserved in this period of time');
                        }
                    }
                }
            }

            const shelter = await this.Shelter.findById(room.shelter_id);

            const newBody = {
                nont_id: req.body.nont_id,
                nontowner_id: nont.nontowner_id,
                room_id: req.body.room_id,
                shelter_id: room.shelter_id,
                nontsitter_id: shelter.nont_sitter_id,
                start_datetime: new Date(req.body.start_datetime).toString(),
                end_datetime: new Date(req.body.end_datetime).toString(),
                //price: room.price * numberOfDay(req.body.start_datetime,req.body.end_datetime),
                price: req.body.price,
                status: 'payment-pending',
                nontsitter_check_in: false,
                nontsitter_check_out: false,
                nontowner_check_in: false,
                nontowner_check_out: false,
                reserve_datetime: now.toString(),
                pay_datetime: '',
                //transaction_id: '',
                check_in_datetime: '',
                check_out_datetime: '',
                cancel_datetime: ''
            };
            const newReservation = await this.Reservation.create(newBody);

            const nontowner = await this.NontSitter.findById(newBody.nontsitter_id)
            
            //notification
            const info = {
                notiType : "Reservation",
                ReciverEmail : NontSitter.email,
                subject : "Reservation",
                Extra : "......." //will add more later to fill in content for each behavior
            }
            NotificationController.setNotificationBehavior(this.ReserveNotification)
            NotificationBehavior.notify(info)
    
            return res.send(newReservation);
        }
        catch(error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error, Please try again");
        }
    }

    // PUT update status
    nontSitterCheckIn = async (req, res) => {
        try{
            const reservation = await this.Reservation.findById(req.params.id); //reservation id
            const now = new Date();
            //check if nontowner check in? to verify check in (done by nont sitter)
            if(reservation.nontowner_check_in === true && reservation.status === 'paid') {
                const newQuery = {_id: this.mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const newUpdate = {status: 'checked-in', nontsitter_check_in: true};
                const updatedReservation = await this.Reservation.findByIdAndUpdate(newQuery,newUpdate);
                return res.send(updatedReservation);      
            } else return res.status(403).send("Cannot verify check-in because nontowner still doesn't check in nont");

        } 
        catch (error) {            
            return res.status(500).send("Internal Server Error, Please try again");
        }
    }
 
    nontOwnerCheckIn = async (req, res) => {
        try{
            const reservation = await this.Reservation.findById(req.params.id); //reservation id
            //check the status is "paid"?
            if(reservation.status !== 'paid') return res.status(403).send("Cannot check in because the reservation is not paid");
           
            //check moment time >= start date time ?
            const now = new Date();
            if(now < new Date(reservation.start_datetime)) return res.status(403).send("Cannot check in before the start time");

            const newQuery = {_id: this.mongoose.Types.ObjectId(req.params.id)}; //reservation id
            const newUpdate = {nontowner_check_in: true, check_in_datetime: now.toString()};
            const updatedReservation = await this.Reservation.findByIdAndUpdate(newQuery,newUpdate);
            return res.send(updatedReservation);            
        } 
        catch (error) {           
            console.log(error.message);
            return res.status(500).send("Internal Server Error, Please try again");
        }
    }

    nontSitterCheckOut = async (req, res) => {
        try{
            const reservation = await this.Reservation.findById(req.params.id); //reservation id
            const now = new Date();
            //check if nontowner check out? to verify check out (done by nont sitter)
            if(reservation.nontowner_check_out === true && reservation.status === 'checked-in') {
                const newQuery = {_id: this.mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const newUpdate = {status: 'checked-out', nontsitter_check_out: true};
                const updatedReservation = await this.Reservation.findByIdAndUpdate(newQuery,newUpdate);
                return res.send(updatedReservation);      
            } else return res.status(403).send("Cannot verify check-out because nontowner still doesn't check out nont");

        } 
        catch (error) {            
            return res.status(500).send("Internal Server Error, Please try again");
        }
    }
 
    nontOwnerCheckOut = async (req, res) => {
        try{
            const reservation = await this.Reservation.findById(req.params.id); //reservation id
            //check the status is "checked-in"?
            if(reservation.status !== 'checked-in') res.status(403).send("Cannot check out because nont owner still doesn't check-in nont");
          
            //check moment time <= end date time ?
            const now = new Date();
            if(now > new Date(reservation.end_datetime)) console.log("Fine payment is needed due to late check-out!");
    
            const newQuery = {_id: this.mongoose.Types.ObjectId(req.params.id)}; //reservation id
            const newUpdate = {nontowner_check_out: true, check_out_datetime: now.toString()};
            const updatedReservation = await this.Reservation.findByIdAndUpdate(newQuery,newUpdate);
            return res.send(updatedReservation);      
        } 
        catch (error) {            
            return res.status(500).send("Internal Server Error, Please try again");
        }
    }

    adminUpdateReservation = async (req, res) => {
        try {
          const newQuery = {_id: req.params.id};
          const newBody = req.body;
          const updatedReservation = await this.Reservation.findByIdAndUpdate(newQuery, newBody);
          return res.send(updatedReservation);
        }
        catch(error) {
          return res.status(500).send("Internal Server Error, Please try again");
        }
    }

    /*
    PATCH /reservation/cancel/:id
        change status of reservation to cancelled
    */
    cancelReservation = async (req, res) => {
        try{
            const reservation = await this.Reservation.findById(req.params.id); //reservation id

            //check if the status is 'payment-pending'
            if(reservation.status === 'checked-in') return res.status(403).send("Cannot cancel because nonts are checked-in");
            if(reservation.status === 'checked-out') return res.status(403).send("Cannot cancel because nonts are checked-out");
            if(reservation.status === 'cancelled') return res.status(403).send("The reservation is already cancelled");
    
            //check if cancel at least 24hours before start_datetime
            const now = new Date();
            const date = new Date();
            if(date.setDate(now.getDate()+1) > new Date(reservation.start_datetime)) return res.status(403).send('Reservation cancel within 24 hours before start_datetime is not allowed');
        
            const newQuery = {_id: this.mongoose.Types.ObjectId(req.params.id)}; //reservation id
            const newUpdate = {status: 'cancelled', cancel_datetime: now.toString()};
            const updatedReservation = await this.Reservation.findByIdAndUpdate(newQuery,newUpdate);
            
            //notification
            const info = {
                notiType : "Reservation",
                ReciverEmail : NontSitter.email,
                subject : "Reservation",
                Extra : "......." //will add more later to fill in content for each behavior
            }
            NotificationBehavior.setNotificationBehavior(this.CancelNotification)
            NotificationBehavior.notify(info)
            
            return res.send(updatedReservation);      
        }
        catch(error){
            return res.status(500).send("Internal Server Error, Please try again");
        }
    }

    /*
    DELETE /reservation/remove/:id
    */
    remove = async (req, res) => {
        try{
            const reservation = await this.Reservation.findById(req.params.id); //reservation id
            if (reservation.status === 'payment-pending') {
                const newQuery = { _id: this.mongoose.Types.ObjectId(req.params.id)}; //reservation id
                const deletedReservation = await this.Reservation.findByIdAndDelete(newQuery);
                return res.send(deletedReservation);
            }
            else 
                return res.status(403).send("Cannot delete because the reservation is paid")
        }
        catch(error){
            return res.status(500).send("Internal Server Error, Please try again");
        }
    }
}

module.exports = new ReservationController();