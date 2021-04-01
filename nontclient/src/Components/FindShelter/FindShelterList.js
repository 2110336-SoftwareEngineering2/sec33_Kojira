import React from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";

const FindShelterList = (props) => {
  const { shelters } = props;

  return (
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
  );
};

export default FindShelterList;
