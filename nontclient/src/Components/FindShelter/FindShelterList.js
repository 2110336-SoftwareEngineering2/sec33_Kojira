import React, { useEffect, useState } from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";

const FindShelterList = (props) => {
  const [shelterList, setShelterList] = useState([]);

  useEffect(() => {
    setShelterList(props.shelters);
  }, [props.shelters]);

  return (
    <div className="row">
      {shelterList.map((shelter) => (
        <div className={"col-6 col-md-4 col-lg-3 " + styles.shelterCardCol} key={shelter._id}>
          <ShelterCard shelter={shelter} />
        </div>
      ))}
    </div>
  );
};

export default FindShelterList;
