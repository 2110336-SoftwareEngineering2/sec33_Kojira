import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import Contexts from "../../Utils/Context/Contexts";
import RoomRow from "./RoomRow";

const UserContext = Contexts.UserContext;

const RoomManage = (props) => {
    const contextValue = useContext(UserContext);
    const [rooms, setRooms] = useState([]);
    const {shelterID} = useParams();

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

    return (
        <div className="container">
            {/* Header */}
            <h1 className="my-5 text-center">Room Management</h1>

            {/* Room Regsiter Button */}
            <div className="row">
                <button
                className="btn btn-lg mt-2 mb-2"
                id="room-register-button"                
                >
                    <a 
                    href={"/room/register/"+shelterID}
                    className="fa fa-plus"></a>
                </button>
            </div>

            {/* Room Row Button */}
            <div>
                {
                    rooms.map( (element) => (
                        <RoomRow
                        element={element}
                        key={element._id}
                        />
                    ) )
                }
            </div>
        </div>
    )
}

export default RoomManage;