import React from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";

const FindShelterList = (props) => {
  const { shelters } = props;

  return (
    <React.Fragment>
      {shelters.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <span className={styles.fade} style={{ fontSize: "3rem" }}>{"No shelters found :("}</span>
        </div>
      )}
      {shelters.length > 0 && (
        <div className="row">
          {shelters.map((shelter) => (
            <div
              className={
                "col-12 col-sm-6 col-md-4 col-lg-3 " + styles.shelterCardCol
              }
              key={shelter._id}
            >
              <ShelterCard shelter={shelter} />
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default FindShelterList;
