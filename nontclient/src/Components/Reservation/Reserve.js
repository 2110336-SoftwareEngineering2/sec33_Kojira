import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contexts from "../../Utils/Context/Contexts";
import ReservationService from "../../Services/ReserveService";
import RoomService from "../../Services/RoomService";
import styles from "./Reserve.module.css";
import moment from "moment";
import { DatePicker, Select, Statistic } from "antd";

const UserContext = Contexts.UserContext;

const Reserve = (props) => {
    const [rooms, setRooms] = useState({name:"default room name"});
    const { roomID } = useParams();
    const { RangePicker } = DatePicker;
    const {Option} = Select;

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

    const disabledDate = (current) => {
        return current < moment();
    }

    const submitReserve = async () => {

    }

    return(
        <div 
        className="container mt-3" 
        style={{backgroundColor:"#7ed6df", borderRadius:20}}>
            <h1 style={{textAlign:"center", color:"#30336b"}}>{rooms.name}</h1>
            <div className="row">
                <div className="col col-md-12" style={{backgroundColor:"#f5f6fa", borderRadius:20, textAlign:"center"}}>
                    {/* Nont Select */}
                    <div className="row m-2">                        
                        <div className="col m-2 col-sm">
                            <label style={{fontSize:"15px", padding:"10px"}}>
                                Nonts
                            </label>   
                            <Select
                            mode="multiple"
                            placeholder="Press select at least 1 Nont"
                            size="large"
                            style={{maxWidth:"300px", width:"50%"}}
                            >
                                <Option key="test1">test1</Option>
                                <Option key="test2">test2</Option>
                                <Option key="test3">test3</Option>
                                <Option key="test4">test4</Option>
                                <Option key="test5">test5</Option>
                                <Option key="test6">test6</Option>
                                <Option key="test7">test7</Option>
                                <Option key="test8">test8</Option>
                            </Select>                         
                        </div>                    
                    </div>
                    {/* Reservation Time Pick */}
                    <div className="row">
                        <div className="col md-2 col-sm">
                            <label style={{padding:"10px"}}>
                                Reservation Time
                            </label>
                            <RangePicker size="large" disabledDate={disabledDate} format="DD-MM-YYYY" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-2 col-sm">
                            <Statistic title="Price" value={0} suffix="baht" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-2 col-sm">
                            <button
                            type="button"
                            className="btn btn-primary"
                            onClick={submitReserve}
                            >
                            Reserve Room
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Reserve;