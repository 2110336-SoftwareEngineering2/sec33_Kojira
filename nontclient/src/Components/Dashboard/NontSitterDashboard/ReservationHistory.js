import React, { useState } from "react";
import styles from "./NontSitterDashboard.module.css";
import ReservationCard from "./ReservationCard";

const ReservationHistory = (props) => {
  const [expand, setExpand] = useState(false);
  const reservations = props.reservations;

  return (
    <div className="mt-5">
      <div
        className={styles.toggleable}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <span className="ml-3" id={styles.historyTitle}>
          <i
            className={
              "fa fa-angle-right mr-3 " +
              (expand ? styles.downDropdown : styles.rightDropdown)
            }
          ></i>
          History
        </span>
        <hr className={styles.horizontalLine} />
      </div>
      <div
        className={
          styles.collapsible + " " + (!expand ? styles.collapse : styles.expand)
        }
      >
        <ReservationCard reservations={reservations} />
      </div>
    </div>
  );
};

export default ReservationHistory;
