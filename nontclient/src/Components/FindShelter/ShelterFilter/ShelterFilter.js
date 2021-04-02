import React, { useState } from "react";
import NontTypeFilter from "./NontTypeFilter";
import RatingFilter from "./RatingFilter";
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
      <div className="row justify-content-center my-2">
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
      <div className="row my-2">
        <div className="col">
          <NontTypeFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <div className="row my-2">
        <div className="col-12 col-md-6">
          <RatingFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShelterFilter;
