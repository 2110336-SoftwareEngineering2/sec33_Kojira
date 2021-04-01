import React, { useState } from "react";
import styles from "./NontSitterDashboard.module.css";
const _ = require("lodash");

const ReservationCard = (props) => {
  const reservations = props.reservations;

  return (
    <div className="list-group">
        <div className="row">
        {reservations.map((reservation) => {
            return(
                <div className="col-lg-6">
                <a href={"/reserveInfo/" + reservation._id} className="m-2">
                    <div className={"card mt-3 " + styles.reservationCard}>
                    <div className="card-header text-white bg-primary" style={{fontSize: "20px", fontWeight: '600', borderRadius: "10px 10px 0px 0px"}}>
                        {_.truncate(reservation.shelter_id.name?reservation.shelter_id.name:"Shelter", { length: 20 })}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                        {_.truncate(reservation.nontowner_id.name?reservation.nontowner_id.name:"Owner", { length: 20 })}
                        </h5>
                        <div className="row align-items-center">
                        <div className="col-12 col-md-4 col-sm-3 text-center" style={{fontSize: "18px", fontWeight: '600', color: "black", opacity: "0.8"}}>
                            {reservation.status?reservation.status:"?"}
                        </div>
                        <div className="col-12 col-md-8 col-sm-9" style={{fontSize: "15px", color: "black", opacity: "0.7"}}>
                            <div className="row">
                            <div className="col-4"><strong>Room:</strong></div>
                            <div className="col-8">
                            { _.truncate(reservation.room_id.name?reservation.room_id.name:"Room", { length: 20 })}
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-4"><strong>Amount:</strong></div>
                            <div className="col-8">
                            {reservation.nont_id.length + " " + _.truncate(reservation.nont_id[0].type) + (reservation.nont_id.length==1?"":"s")}
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-4"><strong>From:</strong></div>
                            <div className="col-8">
                            {_.truncate(reservation.start_datetime?reservation.start_datetime.slice(0,15):"XX/XX/XX")}
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-4"><strong>To:</strong></div>
                            <div className="col-8">
                            {_.truncate(reservation.start_datetime?reservation.end_datetime.slice(0,15):"XX/XX/XX")}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </a>
                </div>
            )
        })}
        </div>
    </div>
  );
};

export default ReservationCard;
