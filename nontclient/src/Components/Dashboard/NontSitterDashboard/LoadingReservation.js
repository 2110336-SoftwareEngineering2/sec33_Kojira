import React, { useContext, useState, useEffect } from "react";
import styles from "./NontSitterDashboard.module.css";
import ReservationHistory from "./ReservationHistory";
import ReservationStatus from "../../../Constants/ReservationStatus";
import ReserveService from "../../../Services/ReserveService";
import ShelterService from "../../../Services/ShelterService";
import ReservationCard from "./ReservationCard";
import Contexts from "../../../Utils/Context/Contexts";
import { Select } from 'antd';
import Loading from "../../Shared/Loading";
import LoadStatus from "../../../Constants/LoadStatus";

const { Option } = Select;
const _ = require("lodash");

const UserContext = Contexts.UserContext;

const LoadingStatus = () => {
  const contextValue = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [shelterSelected, setShelterSelected] = useState([]);
  const [fetchReservationStatus, setFetchReservationStatus] = useState(LoadStatus.LOADING);
  const [fetchShelterStatus, setFetchShelterStatus] = useState(LoadStatus.LOADING);

  useEffect( () => {  
    fetchReservations();   
    fetchShelter();
  }, []);

  const nontSitterID = contextValue._id;

   const fetchShelter = async () => {
    try {
      if (nontSitterID) {
        const response = await ShelterService.getShelterByNontSitterID(nontSitterID);
        if (response.data) {
          setShelters(response.data);
          setShelterSelected(response.data.map((element)=>(element.name)))
          setFetchShelterStatus(LoadStatus.SUCCESS)
        }
      }
    } catch (error) {
      setFetchShelterStatus(LoadStatus.FAIL)
      console.error("Cannot get shelters' information");
    }
  }

  const fetchReservations = async () => {
    try {
        if (nontSitterID) {
          const response = await ReserveService.getReservationByNontSitterID(nontSitterID);
          if (response.data) {
            setReservations(response.data)
            setFetchReservationStatus(LoadStatus.SUCCESS)
          }
      }
    }
    catch (error) {
      setFetchReservationStatus(LoadStatus.FAIL)
      console.error(error.message);
    }
  }

  return (
    <React.Fragment>
      <Loading status={
        (fetchReservationStatus===LoadStatus.FAIL||fetchShelterStatus===LoadStatus.FAIL)?LoadStatus.FAIL:
        (fetchReservationStatus===LoadStatus.LOADING||fetchShelterStatus===LoadStatus.LOADING)?LoadStatus.LOADING:LoadStatus.SUCCESS
        } />
      {fetchReservationStatus === LoadStatus.SUCCESS && fetchShelterStatus === LoadStatus.SUCCESS && (
        <React.Fragment>
          <h3>Your active reservation</h3>
          <Select
            mode="multiple"
            placeholder="Select shelters"
            size="large"
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
      )}
    </React.Fragment>
  );
};

export default LoadingStatus;