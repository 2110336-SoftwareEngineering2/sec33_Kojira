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
            {/* Header */}
            <h1 className="my-5 text-center">Room Management</h1>

            {/* User and Shelter */}
            <h2 className="my-5 text-center">Name: {contextValue.name}, Shelter: {shelterName}</h2>

            {/* Room Regsiter Button */}
            <div className="row">
                <button
                    className="btn btn-lg mt-2 mb-2"
                    id="room-register-button"
                >
                    <a
                        href={"/room/register/" + shelterID}
                        className="fa fa-plus"
                        title="Add New Room"
                        style={{ textDecoration: "none"}}
                    >
                        {" "}Add
                    </a>
                </button>
            </div>

            {/* Room Row Button */}
            <div>
                {
                    rooms.map((element) => (
                        <RoomRow
                            element={element}
                            key={element._id}
                            onDelete={deleteRoom}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default RoomManage;