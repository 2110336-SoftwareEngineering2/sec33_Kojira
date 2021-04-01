import React, { useEffect, useState } from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";

import ShelterSort from "./ShelterSort";

const FindShelterList = (props) => {
  const { shelters, sortedBy, setSortedBy } = props;

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <span className={styles.fade}>Showing {shelters.length} results</span>
        </div>
        <div className="d-flex align-items-center">
          <ShelterSort sortedBy={sortedBy} setSortedBy={setSortedBy} />
        </div>
      </div>
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
    </React.Fragment>
  );
};

export default FindShelterList;
