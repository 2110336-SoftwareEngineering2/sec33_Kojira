import React, { useState } from "react";
import NontTypeFilter from "./NontTypeFilter";
import ShelterSearch from "./ShelterSearch";

const ShelterFilter = (props) => {
  const { defaultFilter, setSavedFilter, setPageNumber } = props;

  const [filter, setFilter] = useState(defaultFilter);

  function submitSearch(event) {
    event.preventDefault();
    setSavedFilter(filter);
  }

  function submitClear() {
    setFilter(defaultFilter);
    setSavedFilter(defaultFilter);
    setPageNumber(1);
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
