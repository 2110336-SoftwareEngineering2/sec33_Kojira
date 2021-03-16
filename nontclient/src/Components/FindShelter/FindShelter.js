import React, { useState, useEffect } from "react";
import styles from "./FindShelter.module.css";
import FindShelterList from "./FindShelterList";
import ShelterService from "../../Services/ShelterService";
import LoadStatus from "../../Constants/LoadStatus";

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
        <div className="col text-center m-3">
          <h1>Find Shelter</h1>
        </div>
      </div>
      {fetchShelterStatus === LoadStatus.LOADING && (
        <div className="row">
          <div className="col text-center">
            <h1 className={styles.loadingStatus}>LOADING...</h1>
          </div>
        </div>
      )}
      {fetchShelterStatus === LoadStatus.FAIL && (
        <div className="row">
          <div className="col text-center">
            <h1 className={styles.loadingStatus}>
              Something went wrong. Please try again later.
            </h1>
          </div>
        </div>
      )}
      {fetchShelterStatus === LoadStatus.SUCCESS && (
        <FindShelterList shelters={shelters} position={position} />
      )}
    </div>
  );
};

export default FindShelter;
