import React from "react";
import styles from "./NontSitterDashboard.module.css";
const _ = require("lodash");

const ReservationList = () => {
  const dummyList = [
    {
      shelter: "ShelterA",
      room: "RoomA",
      nontOwner: "OwnerA",
      nontOwnerPhoneNumber: "0XXXXXXXXX",
      nontType: "NontTypeA",
      amount: 0,
      status: "?"
    },
    {
      shelter: "ShelterB",
      room: "RoomB",
      nontOwner: "OwnerB",
      nontOwnerPhoneNumber: "0XXXXXXXXX",
      nontType: "NontTypeB",
      amount: 0,
      status: "?"
    }
  ];

  return (
    <React.Fragment>
        <h3>Your active reservation</h3>
        <div className="list-group">
          {dummyList.map((reservation) => (
            <a href="#" className="m-2">
              <div className={"list-group-item list-group-item-action row d-flex justify-content-between align-items-center " + styles.listRow}>
                
                <div className="col-6 col-lg-3 d-flex">
                  <div className="row-cols-auto">
                    <div
                      className="col mb-3 text-break "
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

                  <div className="col-6 col-lg-4 d-flex">
                    <div className="row-cols-auto">
                      <div
                        className="col mb-3 text-break"
                        style={{ padding: "0px", opacity: "0.8" }}
                      >
                        {_.truncate(reservation.nontOwner, { length: 20 })}
                      </div>
                      <div
                        className="col text-break"
                        style={{ padding: "0px", opacity: "0.4" }}
                      >
                        {_.truncate(reservation.nontOwnerPhoneNumber, { length: 20 })}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-lg-2 d-flex">
                    <div className="row-cols-auto">
                      <div
                        className="col mb-3 text-break"
                        style={{ padding: "0px", opacity: "0.8" }}
                      >
                        {_.truncate(reservation.nontType, { length: 20 })}
                      </div>
                      <div
                        className="col text-break"
                        style={{ padding: "0px", opacity: "0.4" }}
                      >
                        {reservation.amount}
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