import React, { useState, useEffect, useContext } from "react";
import Contexts from "../../../Utils/Context/Contexts";
import ReserveService from "../../../Services/ReserveService";
import LoadStatus from "../../../Constants/LoadStatus";
import ReservationList from "./ReservationList";
import ReservationHistory from "./ReservationHistory";
import ReservationStatus from "../../../Constants/ReservationStatus";
import Loading from "../../Shared/Loading";

const UserContext = Contexts.UserContext;

const LoadingStatus = () => {
  const user = useContext(UserContext);

  const [reservations, setReservations] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(LoadStatus.LOADING);

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
      <Loading status={fetchStatus} />
      {fetchStatus === LoadStatus.SUCCESS && (
        <React.Fragment>
          <h3>Your active reservation</h3>
          <hr />
          <ReservationList
            reservations={reservations.filter(
              (reservation) =>
                reservation.status !== ReservationStatus.CHECKED_OUT &&
                reservation.status !== ReservationStatus.CLOSED
            )}
          />
          <ReservationHistory
            reservations={reservations.filter(
              (reservation) =>
                reservation.status === ReservationStatus.CHECKED_OUT ||
                reservation.status === ReservationStatus.CLOSED
            )}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LoadingStatus;
