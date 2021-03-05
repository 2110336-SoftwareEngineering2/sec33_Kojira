import React from "react";
import styles from "./FindShelter.module.css";

const ShelterCard = (props) => {
  const shelter = props.shelter;
  return (
    <a className={styles.cardLink} href={"/findShelter/" + shelter._id}>
      <div
        className={
          "card d-flex justify-content-between align-items-center " +
          styles.shelterCard
        }
      >
        <div className={"d-flex " + styles.image}></div>
        <div className={"d-flex " + styles.shelterName}>{shelter.name}</div>
        <div className="d-flex">
          <div className="mx-3 text-center">
            {shelter.supported_type.map((type) => (
              <span className="badge badge-secondary mr-2">{type}</span>
            ))}
          </div>
        </div>
        <div className="d-flex mb-2">
          <span className={"mr-2  " + styles.fade}>Rate</span>
          {[1, 2, 3, 4, 5].map((rating) => {
            if (Math.round(shelter.rate) >= rating)
              return <i className={"fas fa-star " + styles.star}></i>;
            else
              return (
                <i
                  className={"far fa-star " + styles.star + " " + styles.fade}
                ></i>
              );
          })}
          <span className={"ml-2  " + styles.fade}>{shelter.rate}</span>
        </div>
      </div>
    </a>
  );
};

export default ShelterCard;
