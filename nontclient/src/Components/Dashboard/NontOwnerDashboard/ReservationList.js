import React from "react";
import styles from "./NontOwnerDashboard.module.css";
const _ = require("lodash");

const ReservationList = props => {

  const reservations = props.reservations;

  return (
    <React.Fragment>
      <h3>Your active reservation</h3>
      <div className="list-group">
        {reservations.map((reservation) => (
          <a href="#" className="m-2">
            <div
              className={
                "list-group-item list-group-item-action row d-flex justify-content-between align-items-center " +
                styles.listRow
              }
            >
              <div className={"col-6 col-lg-3 d-flex"}>
                <div className={styles.image}>
                  <img
                    src="/no-image.svg"
                    className={styles.noImage}
                    alt=""
                  ></img>
                </div>
              </div>
              <div className="col-6 col-lg-3 d-flex">
                <div className="row-cols-auto">
                  <div
                    className="col mb-3 text-break"
                    style={{ padding: "0px", opacity: "0.8" }}
                  >
                    {_.truncate(reservation.shelter_id.name, { length: 20 })}
                  </div>
                  <div
                    className="col text-break"
                    style={{ padding: "0px", opacity: "0.4" }}
                  >
                    {_.truncate(reservation.room_id.name, { length: 20 })}
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 d-flex">
                <div className="row-cols-auto">
                  <div
                    className="col mb-3 text-break"
                    style={{ padding: "0px", opacity: "0.8" }}
                  >
                    {_.truncate(reservation.nont_id[0].name, { length: 20 })}
                  </div>
                  <div
                    className="col text-break"
                    style={{ padding: "0px", opacity: "0.4" }}
                  >
                    {_.truncate(reservation.nont_id[0].type, { length: 20 })}
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 d-flex">{reservation.status}</div>
            </div>
          </a>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ReservationList;
