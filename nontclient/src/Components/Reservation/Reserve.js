import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contexts from "../../Utils/Context/Contexts";
import ReservationService from "../../Services/ReserveService";
import RoomService from "../../Services/RoomService";
import NontService from "../../Services/NontService";
import styles from "./Reserve.module.css";
import moment from "moment";
import { DatePicker, Select, Statistic, notification } from "antd";
import ReserveService from "../../Services/ReserveService";

const UserContext = Contexts.UserContext;

const Reserve = (props) => {
    const [rooms, setRooms] = useState({name:"default room name"});
    const [nonts, setNonts] = useState([]);
    const [reservationsDate, setReservationsDate] = useState([]);
    const [nontSelected, setNontSelected] = useState([]);
    const [dateSelected, setDateSelected] = useState([]);
    const [price, setPrice] = useState(0);
    const { roomID } = useParams();    
    const { RangePicker } = DatePicker;
    const {Option} = Select;
    const contextValue = useContext(UserContext);
    const nontOwnerID = contextValue._id;

    useEffect(() => {
        fetchRooms();
        fetchReservation();
    }, [roomID]);

    useEffect( () => {
        fetchNonts();
    }, [contextValue])

    const fetchReservation = async () => {
        try {
            if (roomID) {
                let response = await ReserveService.getReservationsByRoomID(roomID);
                if (response.data) {
                    let resDate = 
                    response.data
                    .filter(date => (date.status === 'payment-pending' 
                    || date.status === 'paid' 
                    || date.status === 'checked-in'));
                    setReservationsDate(resDate);
                    console.log(reservationsDate);
                }
            }            
        }
        catch (error) {
            console.error(error.message);
        }
    }

    const fetchRooms = async () => {
        try {
            if (roomID) {
                let response = await RoomService.getRoomByID(roomID);
                if (response.data) {
                    setRooms(response.data);
                }
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    const fetchNonts = async () => {
        try {            
            if (nontOwnerID) {
                const response = await NontService.getNontByNontOwnerID(nontOwnerID);
                if (response.data) {
                    setNonts(response.data);
                }
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    const disabledDate = (current) => {
        let re = false;
        reservationsDate.forEach(date => {
            if ( (current.isAfter(moment(new Date(date.start_datetime)), 'days') 
            && current.isBefore(moment(new Date(date.end_datetime)), 'days') )
            || current.isSame(moment(new Date(date.start_datetime)), 'days') 
            || current.isSame(moment(new Date(date.end_datetime)), 'days')) {
                re = true;
            }
        });        
        return (current < moment()) || re;
    }

    const dateChange = (dates) => {
        if (dates) {
            setPrice(rooms.price * Math.max(dates[1].diff(dates[0], 'days')), 1);
            setDateSelected(dates);
        }
        else {
            setPrice(0);
        }
    }

    const submitReserve = async () => {
        if (nontSelected && nontSelected.length > 0 && dateSelected && dateSelected.length > 0) {
            const body = {
                nont_id: nontSelected,
                room_id: roomID,
                start_datetime: new Date(dateSelected[0].set({'hour':0, 'minute':0, 'second':0})),
                end_datetime: new Date(dateSelected[1].set({'hour':23, 'minute':59, 'second':59})),
                price: price,
            };
            try {
                const response = await ReserveService.addReservation(body);
                notification.success({
                    message: "Reservation created.",
                    description: `Reservation created successfully.`,
                    placement: "bottomRight",
                })
            }
            catch (error) {
                console.error(error.message);
            }
        }
        else {
            notification.error({ 
                message: "Reservation",
                description: `Cannot create a reservation. Please fill all required information.`,
                placement: "bottomRight",
            });
        }
    }

    return(
        <div 
        className="container mt-3" 
        style={{backgroundColor:"#7ed6df", borderRadius:20}}>
            {/* Room name header */}
            <h1 style={{textAlign:"center", color:"#30336b"}}>
                {rooms.name}
            </h1>
            <div className="row">
                <div className="col col-md-12" style={{backgroundColor:"#f5f6fa", borderRadius:20, textAlign:"center"}}>
                    {/* Nont Select */}
                    <div className="row m-2">                        
                        <div className="col m-2 col-sm">
                            <label style={{fontSize:"15px", padding:"10px"}}>
                                Nonts{" ("}{nontSelected.length}{"/"}{rooms.amount}{") "}
                            </label>   
                            <Select
                            mode="multiple"
                            placeholder="Press select at least 1 Nont"
                            size="large"
                            style={{maxWidth:"300px", width:"50%"}}
                            onChange={(value)=>{
                                if (value.length > rooms.amount) {
                                    value.pop();
                                }
                                setNontSelected(value);
                            }}
                            >
                                {
                                    nonts.filter(nont => (nont.type === rooms.nont_type) ).map( (element) => (
                                        <Option key={element._id}>{element.name}</Option>
                                    ))
                                }
                            </Select>                         
                        </div>                    
                    </div>
                    {/* Reservation Time Pick */}
                    <div className="row">
                        <div className="col md-2 col-sm">
                            <label style={{padding:"10px"}}>
                                Reservation Time
                            </label>
                            <RangePicker 
                            size="large" 
                            disabledDate={disabledDate} 
                            format="DD-MM-YYYY" 
                            onChange={(dates) => {
                                dateChange(dates);
                            }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-2 col-sm">
                            <Statistic title="Total Price" value={price} suffix="baht" />
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