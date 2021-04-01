import React, { useState } from "react";
import NontTypeFilter from "./NontTypeFilter";
import ShelterSearch from "./ShelterSearch";
import nontTypes from "../../../Constants/nontTypes";

const ShelterFilter = (props) => {
  const { allShelters, setFilteredShelters } = props;

  const defaultFilter = {
    keywords: "",
    supported_type: [],
  };
  const [filter, setFilter] = useState(defaultFilter);

  function checkSupportedType(shelter) {
    if (filter.supported_type.length > 0) {
      const intersectedType = filter.supported_type.filter((type) =>
        shelter.supported_type.includes(type)
      );
      return intersectedType.length > 0;
    } else return true;
  }

  function submitSearch(event) {
    event.preventDefault();
    const re = new RegExp(filter.keywords, "i");
    const filteredShelters = allShelters.filter(
      (shelter) => shelter.name.match(re) && checkSupportedType(shelter)
    );
    setFilteredShelters(filteredShelters);
  }

  function submitClear() {
    setFilter(defaultFilter);
    setFilteredShelters(allShelters);
  }

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 text-center m-3">
          <form onSubmit={submitSearch}>
            <ShelterSearch
              filter={filter}
              setFilter={setFilter}
              submitSearch={submitSearch}
              submitClear={submitClear}
            />
          </form>
        </div>
      </div>
      <NontTypeFilter filter={filter} setFilter={setFilter} />
    </React.Fragment>
  );
};

export default ShelterFilter;
