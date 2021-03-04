import React, { useState } from "react";
import ShelterCard from "./ShelterCard";

const FindShelterList = (props) => {
  const [shelterList, setShelterList] = useState([{ name: "dummy" }]);

  return (
    <React.Fragment>
      {shelterList.map((shelter) => (
        <ShelterCard shelter={shelter} />
      ))}
    </React.Fragment>
  );
};

export default FindShelterList;
