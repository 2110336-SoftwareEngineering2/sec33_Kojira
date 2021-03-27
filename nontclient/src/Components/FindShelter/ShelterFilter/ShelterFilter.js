import React, { useState } from "react";
import ShelterSearch from "./ShelterSearch";

const ShelterFilter = (props) => {
  const { allShelters, setFilteredShelters } = props;

  const defaultFilter = {
    keywords: "",
  };
  const [filter, setFilter] = useState(defaultFilter);

  function submitSearch(event) {
    event.preventDefault();
    const re = new RegExp(filter.keywords, "i");
    const matchedShelters = allShelters.filter((shelter) =>
      shelter.name.match(re)
    );
    setFilteredShelters(matchedShelters);
  }

  function submitClear() {
    setFilter(defaultFilter);
    setFilteredShelters(allShelters);
  }

  return (
    <form onSubmit={submitSearch}>
      <ShelterSearch
        filter={filter}
        setFilter={setFilter}
        submitSearch={submitSearch}
        submitClear={submitClear}
      />
    </form>
  );
};

export default ShelterFilter;
