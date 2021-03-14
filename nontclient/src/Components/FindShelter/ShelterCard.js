import React, { useState, useEffect } from "react";
import styles from "./FindShelter.module.css";
import { getDistance } from "geolib";
const _ = require("lodash");

const ShelterCard = (props) => {
  const shelter = props.shelter;

  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (props.position) {
      const distance = getDistance(
        { latitude: props.position.lat, longitude: props.position.lng },
        { latitude: shelter.coordinate.lat, longitude: shelter.coordinate.lng }
      );

      if (distance >= 1000) {
        setDistance(`${Math.round(distance / 1000)} km`);
      } else {
        setDistance(`${distance} m`);
      }
    }
  }, [props.position, shelter.coordinate.lat, shelter.coordinate.lng]);

  return (
    <div className={styles.cardWrapper}>
      <a className={styles.cardLink} href={"/findShelter/" + shelter._id}>
        <div
          className={
            "card d-flex justify-content-between align-items-strech " +
            styles.shelterCard
          }
        >
          <div className={"d-flex " + styles.image}>
            <img src="/no-image.svg" className={styles.noImage} alt=""></img>
          </div>
          <div
            className={"d-flex justify-content-center " + styles.shelterName}
          >
            <div className="d-flex">
              {_.truncate(shelter.name, { length: 40 })}
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {shelter.supported_type.map((type) => (
              <div className="d-flex mr-2 mb-2" key={type}>
                <span className="badge badge-secondary">{type}</span>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-around mb-2">
            <div className="d-flex">
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
            {distance && (
              <div className="d-flex">
                <span className={styles.fade}>
                  <i class="fas fa-location-arrow mr-1"></i>
                  {distance}
                </span>
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ShelterCard;
