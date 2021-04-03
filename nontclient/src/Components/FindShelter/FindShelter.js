import React, { useState, useEffect } from "react";
import styles from "./FindShelter.module.css";
import ShelterService from "../../Services/ShelterService";
import LoadStatus from "../../Constants/LoadStatus";
import ShelterFilter from "./ShelterFilter/ShelterFilter";
import ShelterSort from "./ShelterSort";
import Loading from "../Shared/Loading";
import FindShelterList from "./FindShelterList";

const FindShelter = (props) => {
  const [fetchShelterStatus, setFetchShelterStatus] = useState(
    LoadStatus.LOADING
  );
  const [shelters, setShelters] = useState([]);
  const [position, setPosition] = useState(null);
  const defaultFilter = {
    keywords: "",
    supported_type: [],
    minrate: 0,
    maxrate: 5,
    maxDistance: 100,
  };
  const [savedFilter, setSavedFilter] = useState(defaultFilter);
  const [sortedBy, setSortedBy] = useState("Rating");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    async function fetchShelter() {
      try {
        setFetchShelterStatus(LoadStatus.LOADING);
        const sortedByMapper = {
          Name: "name",
          Distance: "distance",
          Rating: "rate",
        };
        const query = {
          ...savedFilter,
          sortedBy: sortedByMapper[sortedBy],
          pageNumber,
          pageSize,
        };
        if (position) {
          query.lat = position.lat;
          query.lng = position.lng;
        }
        const response = await ShelterService.findShelter(query);
        setFetchShelterStatus(LoadStatus.SUCCESS);
        setShelters(response.data);
      } catch (error) {
        setFetchShelterStatus(LoadStatus.FAIL);
        console.error(error);
      }
    }
    fetchShelter();
  }, [savedFilter, sortedBy, pageNumber, pageSize, position]);

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
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center mt-3">
          <h1>Find Shelter</h1>
        </div>
      </div>
      <ShelterFilter
        defaultFilter={defaultFilter}
        setSavedFilter={setSavedFilter}
        setPageNumber={setPageNumber}
        position={position}
      />
      <hr />
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          {fetchShelterStatus === LoadStatus.SUCCESS && (
            <span className={styles.fade}>
              Showing {shelters.length} results
            </span>
          )}
        </div>
        <div className="d-flex align-items-center">
          <ShelterSort sortedBy={sortedBy} setSortedBy={setSortedBy} position={position} />
        </div>
      </div>
      <Loading status={fetchShelterStatus} />
      {fetchShelterStatus === LoadStatus.SUCCESS && (
        <FindShelterList
          shelters={shelters}
          sortedBy={sortedBy}
          setSortedBy={setSortedBy}
        />
      )}
    </div>
  );
};

export default FindShelter;
