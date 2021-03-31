import React, { useState, useEffect } from "react";
import nontTypes from "../../../Constants/nontTypes";
import { Button } from "antd";

const NontTypeFilter = (props) => {
  const { filter, setFilter } = props;
  const { supported_type } = filter;
  const types = Object.keys(nontTypes).map((key) => nontTypes[key]);

  function handleButtonClick(type) {
    if (supported_type.includes(type)) {
      setFilter({
        ...filter,
        supported_type: supported_type.filter((value) => value !== type),
      });
    } else {
      setFilter({
        ...filter,
        supported_type: [...supported_type, type],
      });
    }
  }

  return (
    <div className="d-flex align-items-center">
      <span>Nont Type</span>
      <div className="d-flex justify-content-start align-items-center flex-wrap">
        {types.map((type) => (
          <div className="m-1" key={type}>
            <Button
              type={supported_type.includes(type) ? "primary" : ""}
              onClick={() => handleButtonClick(type)}
            >
              {type}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NontTypeFilter;
