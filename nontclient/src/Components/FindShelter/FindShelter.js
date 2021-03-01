import React, { useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import LoadStatus from "../../Constants/LoadStatus";

const FindShelter = (props) => {
  const [fetchShelterStatus, setFetchShelterStatus] = useState(
    LoadStatus.LOADING
  );

  useEffect(() => {
    async function fetchShelter() {
      try {
        const shelters = await ShelterService.getShelters();
        setFetchShelterStatus(LoadStatus.SUCCESS);
        console.log(shelters);
      } catch (error) {
        setFetchShelterStatus(LoadStatus.FAIL);
        console.error("Cannot get shelters' information");
      }
    }
    fetchShelter();
  }, []);

  return (
    <React.Fragment>
      <h1>Find Shelter Here</h1>
      {fetchShelterStatus === LoadStatus.SUCCESS && <h2>FETCHED</h2>}
    </React.Fragment>
  );
};

export default FindShelter;
