const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Room = require('../../Models/Room');
const NontSitter = require('../../Models/NontSitter');
const Shelters = require('../../Models/Shelters');
const Reservation = require('../../Models/Reservation');
const NontOwner = require('../../Models/NontOwner');
const Nont = require('../../Models/Nont');
const Admin = require('../../Models/Admin');

const expect = chai.expect;
chai.use(chaiHttp);

//ALL VALID DATA IN THIS TEST

//Admin info
//create
const ademail = 'Admin_test@nont.com';
const adpassword = '12345678';
const aduserType = 'admin';
const adsecret = "Kojira_secret_code";
let adtoken; //assign after login as admin

//NontSitter info
//create
const nsemail = 'NontSitter_test@nont.com';
const nspassword = '12345678';
const nsname = 'NontSitter_test';
let nstoken; //assign after login as nontsitter

//Shelter info
//create by nontsitter
const sname = 'shelter_test';
const saddress = 'address_test';
const srate = 3;
const scoordinate = {lat: 0, lng: 0};
let snont_sitter_id; //assign after create nontsitter and receive id

//Room info (for test)  
//create by nontsitter
const rname = 'room_test';
const ramount = 4;
const rprice = 999;
const rnont_type = 'medium dog';
let rshelter_id;  //assign after create shelter and receive id
//update by nontsitter
const rname_update = 'room_test01';
const ramount_update = 11;
const rprice_update = 3000;
const rnont_type_update = 'rabbit';
//update by admin (no restriction of each input but correct type)
const rprice_update2 = 9999; 
const rnont_type_update2 = 'raccoon';

let room_id; //assign after create room and receive id
let reservation_id; //assign after create reservation and receive id
let nont_owner_id;
let nont_id;
let admin_id;

describe('Start All Conditions to make NontSitter & Admin be able to use Room APIs', () => {

    it('Clear NontSitter which has the same email as test if it exists', async () => {
        await NontSitter.deleteMany({email: nsemail});
    });

    it('Clear Admin which has the same email as test if it exists', async () => {
        await Admin.deleteMany({email: ademail});
    });

    it('Create NontSitter account should be successful', (done) => {
        chai.request(app)
        .post('/nontSitters')
        .send({
            email: nsemail,
            password: nspassword,
            name: nsname,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            NontSitter.findOne({email: nsemail}).then((result) => {
                snont_sitter_id = result._id;
            });
            done();
        })
    });

    it('Login as NontSitter should be successful', (done) => {
        chai.request(app)
        .post('/nontSitters/login')
        .send({
            email: nsemail,
            password: nspassword,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.login).to.be.true;
            expect(res.body.token).to.not.be.null;
            nstoken = res.body.token;
            expect(res.body.email).to.equal(nsemail);
            expect(res.body.userType).to.equal('Nont Sitter');
            expect(res.body.name).to.equal(nsname);
            done();
        })
    });

    it('Create Admin account should be successful', (done) => {
        chai
        .request(app)
        .post('/admin/create')
        .send({
          email: ademail,
          password: adpassword,
          userType: aduserType,
          secret: adsecret,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.email).to.equal(ademail);
          expect(res.body.userType).to.equal(aduserType);
          Admin.findOne({ email: ademail}).then((result) => {
            admin_id = result._id;
          });
          done();
        });
    });

    it('Login as Admin should be successful', (done) => {
        chai.request(app)
        .post('/admin/login')
        .send({
            email: ademail,
            password: adpassword,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.login).to.be.true;
            expect(res.body.token).to.not.be.null;
            adtoken = res.body.token;
            expect(res.body.email).to.equal(ademail);
            expect(res.body.userType).to.equal('admin');
            done();
        })
    });

    it('Create Shelter should be successful', (done) => {
        chai.request(app)
        .post('/shelter')
        .set({
            authorization: 'bearer ' + nstoken,
        })   
        .send({
            name: sname,
            address: saddress,
            rate: srate,
            coordinate: scoordinate,
            nont_sitter_id: snont_sitter_id,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            rshelter_id = res.body._id;
            expect(res.body.name).to.equal(sname);
            expect(res.body.rate).to.equal(srate);
            done();
        })
    });

    it('Create NontOwner', async () => {
        const newNontOwner =  await NontOwner.create({
            email: 'NontOwner_test@nont.com',
            password: '12345678',
            name: 'NontOwner_test'
        });
        nont_owner_id = newNontOwner._id;
    });

    it('Create Nont', async () => {
        const newNont = await Nont.create({
            name: 'Nont_test',
            type: 'rabbit',
            birth_date: '2020-02-20',
            nontowner_id: nont_owner_id,
            exist: true,
        });
        nont_id = newNont._id;
    })

});

describe('Create Room By NontSitter', () => {

    it('TC4-1: Create Room should be successful', (done) => {
        chai.request(app)
        .post('/room')
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname,
            amount: ramount,
            price: rprice,
            nont_type: rnont_type,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(200);
            room_id = res.body._id;
            expect(res.body.name).to.equal(rname);
            expect(res.body.nont_type).to.equal(rnont_type);
            expect(res.body.amount).to.equal(ramount);
            expect(res.body.price).to.equal(rprice);
            done();
        })
    });

    it('TC4-2: Create Room should be Failed (detect that name is empty)', (done) => {
        chai.request(app)
        .post('/room')
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: '',
            amount: ramount,
            price: rprice,
            nont_type: rnont_type,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"name" is not allowed to be empty');
            done();
        })
    });

    it('TC4-3: Create Room should be Failed (detect that name has more than 50 characters)', (done) => {
        let char51 = '';
        for(let i=0; i<51; i++){
            char51 += 'a';
        }
        chai.request(app)
        .post('/room')
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: char51,
            amount: ramount,
            price: rprice,
            nont_type: rnont_type,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"name" length must be less than or equal to 50 characters long');
            done();
        })
    });

    it('TC4-4: Create Room should be Failed (detect that amount is 0)', (done) => {
        chai.request(app)
        .post('/room')
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname,
            amount: 0,
            price: rprice,
            nont_type: rnont_type,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"amount" must be greater than or equal to 1');
            done();
        })
    });

    it('TC4-5: Create Room should be Failed (detect that amount is more than 20)', (done) => {
        chai.request(app)
        .post('/room')
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname,
            amount: 21,
            price: rprice,
            nont_type: rnont_type,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"amount" must be less than or equal to 20');
            done();
        })
    });

    it('TC4-6: Create Room should be Failed (detect that price is 0)', (done) => {
        chai.request(app)
        .post('/room')
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname,
            amount: ramount,
            price: 0,
            nont_type: rnont_type,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"price" must be greater than or equal to 1');
            done();
        })
    });

    it('TC4-7: Create Room should be Failed (detect that price is more than 3000)', (done) => {
        chai.request(app)
        .post('/room')
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname,
            amount: ramount,
            price: 3001,
            nont_type: rnont_type,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"price" must be less than or equal to 3000');
            done();
        })
    });

    it('TC4-8: Create Room should be Failed (detect that nont_type is invalid)', (done) => {
        chai.request(app)
        .post('/room')
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname,
            amount: ramount,
            price: rprice,
            nont_type: 'raccoon',     //there's no raccoon in valid nont's types
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"nont_type" must be one of [large dog, medium dog, small dog, cat, hamster, rabbit, bird]');
            done();
        })
    });

});

describe('Get Room By NontSitter (SUCCESS)', () => {

    it('TC4-9: Get Room by id should be successful', (done) => {
        chai.request(app)
        .get('/room/id/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal(room_id);
            expect(res.body.name).to.equal(rname);
            expect(res.body.nont_type).to.equal(rnont_type);
            expect(res.body.amount).to.equal(ramount);
            expect(res.body.price).to.equal(rprice);
            expect(res.body.shelter_id).to.equal(rshelter_id);
            expect(res.body.exist).to.be.true;
            done();
        })
    });

    it('TC4-10: Get Room by Shelter\'s id should be successful', (done) => {
        chai.request(app)
        .get('/room/shelterid/' + rshelter_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body[0]._id).to.equal(room_id);
            expect(res.body[0].name).to.equal(rname);
            expect(res.body[0].nont_type).to.equal(rnont_type);
            expect(res.body[0].amount).to.equal(ramount);
            expect(res.body[0].price).to.equal(rprice);
            expect(res.body[0].shelter_id).to.equal(rshelter_id);
            expect(res.body[0].exist).to.be.true;
            done();
        })
    });
})

describe('Get Room By Admin (SUCCESS)', () => {

    it('TC4-11: Get Room by id should be successful', (done) => {
        chai.request(app)
        .get('/room/admin_get/' + room_id)
        .set({
            authorization: 'bearer ' + adtoken,
        })
        .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal(room_id);
            expect(res.body.name).to.equal(rname);
            expect(res.body.nont_type).to.equal(rnont_type);
            expect(res.body.amount).to.equal(ramount);
            expect(res.body.price).to.equal(rprice);
            expect(res.body.shelter_id).to.equal(rshelter_id);
            expect(res.body.exist).to.be.true;
            done();
        })
    });
})

describe('Update Room By NontSitter', () => {

    it('TC4-12: Update Room should be successful', (done) => {
        chai.request(app)
        .patch('/room/update/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname_update,
            amount: ramount_update,
            price: rprice_update,
            nont_type: rnont_type_update,
            shelter_id: rshelter_id,           
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal(room_id);
            expect(res.body.name).to.equal(rname_update);
            expect(res.body.nont_type).to.equal(rnont_type_update);
            expect(res.body.amount).to.equal(ramount_update);
            expect(res.body.price).to.equal(rprice_update);
            expect(res.body.shelter_id).to.equal(rshelter_id);
            expect(res.body.exist).to.be.true;
            done();            
        })
    });

    it('TC4-13: Update Room should be Failed (detect that name is empty)', (done) => {
        chai.request(app)
        .patch('/room/update/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: '',
            amount: ramount_update,
            price: rprice_update,
            nont_type: rnont_type_update,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"name" is not allowed to be empty');
            done();
        })
    });

    it('TC4-14: Update Room should be Failed (detect that name has more than 50 characters)', (done) => {
        let char101 = '';
        for(let i=0; i<101; i++){
            char101 += '0';
        }
        chai.request(app)
        .patch('/room/update/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: char101,
            amount: ramount_update,
            price: rprice_update,
            nont_type: rnont_type_update,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"name" length must be less than or equal to 50 characters long');
            done();
        })
    });

    it('TC4-15: Update Room should be Failed (detect that amount is 0)', (done) => {
        chai.request(app)
        .patch('/room/update/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname_update,
            amount: 0,
            price: rprice_update,
            nont_type: rnont_type_update,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"amount" must be greater than or equal to 1');
            done();
        })
    });

    it('TC4-16: Update Room should be Failed (detect that amount is more than 20)', (done) => {
        chai.request(app)
        .patch('/room/update/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname_update,
            amount: 50,
            price: rprice_update,
            nont_type: rnont_type_update,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"amount" must be less than or equal to 20');
            done();
        })
    });

    it('TC4-17: Update Room should be Failed (detect that price is 0)', (done) => {
        chai.request(app)
        .patch('/room/update/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname_update,
            amount: ramount_update,
            price: 0,
            nont_type: rnont_type_update,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"price" must be greater than or equal to 1');
            done();
        })
    });

    it('TC4-18: Update Room should be Failed (detect that price is more than 3000)', (done) => {
        chai.request(app)
        .patch('/room/update/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname_update,
            amount: ramount_update,
            price: 1000000,
            nont_type: rnont_type_update,
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"price" must be less than or equal to 3000');
            done();
        })
    });

    it('TC4-19: Update Room should be Failed (detect that nont_type is invalid)', (done) => {
        chai.request(app)
        .patch('/room/update/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .send({
            name: rname_update,
            amount: ramount_update,
            price: rprice_update,
            nont_type: '',      //nont_type cannot be empty 
            shelter_id: rshelter_id,
        })
        .end((err, res)=> {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('"nont_type" must be one of [large dog, medium dog, small dog, cat, hamster, rabbit, bird]');
            done();
        })
    });

});

describe('Update Room By Admin', () => {
    it('TC4-20: Update Room should be successful', (done) => {
        chai.request(app)
        .put('/room/admin_update/' + room_id)
        .set({
            authorization: 'bearer ' + adtoken,
        })
        .send({
            price: rprice_update2,
            nont_type: rnont_type_update2,
        }).end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal(room_id);
            expect(res.body.name).to.equal(rname_update);
            expect(res.body.nont_type).to.equal(rnont_type_update2);
            expect(res.body.amount).to.equal(ramount_update);
            expect(res.body.price).to.equal(rprice_update2);
            expect(res.body.shelter_id).to.equal(rshelter_id);
            expect(res.body.exist).to.be.true;
            done();              
        })
    });
});

describe('Delete Room By NontSitter & Remove Room By Admin', () => {
    it('Create Reservation of the room', async () => {
        const newReservation = await Reservation.create({
            nont_id: [nont_id],
            nontowner_id: nont_owner_id,
            room_id: room_id,
            shelter_id: rshelter_id,
            nontsitter_id: snont_sitter_id,
            start_datetime: '2021-04-29',
            end_datetime: '2021-04-30',
            price: 1000,
            status: 'payment-pending',
            nontsitter_check_in: 'false',
            nontsitter_check_out: 'false',
            nontowner_check_in: 'false',
            nontowner_check_out: 'false',
            reserve_datetime: '2021-04-27',
        });
        reservation_id = newReservation._id;
    });

    it('TC4-21: Delete Room should be failed (detect that there is \'payment-pending\' reservation)', (done) => {
        chai.request(app)
        .patch('/room/delete/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Cannot delete room. Related reservtion is still not completed.');
            done();        
        })
    });   

    it('Update the status of the reservation to \'paid\'', async () => {
        await Reservation.findByIdAndUpdate( reservation_id, {status: 'paid'} );
    });
    
    it('TC4-22: Delete Room should be failed (detect that there is \'paid\' reservation)', (done) => {
        chai.request(app)
        .patch('/room/delete/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Cannot delete room. Related reservtion is still not completed.');
            done();        
        })
    });   

    it('Update the status of the reservation to \'checked-in\'', async () => {
        await Reservation.findByIdAndUpdate( reservation_id, {status: 'checked-in'} );
    });

    it('TC4-23: Remove Room should be failed (detect that there is \'checked-in\' reservation)', (done) => {
        chai.request(app)
        .delete('/room/remove/' + room_id)
        .set({
            authorization: 'bearer ' + adtoken,
        })
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Cannot delete room. Related reservtion is still not completed.');
            done();        
        })
    }); 

    it('Update the status of the reservation to \'checked-out\'', async () => {
        await Reservation.findByIdAndUpdate( reservation_id, {status: 'checked-out'} );
    });

    it('TC4-24: Delete Room should be successful', (done) => {
        chai.request(app)
        .patch('/room/delete/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal(room_id);
            expect(res.body.name).to.equal(rname_update);
            expect(res.body.nont_type).to.equal(rnont_type_update2); 
            expect(res.body.amount).to.equal(ramount_update);
            expect(res.body.price).to.equal(rprice_update2); 
            expect(res.body.shelter_id).to.equal(rshelter_id);
            expect(res.body.exist).to.be.false;
            done();        
        })
    });

    it('TC4-25: Get Room by id should be failed (detect that Room doesn\'t exist)', (done) => {
        chai.request(app)
        .get('/room/id/' + room_id)
        .set({
            authorization: 'bearer ' + nstoken,
        })
        .end((err,res) => {
            expect(res).to.have.status(404);
            expect(res.text).to.equal('Room with this id is no longer exist.');
            done();
        })
    });

    it('TC4-26: Remove Room should be successful', (done) => {
        chai.request(app)
        .delete('/room/remove/' + room_id)
        .set({
            authorization: 'bearer ' + adtoken,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body._id).to.equal(room_id);
            expect(res.body.name).to.equal(rname_update);
            expect(res.body.nont_type).to.equal(rnont_type_update2);
            expect(res.body.amount).to.equal(ramount_update);
            expect(res.body.price).to.equal(rprice_update2);
            expect(res.body.shelter_id).to.equal(rshelter_id);
            expect(res.body.exist).to.be.false;
            done();        
        })
    });

});

describe("Test Finished", () => {
    it("Clear all data that were used for test", async () => { 
        await Reservation.findByIdAndDelete(reservation_id);
        await Nont.findByIdAndDelete(nont_id)
        await NontOwner.findByIdAndDelete(nont_owner_id);
        await Room.findByIdAndDelete(room_id);
        await Shelters.findByIdAndDelete(rshelter_id);
        await NontSitter.findByIdAndDelete(snont_sitter_id);
        await Admin.findByIdAndDelete(admin_id);
    })
});
