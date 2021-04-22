import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contexts from "../../Utils/Context/Contexts";
import RoomService from "../../Services/RoomService";
import NontService from "../../Services/NontService";
import styles from "./Reserve.module.css";
import moment from "moment";
import { DatePicker, Select, Statistic, notification } from "antd";
import ReserveService from "../../Services/ReserveService";
import Loading, { calculateLoadStatus } from "../Shared/Loading";
import LoadStatus from "../../Constants/LoadStatus";

const UserContext = Contexts.UserContext;

const Reserve = (props) => {
  const [rooms, setRooms] = useState({ name: "default room name" });
  const [nonts, setNonts] = useState([]);
  const [reservationsDate, setReservationsDate] = useState([]);
  const [nontSelected, setNontSelected] = useState([]);
  const [dateSelected, setDateSelected] = useState([]);
  const [fetchRoomStatus, setFetchRoomStatus] = useState(LoadStatus.LOADING);
  const [fetchReservationStatus, setFetchReservationStatus] = useState(
    LoadStatus.LOADING
  );
  const [fetchNontStatus, setFetchNontStatus] = useState(LoadStatus.LOADING);
  const [price, setPrice] = useState(0);
  const { roomID } = useParams();
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const contextValue = useContext(UserContext);
  const nontOwnerID = contextValue._id;

  useEffect(() => {
    fetchRooms();
    fetchReservation();
  }, [roomID]);

  useEffect(() => {
    fetchNonts();
  }, [contextValue]);

  const fetchReservation = async () => {
    try {
      if (roomID) {
        let response = await ReserveService.getReservationsByRoomID(roomID);
        if (response.data) {
          let resDate = response.data.filter(
            (date) =>
              date.status === "payment-pending" ||
              date.status === "paid" ||
              date.status === "checked-in"
          );
          setReservationsDate(resDate);
          setFetchReservationStatus(LoadStatus.SUCCESS);
        }
      }
    } catch (error) {
      setFetchReservationStatus(LoadStatus.FAIL);
      console.error(error.message);
    }
  };

  const fetchRooms = async () => {
    try {
      if (roomID) {
        let response = await RoomService.getRoomByID(roomID);
        if (response.data) {
          setRooms(response.data);
          setFetchRoomStatus(LoadStatus.SUCCESS);
        }
      }
    } catch (error) {
      setFetchRoomStatus(LoadStatus.FAIL);
      console.error(error.message);
    }
  };

  const fetchNonts = async () => {
    try {
      if (nontOwnerID) {
        const response = await NontService.getNontByNontOwnerID(nontOwnerID);
        if (response.data) {
          setNonts(response.data);
          setFetchNontStatus(LoadStatus.SUCCESS);
        }
      }
    } catch (error) {
      setFetchNontStatus(LoadStatus.FAIL);
      console.error(error.message);
    }
  };

  const disabledDate = (current) => {
    let re = false;
    reservationsDate.forEach((date) => {
      if (
        (current.isAfter(moment(new Date(date.start_datetime)), "days") &&
          current.isBefore(moment(new Date(date.end_datetime)), "days")) ||
        current.isSame(moment(new Date(date.start_datetime)), "days") ||
        current.isSame(moment(new Date(date.end_datetime)), "days")
      ) {
        re = true;
      }
    });
    return current.isBefore(moment(), "days") || re;
  };

  const dateChange = (dates) => {
    if (dates) {
      setPrice(rooms.price * Math.max(dates[1].diff(dates[0], "days"), 1));
      setDateSelected(dates);
    } else {
      setPrice(0);
    }
  };

  const submitReserve = async () => {
    if (
      nontSelected &&
      nontSelected.length > 0 &&
      dateSelected &&
      dateSelected.length > 0
    ) {
      const body = {
        nont_id: nontSelected,
        room_id: roomID,
        start_datetime: new Date(
          dateSelected[0].set({ hour: 0, minute: 0, second: 0 })
        ),
        end_datetime: new Date(
          dateSelected[1].set({ hour: 23, minute: 59, second: 59 })
        ),
        price: price,
      };
      try {
        const response = await ReserveService.addReservation(body);
        notification.success({
          message: "Reservation created.",
          description: `Reservation created successfully.`,
          placement: "bottomRight",
        });
        console.log(response?.data?._id);
        if ("data" in response && "_id" in response?.data) {
          window.location.href = "/reserveInfo/" + response?.data?._id;
        }
      } catch (error) {
        notification.error({
          message: "Reservation",
          description: `Cannot create a reservation.`,
          placement: "bottomRight",
        });
        console.error(error.message);
      }
    } else {
      notification.error({
        message: "Reservation",
        description: `Cannot create a reservation. Please fill all required information.`,
        placement: "bottomRight",
      });
    }
  };

  return (
    <div
      className="container"
    >
      {/* Loading */}
      <div className="col col-md-12">
        <Loading
          status={calculateLoadStatus(
            fetchNontStatus,
            fetchReservationStatus,
            fetchRoomStatus
          )}
        />
      </div>
      {fetchNontStatus === LoadStatus.SUCCESS &&
        fetchReservationStatus === LoadStatus.SUCCESS &&
        fetchRoomStatus === LoadStatus.SUCCESS && (
          <div>
            {/* Room name header */}
            <h1 className="title" 
            style={{
              textAlign:"center",
              backgroundColor:"#c8d6e5", 
              color:"#222f3e"}}>
              {rooms.name}
            </h1>
            <div className="row">
              <div
                className="col col-md-12"
                style={{
                  borderRadius: 20,
                  textAlign: "center",
                }}
              >
                {/* Nont Select */}
                <div className="row m-2">
                  <div className="col m-2 col-sm">
                    <label className="emphasis" style={{ fontSize: "15px", padding: "10px" }}>
                      Nonts{" ("}
                      {nontSelected.length}
                      {"/"}
                      {rooms.amount}
                      {") "}
                    </label>
                    <Select
                      mode="multiple"
                      placeholder="Press select at least 1 Nont"
                      size="large"
                      style={{ maxWidth: "300px", width: "50%" }}
                      onChange={(value) => {
                        if (value.length > rooms.amount) {
                          value.pop();
                        }
                        setNontSelected(value);
                      }}
                    >
                      {nonts
                        .filter((nont) => nont.type === rooms.nont_type)
                        .map((element) => (
                          <Option key={element._id}>{element.name}</Option>
                        ))}
                    </Select>
                  </div>
                </div>
                {/* Reservation Time Pick */}
                <div className="row">
                  <div className="col md-2 col-sm">
                    <label className="emphasis" style={{ padding: "10px" }}>Reservation Time</label>
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
                    <Statistic
                      className="emphasis"
                      title="Total Price"
                      value={price}
                      suffix="baht"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-3 col-sm">
                    <button
                      type="button"
                      className="btn btn-primary button-text"
                      onClick={submitReserve}
                    >
                      Reserve Room
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Reserve;
