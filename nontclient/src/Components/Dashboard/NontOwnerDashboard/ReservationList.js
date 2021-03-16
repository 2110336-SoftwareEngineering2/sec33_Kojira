import React from "react";
import styles from "./NontOwnerDashboard.module.css";
const _ = require("lodash");

const ReservationList = (props) => {
  const reservations = props.reservations;

  return (
    <React.Fragment>
      <div className="list-group">
        {reservations.map((reservation) => (
          <a
            href={"/reserveInfo/" + reservation._id}
            className="m-2"
            key={reservation._id}
          >
            <div
              className={
                "list-group-item list-group-item-action row d-flex justify-content-between align-items-center " +
                styles.listRow
              }
            >
              <div className={"col-6 col-md-4 col-lg-3 d-flex my-1"}>
                <div className={"d-flex " + styles.imageArea}>
                  {reservation.shelter_id.picture.length > 0 && (
                    <img
                      src={Buffer.from(
                        reservation.shelter_id.picture[0].img
                      ).toString()}
                      className={styles.image}
                      alt=""
                    ></img>
                  )}
                  {reservation.shelter_id.picture.length === 0 && (
                    <img
                      src="/no-image.svg"
                      className={styles.noImage}
                      alt=""
                    ></img>
                  )}
                </div>
              </div>
              <div className="col-6 col-md-8 col-lg-3 d-flex my-1">
                <div className="row-cols-auto d-flex flex-column justify-content-around">
                  <div
                    className="col d-flex text-break"
                    style={{ padding: "0px", opacity: "0.8" }}
                  >
                    {_.truncate(reservation.shelter_id.name, {
                      length: 30,
                    })}
                  </div>
                  <div
                    className="col d-flex text-break"
                    style={{ padding: "0px", opacity: "0.4" }}
                  >
                    {_.truncate(reservation.room_id.name, {
                      length: 30,
                    })}
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex my-1">
                <div className="row-cols-auto d-flex flex-column justify-content-around ">
                  {reservation.nont_id.map((nont, index) => {
                    if (index < 2) {
                      return (
                        <div
                          className="col"
                          style={{ padding: "0px", opacity: "0.8" }}
                          key={nont._id}
                        >
                          {_.truncate(nont.name, {
                            length: 20,
                          })}
                        </div>
                      );
                    } else if (index === 2) {
                      return (
                        <div
                          className="col"
                          style={{ padding: "0px", opacity: "0.5" }}
                          key={nont._id}
                        >
                          +{reservation.nont_id.length - 2} more nonts
                        </div>
                      );
                    } else
                      return <React.Fragment key={nont._id}></React.Fragment>;
                  })}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center my-1">
                <div className="d-flex">{reservation.status}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ReservationList;
