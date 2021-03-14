import React, { useState } from "react";
import styles from "./NontOwnerDashboard.module.css";
import LoadStatus from "../../../Constants/LoadStatus";
import ReservationList from "./ReservationList";

const LoadingStatus = () => {
  const [fetchStatus, setFetchStatus] = useState(LoadStatus.SUCCESS);

  return (
    <React.Fragment>
      {fetchStatus === LoadStatus.LOADING && (
        <div className="row">
          <div className="col text-center">
            <h1 className={styles.loadingStatus}>LOADING...</h1>
          </div>
        </div>
      )}
      {fetchStatus === LoadStatus.FAIL && (
        <div className="row">
          <div className="col text-center">
            <h1 className={styles.loadingStatus}>
              Something went wrong. Please try again later.
            </h1>
          </div>
        </div>
      )}
      {fetchStatus === LoadStatus.SUCCESS && <ReservationList />}
    </React.Fragment>
  );
};

export default LoadingStatus;
