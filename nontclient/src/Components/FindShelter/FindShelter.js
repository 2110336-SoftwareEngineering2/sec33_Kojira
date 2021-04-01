import React, { useState, useEffect } from "react";
import ShelterService from "../../Services/ShelterService";
import LoadStatus from "../../Constants/LoadStatus";
import ShelterFilter from "./ShelterFilter/ShelterFilter";
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
  };
  const [savedFilter, setSavedFilter] = useState(defaultFilter);
  const [sortedBy, setSortedBy] = useState(position ? "Distance" : "Rating");
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
          lat: position.lat,
          lng: position.lng,
        };
        const response = await ShelterService.findShelter(query);
        setFetchShelterStatus(LoadStatus.SUCCESS);
        setShelters(response.data);
      } catch (error) {
        setFetchShelterStatus(LoadStatus.FAIL);
        console.error("Cannot get shelters' information");
      }
    }
    fetchShelter();
  }, [savedFilter, sortedBy, pageNumber, pageSize, position]);

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
      <ShelterFilter
        defaultFilter={defaultFilter}
        setSavedFilter={setSavedFilter}
        setPageNumber={setPageNumber}
      />
      <hr />
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
