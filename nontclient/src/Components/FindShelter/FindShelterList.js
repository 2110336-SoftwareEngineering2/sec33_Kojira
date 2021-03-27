import React, { useEffect, useState } from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";
import ShelterFilter from "./ShelterFilter/ShelterFilter";

const FindShelterList = (props) => {
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [displayedShelters, setDisplayedShelters] = useState([]);

  // Set default filtered shelters
  useEffect(() => {
    setFilteredShelters(props.allShelters);
  }, [props.allShelters]);

  // Set the shelters that will be shown to users.
  useEffect(() => {
    setDisplayedShelters(filteredShelters);
  }, [filteredShelters]);

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 text-center m-3">
          <ShelterFilter
            allShelters={props.allShelters}
            setFilteredShelters={setFilteredShelters}
          />
        </div>
      </div>
      <hr />
      <span className={styles.fade}>
        Showing {displayedShelters.length} results
      </span>
      <div className="row">
        {displayedShelters.map((shelter) => (
          <div
            className={
              "col-12 col-sm-6 col-md-4 col-lg-3 " + styles.shelterCardCol
            }
            key={shelter._id}
          >
            <ShelterCard shelter={shelter} position={props.position} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default FindShelterList;
