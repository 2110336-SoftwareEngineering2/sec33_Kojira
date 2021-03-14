import React, { useEffect } from "react";
import styles from "./FindShelter.module.css";
import { getDistance } from "geolib";

const ShelterCard = (props) => {
  const shelter = props.shelter;

  useEffect(() => {
    if (props.position) {
      const distance = getDistance(
        { latitude: props.position.lat, longitude: props.position.lng },
        { latitude: shelter.coordinate.lat, longitude: shelter.coordinate.lng }
      );
      console.log(distance);
    }
  }, [props.position, shelter.coordinate.lat, shelter.coordinate.lng]);

  return (
    <div className={styles.cardWrapper}>
      <a className={styles.cardLink} href={"/findShelter/" + shelter._id}>
        <div
          className={
            "card d-flex justify-content-between align-items-center " +
            styles.shelterCard
          }
        >
          <div className={"d-flex " + styles.image}>
            <img src="/no-image.svg" className={styles.noImage} alt=""></img>
          </div>
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
                return (
                  <span key={rating}>
                    <i className={"fas fa-star " + styles.star}></i>
                  </span>
                );
              else
                return (
                  <span key={rating}>
                    <i
                      className={
                        "far fa-star " + styles.star + " " + styles.fade
                      }
                    ></i>
                  </span>
                );
            })}
            <span className={"ml-2  " + styles.fade}>{shelter.rate}</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ShelterCard;
