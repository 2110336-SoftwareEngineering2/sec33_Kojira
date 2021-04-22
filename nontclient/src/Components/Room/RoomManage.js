import React, { useContext, useState, useEffect } from "react";
import { notification, } from "antd";
import { useParams } from "react-router-dom";
import RoomService from "../../Services/RoomService";
import ShelterService from "../../Services/ShelterService";
import Contexts from "../../Utils/Context/Contexts";
import RoomRow from "./RoomRow";
import Loading, { calculateLoadStatus } from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";

const UserContext = Contexts.UserContext;

const RoomManage = (props) => {
    const contextValue = useContext(UserContext);
    const [rooms, setRooms] = useState([]);
    const [shelterName, setShelterName] = useState("");
    const { shelterID } = useParams();
    const [fetchRoomStatus, setFetchRoomStatus] = useState(LoadStatus.LOADING);
    const [fetchShelterStatus, setFetchShelterStatus] = useState(LoadStatus.LOADING);

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
                        setFetchShelterStatus(LoadStatus.SUCCESS);
                    }
                }
            }
            catch (error) {
                setFetchShelterStatus(LoadStatus.FAIL);
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
                    setFetchRoomStatus(LoadStatus.SUCCESS);
                }
            }
        }
        catch (error) {
            setFetchRoomStatus(LoadStatus.FAIL);
            console.error(error.message);
        }
    }

    const openNotification = (mode, name, message) => {
        if (mode === "success") {
            notification.success({
                message: "Room deleted.",
                description: `Room ${name} delete successfully.`,
                placement: "bottomRight",
            })
        }
        else if (mode === "error") {
            notification.error({ 
                message: `Cannot delete room ${name}.`,
                description: `${message}`,
                placement: "bottomRight",
            });
        }        
    };

    const deleteRoom = async (id, name) => {
        try {
            const response = await RoomService.deleteRoom(id);
            if (response.status === 200) {
                fetchRooms();
                openNotification("success", name, "");
            }
        } catch (error){
            openNotification("error", name, error.response.data);
            console.error(error.message);
        }
    };

    return (
        <div className="container">

            {/* Back Button, Add Button */}
            <div className="d-flex justify-content-between mt-2"
            >
                {/* Back Button */}
                <a
                type="button"
                className="btn btn-outline-light text-dark bg-light border-dark button-text"
                href={"/shelter"}>
                    Back
                </a>
                {/* Add Button */}
                <a
                type="button"
                className="btn btn-outline-light text-light bg-success border-success button-text"
                href={"/room/register/" + shelterID}>
                    Add
                </a>
            </div>

            {/* Loading */}
            <div className="col col-md-12">
                <Loading status={calculateLoadStatus(fetchRoomStatus, fetchShelterStatus)} />
            </div>

            {/* Shelter Name */}
            <div className="flex-fill my-2">
                {
                    fetchRoomStatus === LoadStatus.SUCCESS &&
                    fetchShelterStatus === LoadStatus.SUCCESS &&
                    (
                        <div className="col-md-12 title"
                        style={{backgroundColor:"#c8d6e5", color:"#222f3e"}}>
                            {shelterName}
                        </div>
                    )
                }
            </div>

            {/* Room Row Button */}
            {
                fetchRoomStatus === LoadStatus.SUCCESS &&
                fetchShelterStatus === LoadStatus.SUCCESS &&
                (
                    <div>
                        <table className="table table-responsive-md table-hover table-bordered" style={{borderWidth:"5px"}}>
                            <thead>
                                <tr>
                                    <th scope="col" className="header" style={{textAlign:"center"}}>Name</th>
                                    <th scope="col" className="header" style={{textAlign:"center"}}>Nont Type</th>
                                    <th scope="col" className="header" style={{textAlign:"center"}}>Amount</th>
                                    <th scope="col" className="header" style={{textAlign:"center"}}>Price</th>
                                    <th colSpan="2" />
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
                )
            }
            
        </div>
    )
}

export default RoomManage;