import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contexts from "../../Utils/Context/Contexts";
import ReservationService from "../../Services/ReserveService";
import RoomService from "../../Services/RoomService";
import styles from "./Reserve.module.css";
import moment from "moment";
import { DatePicker } from "antd";

const UserContext = Contexts.UserContext;

const Reserve = (props) => {
    const [rooms, setRooms] = useState({name:"default room name"});
    const { roomID } = useParams();
    const { RangePicker } = DatePicker;

    useEffect(() => {
        fetchRooms();
    }, [roomID]);

    const fetchRooms = async () => {
        try {
            if (roomID) {
                const response = await RoomService.getRoomByID(roomID);
                if (response.data) {
                    setRooms(response.data);
                }
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    return(
        <div 
        className="container mt-3" 
        style={{backgroundColor:"#7ed6df", borderRadius:20}}>
            <h1 style={{textAlign:"center", color:"#30336b"}}>{rooms.name}</h1>
            <div className="row">
            <div className="col col-md-12" style={{backgroundColor:"#dfe6e9", borderRadius:20}}>
                b
                <RangePicker showTime disabledDate={}/>
            </div>
            </div>
        </div>
    );
}

export default Reserve;