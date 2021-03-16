import React, { useContext, useState, useEffect } from "react";
import Contexts from "../../Utils/Context/Contexts";
import ReserveService from "../../Services/ReserveService";
import UserType from "../../Constants/UserType";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import NontService from "../../Services/NontService";
import QRcode from "../../Components/Payment/QRcode";
import { DatePicker, Select, Statistic, notification } from "antd";
import moment, { months } from "moment";
const UserContext = Contexts.UserContext;
const ReserveInfo = (props) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const contextValue = useContext(UserContext);
    const {reserveID} = useParams();
    const [Shelter, setshelter] = useState([]);
    const [owner, setowner] = useState([]);
    const [nonts, setNonts] = useState([]);
    const [price, setPrice] = useState(0);
    const [room, setRoom] = useState([]);
    const [checkInDate,setcheckinDate] = useState();
    const [checkOutDate,setcheckOutDate]= useState();
    const [status,setstatus]= useState();

    console.log("test"); 
    console.log(String(reserveID));
    useEffect(() => {
        fetchReservation();
    }, [reserveID]);
    const fetchReservation = async () => {
        try {
            if (reserveID) {
                let response = await ReserveService.getReservationsByID(reserveID);
                console.log(response);
                if (response.data) {
                    setshelter(response.data.shelter_id);
                    setowner(response.data.nontowner_id);
                    setPrice(response.data.price);
                    setRoom(response.data.room_id);
                    setcheckinDate(Date(response.data.start_datetime));
                    setcheckOutDate(Date(response.data.end_datetime));
                    setstatus(response.data.status);
                    let nontname=[];
                    response.data.nont_id.forEach( nont=>{
                        nontname=[...nontname,nont.name]
                    });
                    setNonts(nontname);
                    console.log(typeof(checkInDate));
                    console.log(typeof(checkOutDate));


                }
            }            
        }
        catch (error) {
            console.error(error.message);
        }
    }
    const oncancel = async () => {
        try{
            if (reserveID) {
                let response = await ReserveService.cancelReservation(reserveID);
                console.log(response);
                window.location.reload();
            }
            notification.success({
                message: "notifications",
                description: `cancel reservation successfully.`,
                placement: "bottomRight",
            });
        }
        catch(error){
            notification.error({ 
                message: "error",
                description: `Cannot cancel reservation.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }
    }
    const oncheckIn = async () => {
        try{
            if (reserveID) {
                
                if(contextValue.userType === UserType.NONT_OWNER){
                   let response = await ReserveService.nontOwnerCheckIn(reserveID);
                   console.log("nontOwnerCheckIn");
                   console.log(response);
                }
                else if(contextValue.userType === UserType.NONT_SITTER){
                    let response = await ReserveService.nontSitterCheckIn(reserveID);
                    console.log("nontSitterCheckIn");
                    console.log(response);
                }
                
            }
            window.location.reload();
            notification.success({
                message: "notifications",
                description: `check-in successfully.`,
                placement: "bottomRight",
            });
            
        }
        catch(error){
            notification.error({ 
                message: "error",
                description: `Cannot Checkin.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }
    }
    const oncheckOut = async () => {
        try{
            if (reserveID) {
                
                if(contextValue.userType === UserType.NONT_OWNER){
                   let response = await ReserveService.nontOwnerCheckOut(reserveID);
                   console.log("nontOwnerCheckOut");
                   console.log(response);
                }
                else if(contextValue.userType === UserType.NONT_SITTER){
                    let response = await ReserveService.nontSitterCheckOut(reserveID);
                    console.log("nontSitterCheckOut");
                    console.log(response);
                }
                window.location.reload();
                
                notification.success({
                    message: "notifications",
                    description: `check-out successfully.`,
                    placement: "bottomRight",
                });
            }
        }
        catch(error){
            notification.error({ 
                message: "error",
                description: `Cannot CheckOut.`,
                placement: "bottomRight",
            });
            console.error(error.message);
        }
    }
    


    return(
        <div>
        {contextValue.userType === UserType.UNKNOWN_USER_TYPE && <h2>You are not logged in </h2>}
        {contextValue.userType !== UserType.UNKNOWN_USER_TYPE &&  
            <div className="container mt-5">
            <div className="card">
                <div className="card-header text-white bg-primary "><h1 className="text-white my-1 ">Reservation Information</h1></div>
                <div className="card-body">
                    <dl className ="row">
                        <dt className="col-sm-2"><h5>ShelterName:</h5></dt>
                        <dd className="col-sm-10"><h5>{Shelter.name}</h5></dd>
                        <dt className="col-sm-2"><h5>Location</h5></dt>
                        <dd className="col-sm-10"><h5>{Shelter.address}</h5></dd>
                        <dt className="col-sm-2"><h5>Nontowner:</h5></dt>
                        <dd className="col-sm-10"><h5>{owner.name}</h5></dd>
                        <dt className="col-sm-2"><h5>Nont:</h5></dt>
                        <dd className="col-sm-10"><h5>{String(nonts)}</h5></dd>
                        <dt className="col-sm-2"><h5>price</h5></dt>
                        <dd className="col-sm-10"><h5>{price}</h5></dd>
                        <dt className="col-sm-2"><h5>Room:</h5></dt>
                        <dd className="col-sm-10"><h5>{room.name}</h5></dd>
                        <dt className="col-sm-2"><h5>RoomType:</h5></dt>
                        <dd className="col-sm-10"><span className="badge badge-primary mr-1">{room.nont_type}</span></dd>
                        <dt className="col-sm-2"><h5>CheckIn Date:</h5></dt>
                        <dd className="col-sm-10"><h5>{`${days[(new Date(checkInDate).getDay())]} ${(new Date(checkInDate).getDate())} ${months[(new Date(checkInDate).getMonth())]} ${(new Date(checkInDate).getFullYear())} `}</h5></dd>
                        <dt className="col-sm-2"><h5>CheckOut Date:</h5></dt>
                        <dd className="col-sm-10"><h5>{`${days[(new Date(checkInDate).getDay())]} ${(new Date(checkInDate).getDate())} ${months[(new Date(checkInDate).getMonth())]} ${(new Date(checkInDate).getFullYear())}` }</h5></dd>
                        <dt className="col-sm-2"><h5>status:</h5></dt>
                        <dd className="col-sm-10"><h5>{status}</h5></dd>
                    </dl>
                    {status==="payment-pending"&&(QRcode([reserveID,280]))}
                    
                        <div >
                            <div>
                                {((contextValue.userType === UserType.NONT_OWNER)&&
                                  (
                                    status==="payment-pending"||status==="paid"
                                  )
                                 )&& 
                                <input className="my-1 btn btn-danger" type="button" onClick={oncancel} value="cancel"/>
                                
                                }
                            </div>
                            <div>
                                {
                                   (status==="paid")&&<input className="d-flex align-content-center my-1 btn btn-primary" type="button" onClick={oncheckIn} value="checkin"/>
                                }
                                
                            </div>
                            <div>
                                {
                                    (status==="checked-in")&&<input className="my-1 btn btn-primary" type="button" onClick={oncheckOut} value="checkout"/>
                                }
                                
                            </div>
                            <div>
                                {
                                     status==="checked-out"&&<input className="my-1 btn btn-primary" type="button"   value="review"/>

                                }
                                
                            </div>
                        </div>
                </div>

            </div>
            
            </div>    
        }
        </div>
    );
}

export default ReserveInfo;