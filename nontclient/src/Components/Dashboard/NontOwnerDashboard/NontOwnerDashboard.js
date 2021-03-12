import React from "react";
import LoadingReservation from "./LoadingReservation";

const NontOwnerDashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col text-center m-3">
          <h1>Nont Owner Dashboard</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <LoadingReservation />
        </div>
      </div>
    </div>
  );
};

export default NontOwnerDashboard;
