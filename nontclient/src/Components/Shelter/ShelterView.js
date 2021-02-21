import React, { useContext, useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import UserType from "../../Constants/UserType";


const UserContext = Contexts.UserContext;

const ShelterView = (props) => {
    const contextValue = useContext(UserContext);
    const [shelter, setShelter] = useState([]);
    const [rooms, setRooms] = useState([]);
    const {shelterID} = useParams();
    useEffect( () => {
        async function fetchShelter() {
            try {
                if (contextValue._id){
                    const response = await ShelterService.getShelterByID(shelterID); 
                    console.log(response);
                    if (response.data) {
                        setShelter(response.data);
                    }
                } 
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

            <div class="card mt-3">
                <div class="card-header text-white bg-primary ">
                    <h1 className="my-1 text-left">{shelter.name} </h1>

                </div>
                <div class="card-body">
                    <div class="media">
                    <img class="align-self-start mr-3 w-50" src="https://si.wsj.net/public/resources/images/BN-CE613_0402Sm_G_20140402120224.jpg" alt="shelter image"/>
                        <div class="media-body w-50">
                            <div class="mw-100">
                                <h5 class="mb-1 mr-1">description </h5>
                                <p class="mw-100">{shelter.description}</p>
                            <hr/>
                            </div>
                            <div>
                                <h5 class="mb-1 mr-1">phone number </h5>
                                <p>{shelter.phoneNumber}</p>
                            <hr class="mw-100"/>
                            </div> 
                            <div>
                                <h5 class="mb-1 mr-1">address </h5>
                                <p>{shelter.address}</p>
                            <hr class="mw-100"/>
                            </div>
                            <div>
                                <h5 class="mb-1 mr-1">rate </h5>
                                <p>{shelter.rate}</p>
                            <hr class="mw-100"/>
                            </div>                            
                            <div>
                                <h5 class="mb-1 mr-1">coordinate </h5>
                                {/*
                                <p>{"latitude :"+shelter?.coordinate?.lat}</p>
                                <p>{"longtitude:"+shelter?.coordinate?.lng}</p>
                                 */}
                            <hr/>
                            </div> 
                            <div>
                                <h5 class="mb-1 mr-1">support type </h5>
                                <div>
                                {
                                shelter?.supported_type?.map((type)=>{
                                    return(
                                        
                                        <span class="badge badge-primary mr-1">{type}</span>
                                        
                                    );
                                    
                                }
                                )
                                }
                                </div>
                            <hr class="mw-100"/>
                            </div>                                  
                        </div>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item active">room</li>
                        {
                            rooms.map((room)=>{
                                return(
                                    <li class="list-group-item">
                                        
                                        <dl class="row">
                                            <dt class="col-md-2">name</dt>
                                            <dd class="col-md-10">{room.name}</dd>
                                            <dt class="col-md-2">nont type</dt>
                                            <dd class="col-md-10"><span class="badge badge-primary mr-1">{room.nont_type}</span></dd>
                                            <dt class="col-md-2">amount</dt>
                                            <dd class="col-md-10">{room.amount}</dd>
                                            <dt class="col-md-2">price</dt>
                                            <dd class="col-md-10">{room.price}</dd>
                                        </dl> 
                                        {
                                            contextValue.userType === UserType.NONT_OWNER&&(
                                                <a class="btn btn-primary mt-0" href="#" role="button">reserve</a>

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