import React, { useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import LoadStatus from "../../Constants/LoadStatus";
import Loading from "../Shared/Loading";
import ShelterSearch from "./ShelterSearch";
import FindShelterList from "./FindShelterList";

const FindShelter = (props) => {
  const [fetchShelterStatus, setFetchShelterStatus] = useState(
    LoadStatus.LOADING
  );
  const [shelters, setShelters] = useState([]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    async function fetchShelter() {
      try {
        const response = await ShelterService.getShelters();
        setFetchShelterStatus(LoadStatus.SUCCESS);
        setShelters(response.data);
      } catch (error) {
        setFetchShelterStatus(LoadStatus.FAIL);
        console.error("Cannot get shelters' information");
      }
    }
    fetchShelter();
  }, []);

  useEffect(() => {
    async function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    getLocation();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center mt-3">
          <h1>Find Shelter</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 text-center m-3">
          <ShelterSearch />
        </div>
      </div>
      <hr />
      <Loading status={fetchShelterStatus} />
      {fetchShelterStatus === LoadStatus.SUCCESS && (
        <FindShelterList shelters={shelters} position={position} />
      )}
    </div>
  );
};

export default FindShelter;
