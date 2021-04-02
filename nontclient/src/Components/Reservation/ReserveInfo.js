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
import styles from "./Reserve.module.css";
import LoadStatus from "../../Constants/LoadStatus";
import Loading from "../Shared/Loading";
import Review from "./Review";
const UserContext = Contexts.UserContext;
const ReserveInfo = (props) => {
    let today = new Date();
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
    const [ownercheckin,setownercheckin]=useState();
    const [sittercheckin,setsittercheckin]=useState();
    const [ownercheckOut,setownercheckOut]=useState();
    const [sittercheckOut,setsittercheckOut]=useState();
    const [fetchReservationStatus, setFetchReservationStatus] = useState(
        LoadStatus.LOADING
    );

    // console.log("test"); 
    // console.log(String(reserveID));
    useEffect(() => {
        fetchReservation();
    }, [reserveID]);
    const fetchReservation = async () => {
        try {
            if (reserveID) {
                let response = await ReserveService.getReservationsByID(reserveID);
                console.log(response);
                if (response.data) {
                    setsittercheckin(response.data.nontsitter_check_in);
                    setownercheckin(response.data.nontowner_check_in);
                    setownercheckOut(response.data.nontowner_check_out);
                    setsittercheckOut(response.data.nontsitter_check_out); 
                    setshelter(response.data.shelter_id);
                    setowner(response.data.nontowner_id);
                    setPrice(response.data.price);
                    setRoom(response.data.room_id);
                    setcheckinDate(response.data.start_datetime);
                    setcheckOutDate(response.data.end_datetime);
                    setstatus(response.data.status);
                    let nontname=[];
                    let nid=[];
                    response.data.nont_id.forEach( nont=>{
                        //nontname=[...nontname,{nid:nont._id,nname:nont.name}]
                        nontname=[...nontname,nont.name]
                    });
                    setNonts(nontname);
                    setFetchReservationStatus(LoadStatus.SUCCESS);
                    console.log(checkInDate);
                    console.log(checkOutDate);
                    if((today.getDate()===(new Date(checkOutDate).getDate())
                    &&today.getMonth()===(new Date(checkOutDate).getMonth())
                    &&today.getFullYear()===(new Date(checkOutDate).getFullYear())))console.log("cancheckOut");
                }
            }            
        }
        catch (error) {
            setFetchReservationStatus(LoadStatus.FAIL);
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
                   if(!ownercheckin)
                   {let response = await ReserveService.nontOwnerCheckIn(reserveID);
                   console.log("nontOwnerCheckIn");
                   console.log(response);
                   notification.success({
                    message: "notifications",
                    description: `check-in successfully.`,
                    placement: "bottomRight",
                });
                setownercheckin(!ownercheckin);
                   }
                   else{
                    notification.error({ 
                        message: "error",
                        description: `you already check-in please wait for nont sitter check-in.`,
                        placement: "bottomRight",
                    });
                   }
                }
                else if(contextValue.userType === UserType.NONT_SITTER){
                    if(!sittercheckin)
                    {
                    let response = await ReserveService.nontSitterCheckIn(reserveID);
                    console.log("nontSitterCheckIn");
                    console.log(response);
                    notification.success({
                        message: "notifications",
                        description: `check-in successfully.`,
                        placement: "bottomRight",
                        
                    });
                    window.location.reload();                        
                    }else{
                        notification.error({ 
                            message: "error",
                            description: `you already check-in please wait for nont owner check-in.`,
                            placement: "bottomRight",
                        });  
                    }
                }
            }
            if(ownercheckin&&sittercheckin)window.location.reload();

        }
        catch(error){
            if(contextValue.userType === UserType.NONT_OWNER&&ownercheckin){
                notification.error({ 
                    message: "error",
                    description: `you already check-in please wait for nont sitter check-in.`,
                    placement: "bottomRight",
                });      
            }
            else if(contextValue.userType === UserType.NONT_SITTER&&!ownercheckin){
                notification.error({ 
                    message: "error",
                    description: `please wait for nont owner check-in.`,
                    placement: "bottomRight",
                });  
            }
            else{
            notification.error({ 
                message: "error",
                description: `Cannot Checkin.`,
                placement: "bottomRight",
            });                
            }

            console.error(error.message);
        }
    }
    const oncheckOut = async () => {
        try{
            if (reserveID) {
                
                if(contextValue.userType === UserType.NONT_OWNER){
                    if(!ownercheckOut){
                   let response = await ReserveService.nontOwnerCheckOut(reserveID);
                   console.log("nontOwnerCheckOut");
                   console.log(response);  
                   notification.success({
                    message: "notifications",
                    description: `check-out successfully.`,
                    placement: "bottomRight",
                });
                setownercheckOut(!ownercheckOut);

                    }
                    else{
                        notification.error({ 
                            message: "error",
                            description: `you already check-out please wait for nont sitter check-out.`,
                            placement: "bottomRight",
                        }); 
                    }
                }
                else if(contextValue.userType === UserType.NONT_SITTER){
                    if(!sittercheckOut){
                    let response = await ReserveService.nontSitterCheckOut(reserveID);
                    console.log("nontSitterCheckOut");
                    console.log(response);
                    notification.success({
                        message: "notifications",
                        description: `check-out successfully.`,
                        placement: "bottomRight",
                    });
                    window.location.reload();
                    }
                    else{
                        notification.error({ 
                            message: "error",
                            description: `you already check-out please wait for nont owner check-out.`,
                            placement: "bottomRight",
                        });
                    }

                }
                if(ownercheckOut&&sittercheckOut)window.location.reload();
                

            }
        }
        catch(error){
            if(contextValue.userType === UserType.NONT_OWNER&&ownercheckOut){
                notification.error({ 
                    message: "error",
                    description: `you already check-out please wait for nont sitter check-out.`,
                    placement: "bottomRight",
                });      
            }
            else if(contextValue.userType === UserType.NONT_SITTER&&!ownercheckOut){
                notification.error({ 
                    message: "error",
                    description: `please wait for nont owner check-out.`,
                    placement: "bottomRight",
                });  
            }
            else{
            notification.error({ 
                message: "error",
                description: `Cannot Checkin.`,
                placement: "bottomRight",
            }); 
            }
            console.error(error.message);
        }
    }
    // const printstatus = async (status)=>{
    //     if(status==='paid'){
    //         if(sittercheckin&&!(ownercheckin)){setstatus("paid-wait for nont owner check in");}
    //         if(!(sittercheckin)&&ownercheckin){setstatus("paid-wait for nont sitter check in");}
    //     }
    //     console.log("printstatus");
    //     console.log(status);
    //     setstatus(status);
    // }
    


    return(
        <div>
        {contextValue.userType === UserType.UNKNOWN_USER_TYPE && <h2>You are not logged in </h2>}
        {contextValue.userType !== UserType.UNKNOWN_USER_TYPE &&  
            <div className="container mt-5">
            <Loading status={fetchReservationStatus} />
            {fetchReservationStatus === LoadStatus.SUCCESS && (
            <div className="card">
                <div className="card-header text-white bg-primary "><h1 className="text-white my-1 ">Reservation Information</h1></div>
                <div className="card-body">
                    <dl className ="row">
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>Shelter Name:</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5><a href={"/shelterView/"+Shelter._id} className={styles.pageLink}>{Shelter.name}</a></h5></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>Location</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5>{Shelter.address}</h5></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>Nont Owner:</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5>{owner.name}</h5></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>Nont:</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5>
                        {/* nonts.map(nont => (<a href={"/nont/"+nont.nid} className={styles.pageLink}>{nont.nname}</a>)) */}
                        {String(nonts)}
                        </h5></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>price</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5>{(contextValue.userType === UserType.NONT_OWNER)?price:(price*0.7)}</h5></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>Room:</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5>{room.name}</h5></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>Room Type:</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><span className="badge badge-primary mr-1">{room.nont_type}</span></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>CheckIn Date:</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5>{`${days[(new Date(checkInDate).getDay())]} ${(new Date(checkInDate).getDate())} ${months[(new Date(checkInDate).getMonth())]} ${(new Date(checkInDate).getFullYear())} `}</h5></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>CheckOut Date:</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5>{`${days[(new Date(checkOutDate).getDay())]} ${(new Date(checkOutDate).getDate())} ${months[(new Date(checkOutDate).getMonth())]} ${(new Date(checkOutDate).getFullYear())}` }</h5></dd>
                        <dt className="col-12 col-lg-2 col-sm-3"><h5>status:</h5></dt>
                        <dd className="col-12 col-lg-10 col-sm-9"><h5>{status}</h5></dd>
                    </dl>
                    {contextValue.userType === UserType.NONT_OWNER && status === 'payment-pending' && <QRcode reserveId={reserveID} size={128} />}

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
                                   (status==="paid"&&  today>Date.parse(checkInDate)&&today<Date.parse(checkOutDate))&&
                                   <div className="p-3" style={{ textAlign: "center"}}>
                                        <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={oncheckIn}
                                        >
                                        checkin
                                        </button>
                                    </div>
                                }   
                            </div>
                            <div>
                                {
                                    (status==="checked-in"&&(today>Date.parse(checkOutDate)||
                                    (today.getDate()===(new Date(checkOutDate).getDate())
                                    &&today.getMonth()===(new Date(checkOutDate).getMonth())
                                    &&today.getFullYear()===(new Date(checkOutDate).getFullYear()))
                                    ))&&
                                    <div className="p-3" style={{ textAlign: "center"}}>
                                        <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={oncheckOut}
                                        >
                                        checkout
                                        </button>
                                    </div>
                                }
                            </div>
                            <div>
                                {
                                    (contextValue.userType === UserType.NONT_OWNER &&status==="checked-out")&& <Review reserveId={reserveID} shelter={Shelter} owner={owner}/>

                                }
                            </div>
                            </div>
                                   
                           
                </div>

            </div>
            )}
            
            </div>    
        }
        </div>
    );
}

export default ReserveInfo;