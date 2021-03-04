import React from "react";
import styles from "./FindShelter.module.css";

const ShelterCard = (props) => {
  const shelter = props.shelter;
  return (
    <a className={styles.cardLink} href="#">
      <div className={"card " + styles.shelterCard}>
        <img src="..." className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{shelter.name}</h5>
          <p className="card-text">{shelter.description}</p>
        </div>
      </div>
    </a>
  );
};

export default ShelterCard;
