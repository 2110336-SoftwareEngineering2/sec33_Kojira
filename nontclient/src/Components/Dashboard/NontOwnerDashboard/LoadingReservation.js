import React, { useState, useEffect, useContext } from "react";
import styles from "./NontOwnerDashboard.module.css";
import Contexts from "../../../Utils/Context/Contexts";
import ReserveService from "../../../Services/ReserveService";
import LoadStatus from "../../../Constants/LoadStatus";
import ReservationList from "./ReservationList";

const UserContext = Contexts.UserContext;

const LoadingStatus = () => {
  const user = useContext(UserContext);

  const [reservations, setReservations] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(LoadStatus.SUCCESS);

  useEffect(() => {
    async function fetchReservation() {
      try {
        const response = await ReserveService.getReservationsByUserID(
          user.userType,
          user._id
        );
        setFetchStatus(LoadStatus.SUCCESS);
        setReservations(response.data);
      } catch (error) {
        setFetchStatus(LoadStatus.FAIL);
        console.error("Cannot get reservations' information");
      }
    }
    fetchReservation();
  }, [user]);

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
      {fetchStatus === LoadStatus.SUCCESS && (
        <ReservationList reservations={reservations} />
      )}
    </React.Fragment>
  );
};

export default LoadingStatus;
