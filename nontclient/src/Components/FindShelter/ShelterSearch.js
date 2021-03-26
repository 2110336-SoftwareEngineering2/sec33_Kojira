import React from "react";

const ShelterSearch = (props) => {
  return (
    <form>
      <div className="form-group d-flex">
        <input
          type="text"
          className="form-control mr-2"
          id="search-shelter"
          placeholder="Search shelter"
        />
        <button type="button" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default ShelterSearch;
