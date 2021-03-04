import React from "react";

const ShelterCard = (props) => {
  const shelter = props.shelter;
  return (
    <div className="card">
      <img src="..." className="card-img-top" alt=""/>
      <div className="card-body">
        <h5 className="card-title">{shelter.name}</h5>
        <p className="card-text">{shelter.description}</p>
      </div>
    </div>
  );
};

export default ShelterCard;
