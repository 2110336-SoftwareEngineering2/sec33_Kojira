import React from "react";

const ShelterSearch = (props) => {
  const { filter, setFilter, submitSearch, submitClear } = props;

  function handleFormChange(element) {
    const value = element.currentTarget.value;
    setFilter({ ...filter, keywords: value });
  }

  return (
    <div className="form-group d-flex m-0">
      <input
        type="text"
        className="form-control mr-2"
        placeholder="Search shelter"
        onChange={handleFormChange}
        value={filter.keywords}
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
  );
};

export default ShelterSearch;
