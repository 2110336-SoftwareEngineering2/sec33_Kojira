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
          {reservations.map((reservation) => {
            if(reservation.status==="cancelled") return
            else{
              return(
                <a href="#" className="m-2">
                  <div className={"list-group-item list-group-item-action row d-flex justify-content-between align-items-center " + styles.listRow}>
                    
                    <div className="col-6 col-lg-3 d-flex">
                      <div className="row-cols-auto">
                        <div
                          className="col mb-3 text-break "
                          style={{ padding: "0px", opacity: "0.9" }}
                        >
                          {_.truncate(reservation.shelter_id.name?reservation.shelter_id.name:"Shelter", { length: 20 })}
                        </div>
                        <div
                          className="col text-break"
                          style={{ padding: "0px", opacity: "0.5" }}
                        >
                          {_.truncate(reservation.room_id.name?reservation.room_id.name:"Room", { length: 20 })}
                        </div>
                        
                      </div>
                    </div>

                    <div className="col-6 col-lg-4 d-flex">
                      <div className="row-cols-auto">
                        <div
                          className="col mb-3 text-break"
                          style={{ padding: "0px", opacity: "0.9" }}
                        >
                          {_.truncate(reservation.nontOwner?reservation.nontOwner:"Owner", { length: 20 })}
                        </div>
                        <div
                          className="col text-break"
                          style={{ padding: "0px", opacity: "0.5" }}
                        >
                          {_.truncate(reservation.nontOwnerPhoneNumber?reservation.nontOwnerPhoneNumber:"0XXXXXXXXX", { length: 20 })}
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-lg-2 d-flex">
                      <div className="row-cols-auto">
                        <div
                          className="col mb-3 text-break"
                          style={{ padding: "0px", opacity: "0.9" }}
                        >
                          {_.truncate(reservation.nont_id[0].type, { length: 20 })}
                        </div>
                        <div
                          className="col text-break"
                          style={{ padding: "0px", opacity: "0.5" }}
                        >
                          {reservation.nont_id.length}
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-lg-3 d-flex">
                      <div className="row-cols-auto">
                        <div
                          className="col text-break"
                          style={{ padding: "0px", opacity: "0.9" }}
                        >
                          {reservation.status?reservation.status:"?"}
                        </div>
                        <div
                          className="col text-break"
                          style={{ padding: "0px", opacity: "0.4", fontSize: "15px" }}
                        >
                          {_.truncate(reservation.start_datetime?reservation.start_datetime.slice(0,15):"XX/XX/XX")}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              )
            }
          })}
        </div>
    </React.Fragment>
  );
};

export default ReservationList;