import React, { useContext, useState, useEffect } from "react";
import styles from "./NontSitterDashboard.module.css";
import ReservationHistory from "./ReservationHistory";
import ReservationStatus from "../../../Constants/ReservationStatus";
import ReserveService from "../../../Services/ReserveService";
import ShelterService from "../../../Services/ShelterService";
import ReservationCard from "./ReservationCard";
import Contexts from "../../../Utils/Context/Contexts";
import { Select } from 'antd';

const { Option } = Select;
const _ = require("lodash");

const UserContext = Contexts.UserContext;

const ReservationList = () => {
  const contextValue = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [shelterSelected, setShelterSelected] = useState([]);

  useEffect( () => {  
    fetchReservations();   
  }, [contextValue]);

  useEffect(() => {
    fetchShelter();
  }, []);

  const nontSitterID = contextValue._id;

   const fetchShelter = async () => {
    try {
      if (nontSitterID) {
        const response = await ShelterService.getShelterByNontSitterID(nontSitterID);
        if (response.data) {
          setShelters(response.data);
        }
      }
    } catch (error) {
      console.error("Cannot get shelters' information");
    }
  }

  const fetchReservations = async () => {
    try {
        if (nontSitterID) {
          const response = await ReserveService.getReservationByNontSitterID(nontSitterID);
          if (response.data) {
            setReservations(response.data)
          }
      }
    }
    catch (error) {
      console.error(error.message);
    }
  }

  return (
    <React.Fragment>
      <h3>Your active reservation</h3>
      <Select
        mode="multiple"
        placeholder="Select shelters"
        size="large"
        defaultValue={[]}
        defaultKey={[]}
        style={{ width: '100%' }}
        onChange = {(element) => {
          setShelterSelected(element)
        }}
      >
        {shelters.map( (element) => (
            <Option key={element.name}>{element.name}</Option>
          ))
        }
      </Select>             
      <ReservationCard
        reservations={reservations.filter(
          (reservation) =>
            reservation.status !== ReservationStatus.CHECKED_OUT &&
            reservation.status !== ReservationStatus.CLOSED &&
            shelterSelected.includes(reservation.shelter_id.name)
        )} 
      />
      <ReservationHistory
        reservations={reservations.filter(
          (reservation) =>
            reservation.status === ReservationStatus.CHECKED_OUT ||
            reservation.status === ReservationStatus.CLOSED
        )}
      />
    </React.Fragment>
  );
};

export default ReservationList;