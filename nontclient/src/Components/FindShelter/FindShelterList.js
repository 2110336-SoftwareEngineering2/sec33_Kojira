import React, { useEffect, useState } from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";
import ShelterSearch from "./ShelterSearch";

const FindShelterList = (props) => {
  const [shelterList, setShelterList] = useState([]);

  // Set the shelters that will be shown to users.
  useEffect(() => {
    setShelterList(props.shelters);
  }, [props.shelters]);

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 text-center m-3">
          <ShelterSearch
            shelters={props.shelters}
            setShelterList={setShelterList}
          />
        </div>
      </div>
      <hr />
      <span className={styles.fade}>Showing {shelterList.length} results</span>
      <div className="row">
        {shelterList.map((shelter) => (
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
