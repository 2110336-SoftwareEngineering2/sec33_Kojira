import React, { useState } from "react";
import NontTypeFilter from "./NontTypeFilter";
import RatingFilter from "./RatingFilter";
import DistanceFilter from "./DistanceFilter";
import NontAmountFilter from "./NontAmountFilter";
import PriceFilter from "./PriceFilter";
import ShelterSearch from "./ShelterSearch";
import DateFilter from "./DateFilter";

const ShelterFilter = (props) => {
  const { defaultFilter, setSavedFilter, setPageNumber, position } = props;

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
      <div className="row justify-content-center my-3">
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
      <div className="row my-3">
        <div className="col">
          <NontTypeFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 col-lg-6">
          <RatingFilter filter={filter} setFilter={setFilter} />
        </div>
        <div className="col-12 col-lg-6">
          <DistanceFilter
            filter={filter}
            setFilter={setFilter}
            position={position}
          />
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 col-lg-6">
          <NontAmountFilter filter={filter} setFilter={setFilter} />
        </div>
        <div className="col-12 col-lg-6">
          <PriceFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <DateFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShelterFilter;
