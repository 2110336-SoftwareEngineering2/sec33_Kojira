import React from "react";
import styles from "./Loading.module.css";
import LoadStatus from "../../Constants/LoadStatus";

const Loading = (props) => {
  const { status } = props;

  return (
    <React.Fragment>
      {status === LoadStatus.LOADING && (
        <div
          className={
            "d-flex justify-content-center align-content-center " +
            styles.loadingStatus
          }
        >
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
              <div className={"d-flex spinner-border " + styles.spinner}></div>
            </div>
            <div className={"d-flex " + styles.loadingMessage}>LOADING...</div>
          </div>
        </div>
      )}
      {status === LoadStatus.FAIL && (
        <div
          className={
            "d-flex justify-content-center align-content-center " +
            styles.loadingStatus
          }
        >
          <div className="d-flex flex-column justify-content-center">
            <div className={"d-flex " + styles.errorMessage}>
              Something went wrong. Please try again later.
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Loading;
