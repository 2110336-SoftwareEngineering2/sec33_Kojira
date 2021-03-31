import React, { useEffect, useState } from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";
import ShelterFilter from "./ShelterFilter/ShelterFilter";
import ShelterSort from "./ShelterSort";

const FindShelterList = (props) => {
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [sortedShelters, setSortedShelters] = useState([]);
  const [displayedShelters, setDisplayedShelters] = useState([]);

  // Set default filtered shelters
  useEffect(() => {
    setFilteredShelters(props.allShelters);
  }, [props.allShelters]);

  // Set the shelters that will be shown to users.
  useEffect(() => {
    setDisplayedShelters(sortedShelters);
  }, [sortedShelters]);

  return (
    <React.Fragment>
      <ShelterFilter
        allShelters={props.allShelters}
        setFilteredShelters={setFilteredShelters}
      />
      <hr />
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <span className={styles.fade}>
            Showing {displayedShelters.length} results
          </span>
        </div>
        <div className="d-flex align-items-center">
          <ShelterSort
            filteredShelters={filteredShelters}
            setSortedShelters={setSortedShelters}
            position={props.position}
          />
        </div>
      </div>
      <div className="row">
        {displayedShelters.map((shelter) => (
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
