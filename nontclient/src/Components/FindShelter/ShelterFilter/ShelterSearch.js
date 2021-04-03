import React from "react";
import styles from "../FindShelter.module.css";

const ShelterSearch = (props) => {
  const { filter, setFilter, submitSearch, submitClear } = props;

  function handleFormChange(element) {
    const value = element.currentTarget.value;
    setFilter({ ...filter, keywords: value });
  }

  return (
    <div className="form-group d-flex m-0">
      <div className={"d-flex mr-2 " + styles.searchBar}>
        <div
          className={"d-flex align-items-center pl-3 " + styles.searchIcon}
        >
          <i className={"fas fa-search " + styles.fade}></i>
        </div>
        <input
          type="text"
          className={"form-control " + styles.searchField}
          onChange={handleFormChange}
          value={filter.keywords}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary mr-2"
        onClick={submitSearch}
      >
        Apply
      </button>
      <button type="button" className="btn btn-light" onClick={submitClear}>
        Clear
      </button>
    </div>
  );
};

export default ShelterSearch;
