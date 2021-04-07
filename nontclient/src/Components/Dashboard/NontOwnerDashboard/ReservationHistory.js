import React, { useState } from "react";
import styles from "./NontOwnerDashboard.module.css";
import ReservationList from "./ReservationList";

const ReservationHistory = (props) => {
  const [expand, setExpand] = useState(false);

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
        <ReservationList reservations={props.reservations} />
      </div>
    </div>
  );
};

export default ReservationHistory;
