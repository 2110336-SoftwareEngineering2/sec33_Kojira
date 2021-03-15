import React from "react";
import styles from "./FindShelter.module.css";

const StarRating = (props) => {
  const shelter = { rate: props.rate };

  return (
    <React.Fragment>
      {[1, 2, 3, 4, 5].map((rating) => {
        if (shelter.rate + 0.25 >= rating)
          return (
            <span key={rating}>
              <i className={"fas fa-star " + styles.star}></i>
            </span>
          );
        else if (shelter.rate + 0.25 >= rating - 0.5) {
          return (
            <span key={rating}>
              <i className={"fas fa-star-half-alt " + styles.star}></i>
            </span>
          );
        } else
          return (
            <span key={rating}>
              <i className={"far fa-star " + styles.star}></i>
            </span>
          );
      })}
      <span className={"ml-2  " + styles.fade}>{shelter.rate}</span>
    </React.Fragment>
  );
};

export default StarRating;
