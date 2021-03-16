import React, { useContext, useState, useEffect } from "react";
import styles from "./NontSitterDashboard.module.css";
import ReserveService from "../../../Services/ReserveService";
import Contexts from "../../../Utils/Context/Contexts";
const _ = require("lodash");

const UserContext = Contexts.UserContext;

const ReservationList = () => {
  const contextValue = useContext(UserContext);
  const [reservations, setReservations] = useState([]);

  useEffect( () => {  
    fetchReservations();   
  }, [contextValue]);

  const nontSitterID = contextValue._id;

  useEffect( () => {  
    fetchReservations();   
  }, [contextValue]);

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
        <div className="list-group">
          <div className="row">
            {reservations.map((reservation) => {
              if(reservation.status==="cancelled") return
              else{
                return(
                  <div className="col-lg-6">
                    <a href="#" className="m-2">
                      <div className={"card mt-3 " + styles.reservationCard}>
                        <div className="card-header text-white bg-primary" style={{fontSize: "20px", fontWeight: '600'}}>
                          {_.truncate(reservation.shelter_id.name?reservation.shelter_id.name:"Shelter", { length: 20 })}
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            {_.truncate(reservation.nontowner_id.name?reservation.nontowner_id.name:"Owner", { length: 20 })}
                          </h5>
                          <div className="row align-items-center">
                            <div className="col-5 text-center" style={{fontSize: "18px", fontWeight: '600', color: "black", opacity: "0.8"}}>
                              {reservation.status?reservation.status:"?"}
                            </div>
                            <div className="col-7" style={{fontSize: "15px", color: "black", opacity: "0.7"}}>
                              <div className="row">
                                <strong>Room</strong>{": " + _.truncate(reservation.room_id.name?reservation.room_id.name:"Room", { length: 20 })}
                              </div>
                              <div className="row">
                                <strong>Amount</strong>{": " + reservation.nont_id.length + " " + _.truncate(reservation.nont_id[0].type) + (reservation.nont_id.length==1?"":"s")}
                              </div>
                              <div className="row">
                                <strong>From</strong>{": " + _.truncate(reservation.start_datetime?reservation.start_datetime.slice(0,15):"XX/XX/XX")}
                              </div>
                              <div className="row">
                                <strong>To</strong>{": " + _.truncate(reservation.start_datetime?reservation.end_datetime.slice(0,15):"XX/XX/XX")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                )
              }
            })}
          </div>
        </div>
    </React.Fragment>
  );
};

export default ReservationList;