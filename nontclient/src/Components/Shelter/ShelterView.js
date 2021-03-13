import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import UserType from "../../Constants/UserType";
        
function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer?.data);
    let len = bytes.byteLength;
    /*
    console.log("----Infunction----");
    console.log(buffer?.data);
    console.log("typeofbuffer")
    console.log(typeof(bytes))
    console.log("lengthofbuffer");
    console.log(len);
    console.log("----Endoffunction----");
    */
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }    
    return window.btoa(binary);
}
// function ToBase64(bufferdata) {
//     console.log(typeof(bufferdata));
//     var thumb = new Buffer.from(bufferdata).toString('base64');
//     return thumb;
// }
const UserContext = Contexts.UserContext;
const ShelterView = (props) => {
    const contextValue = useContext(UserContext);
    const [shelter, setShelter] = useState([]);
    const [rooms, setRooms] = useState([]);
    const {shelterID} = useParams();
    useEffect( () => {
        async function fetchShelter() {
            try {
                if (shelterID){
                    const response = await ShelterService.getShelterByID(shelterID); 
                    if (response.data) {
                        setShelter(response.data);
                    }
                } 
                
                console.log("---useEffect3----");
                console.log(shelter?.picture?.[0]?.img);
                console.log(shelter?.picture?.[0]?.img?.data);
                console.log(typeof (shelter?.picture?.[0]?.img.data));
                console.log(arrayBufferToBase64(shelter?.picture?.[0]?.img));
                console.log(Buffer.from(shelter?.picture?.[0]?.img?.data).toString('base64'))
                console.log("---EndOFuseEffect3----");
                
            }
            catch (error) {
                console.error(error.message);
            }
        }     
        fetchShelter();   
    }, [shelterID]);
    useEffect( () => {
        async function fetchRooms() {
            try {              
                if (shelterID){
                    const response = await RoomService.getRoomByShelterID(shelterID); 
                    if (response.data) {
                        setRooms(response.data);
                    }
                } 
            }
            catch (error) {
                console.error(error.message);
            }
        }     
        fetchRooms();   
    }, [shelterID]);
    return(

        <div className="container">

            <div className="card mt-3">
                <div className="card-header text-white bg-primary ">
                    <h1 className="my-1 text-left">{shelter.name} </h1>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                        <img className="align-self-start mr-3 w-50" src={`data:${shelter?.picture?.[0]?.contentType};base64,${arrayBufferToBase64(shelter?.picture?.[0]?.img)}`} alt="shelter image"/>
                        </div>
                        <div className="col-md-6">
                            <div className="media-body w-50">
                                <div className="mw-100">
                                    <h5 className="mb-1 mr-1">description </h5>
                                    <p className="mw-100">{shelter.description}</p>
                                <hr/>
                                </div>
                                <div>
                                    <h5 className="mb-1 mr-1">phone number </h5>
                                    <p>{shelter.phoneNumber}</p>
                                <hr className="mw-100"/>
                                </div> 
                                <div>
                                    <h5 className="mb-1 mr-1">address </h5>
                                    <p>{shelter.address}</p>
                                <hr className="mw-100"/>
                                </div>
                                <div>
                                    <h5 className="mb-1 mr-1">rate </h5>
                                    <p>{shelter.rate}</p>
                                    <i className="fas fa-star-half-alt-warning"></i>


                                <hr className="mw-100"/>
                                </div>                            
                                <div>
                                    <h5 className="mb-1 mr-1">coordinate </h5>
                                    
                                    <p>{"latitude :"+shelter?.coordinate?.lat}</p>
                                    <p>{"longtitude:"+shelter?.coordinate?.lng}</p>
                                    {/* <p>{`data:${shelter?.picture[0]?.contentType};base64,${shelter?.picture[0]?.name}`}</p> */}
                                    <p>{`data:${shelter?.picture?.[0]?.contentType};base64,`}</p>
                                    <p>{//Buffer.from(shelter?.picture?.[0]?.img?.data).toString('base64')
                                    }</p>
                                    
                                    
                                <hr/>
                                </div> 
                                <div>
                                    <h5 className="mb-1 mr-1">support type </h5>
                                    <div>
                                    {
                                    shelter?.supported_type?.map((type)=>{
                                        return(                                        
                                            <span className="badge badge-primary mr-1" key={type}>{type}</span>                                        
                                        );
                                        
                                    }
                                    )
                                    }
                                    </div>
                                <hr className="mw-100"/>
                                </div>                                  
                            </div>
                        </div>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item active">room</li>
                        {
                            rooms.map((room)=>{
                                return(     
                                    <li className="list-group-item" key={room._id}>
                                        
                                        <dl className="row">
                                            <dt className="col-md-2">name</dt>
                                            <dd className="col-md-10">{room.name}</dd>
                                            <dt className="col-md-2">nont type</dt>
                                            <dd className="col-md-10"><span className="badge badge-primary mr-1">{room.nont_type}</span></dd>
                                            <dt className="col-md-2">amount</dt>
                                            <dd className="col-md-10">{room.amount}</dd>
                                            <dt className="col-md-2">price</dt>
                                            <dd className="col-md-10">{room.price}</dd>
                                        </dl> 
                                        {
                                            contextValue.userType === UserType.NONT_OWNER&&(
                                                <a className="btn btn-primary mt-0" href="#" role="button">reserve</a>

                                            )
                                        }       
                                    </li>
                                );
                            })
                        }

                    </ul>                    
                </div>
            </div>


        </div>

    );



}
export default ShelterView;