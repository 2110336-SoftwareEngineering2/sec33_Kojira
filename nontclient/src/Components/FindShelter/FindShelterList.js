import React, { useEffect, useState } from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";

const FindShelterList = (props) => {
  const [shelterList, setShelterList] = useState([]);

  // Set the shelters that will be shown to users.
  useEffect(() => {
    setShelterList(props.shelters);
  }, [props.shelters]);

  return (
    <div className="row">
      {shelterList.map((shelter) => (
        <div className={"col-12 col-sm-6 col-md-4 col-lg-3 " + styles.shelterCardCol} key={shelter._id}>
          <ShelterCard shelter={shelter} position={props.position} />
        </div>
      ))}
    </div>
  );
};

export default FindShelterList;
