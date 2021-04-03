import React from "react";
import styles from "./FindShelter.module.css";
import ShelterCard from "./ShelterCard";
import { Pagination } from "antd";

const FindShelterList = (props) => {
  const { shelters, pageSize, pageNumber, setPageNumber } = props;

  return (
    <React.Fragment>
      {shelters.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <span className={styles.fade} style={{ fontSize: "3rem" }}>
            {"No shelters found :("}
          </span>
        </div>
      )}
      {shelters.length > 0 && (
        <React.Fragment>
          <div className="row">
            {shelters
              .slice(
                (pageNumber - 1) * pageSize,
                (pageNumber - 1) * pageSize + pageSize
              )
              .map((shelter) => (
                <div
                  className={
                    "col-12 col-sm-6 col-md-4 col-lg-3 " + styles.shelterCardCol
                  }
                  key={shelter._id}
                >
                  <ShelterCard shelter={shelter} />
                </div>
              ))}
          </div>
          <div className="row mt-5">
            <div className="col d-flex justify-content-center">
              <Pagination
                current={pageNumber}
                total={shelters.length}
                pageSize={pageSize}
                onChange={(element) => {
                  setPageNumber(element);
                }}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FindShelterList;
