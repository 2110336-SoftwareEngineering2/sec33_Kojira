import React from "react";
import styles from "./NontOwnerDashboard.module.css";
const _ = require("lodash");

const ReservationList = () => {
  const dummyList = [
    {
      shelter: "Shelter1",
      room: "Room1",
      nont: "Nont1",
      nontType: "NontType1",
      status: "Dummy Status",
    },
    {
      shelter: "Shelter2",
      room: "Room2",
      nont: "Nont2",
      nontType: "NontType2",
      status: "Dummy Status",
    },
  ];

  return (
    <React.Fragment>
      <h3>Your active reservation</h3>
      <div className="list-group">
        {dummyList.map((reservation) => (
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
                    {_.truncate(reservation.shelter, { length: 20 })}
                  </div>
                  <div
                    className="col text-break"
                    style={{ padding: "0px", opacity: "0.4" }}
                  >
                    {_.truncate(reservation.room, { length: 20 })}
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 d-flex">
                <div className="row-cols-auto">
                  <div
                    className="col mb-3 text-break"
                    style={{ padding: "0px", opacity: "0.8" }}
                  >
                    {_.truncate(reservation.nont, { length: 20 })}
                  </div>
                  <div
                    className="col text-break"
                    style={{ padding: "0px", opacity: "0.4" }}
                  >
                    {_.truncate(reservation.nontType, { length: 20 })}
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
