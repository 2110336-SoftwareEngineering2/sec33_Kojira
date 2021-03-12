import React, { useContext, useState, useEffect } from "react";
import {notification,} from "antd";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import RoomRow from "./RoomRow";

const UserContext = Contexts.UserContext;

const RoomManage = (props) => {
    const contextValue = useContext(UserContext);
    const [rooms, setRooms] = useState([]);
    const [shelterName, setShelterName] = useState("");
    const { shelterID } = useParams();

    useEffect(() => {
        fetchRooms();
    }, [shelterID]);

    useEffect(() => {
        async function fetchShelterName() {
            try {
                if (shelterID) {
                    const response = await ShelterService.getShelterByID(shelterID);
                    if (response.data) {
                        setShelterName(response.data.name);
                    }
                }
            }
            catch (error) {
                console.error(error.message);
            }
        }
        fetchShelterName();
    }, [shelterID]);

    const fetchRooms = async () => {
        try {
            if (shelterID) {
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

    const openNotification = (mode, name) => {
        if (mode === "success") {
            notification.success({
                message: "Room deleted.",
                description: `Room ${name} delete successfully.`,
                placement: "bottomRight",
            })
        }
        else if (mode === "error") {
            notification.error({ 
                message: "Room deleted.",
                description: `Cannot delete room ${name}.`,
                placement: "bottomRight",
            });
        }        
    };

    const deleteRoom = async (id, name) => {
        try {
            const response = await RoomService.deleteRoom(id);
            if (response.status === 200) {
                fetchRooms();
                openNotification("success", name);
            }
        } catch (error){
            openNotification("error", name)
            console.error(error.message);
        }
    };

    return (
        <div className="container">

            {/* Back Button, Add Button and Shelter Name */}
            <div
            className="row mt-2 justify-content-between"
            >
                <div className="col col-md-1 my-2"
                    style={{ padding:0 }}>
                    <a
                    type="button"
                    className="btn btn-outline-light btn-block text-dark bg-light border-dark text-center"
                    href={"/shelter"}>
                        Back
                    </a>
                </div>
                <div className="col col-md-1 my-2 text-right"                
                style={{ padding:0 }}>                    
                    <a
                    type="button"
                    className="btn btn-outline-light btn-block text-light bg-success border-success text-center"
                    href={"/room/register/" + shelterID}>
                        Add
                    </a>
                </div>
                <div className="col-md-12 font-weight-bold h1"
                style={{backgroundColor:"#c8d6e5", color:"#222f3e"}}>
                    {shelterName}
                </div>
            </div>

            {/* Room Row Button */}
            <div>
                <table className="table table-responsive-md">
                    <thead>
                        <tr>
                            <th scope="col" style={{textAlign:"center", fontSize:20}}>Name</th>
                            <th scope="col" style={{textAlign:"center", fontSize:20}}>Nont Type</th>
                            <th scope="col" style={{textAlign:"center", fontSize:20}}>Amount</th>
                            <th scope="col" style={{textAlign:"center", fontSize:20}}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        rooms.map((element) => (
                            <RoomRow
                                element={element}
                                key={element._id}
                                onDelete={deleteRoom}
                            />
                        ))
                        }      
                    </tbody>                
                </table>
            </div>
        </div>
    )
}

export default RoomManage;