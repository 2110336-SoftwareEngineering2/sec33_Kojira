import React, { useState } from "react";

const ShelterSearch = (props) => {
  const { shelters, setShelterList } = props;
  const [keywords, setKeywords] = useState("");

  function handleFormChange(element) {
    const value = element.currentTarget.value;
    setKeywords(value);
  }

  function submitSearch(event) {
    event.preventDefault();
    const re = new RegExp(keywords, "i");
    const matchedShelters = shelters.filter((shelter) =>
      shelter.name.match(re)
    );
    setShelterList(matchedShelters);
  }

  function submitClear() {
    setKeywords("");
    setShelterList(shelters);
  }

  return (
    <form onSubmit={submitSearch}>
      <div className="form-group d-flex m-0">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Search shelter"
          onChange={handleFormChange}
          value={keywords}
        />
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={submitSearch}
        >
          <i className="fas fa-search"></i>
        </button>
        <button type="button" className="btn btn-primary" onClick={submitClear}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default ShelterSearch;
