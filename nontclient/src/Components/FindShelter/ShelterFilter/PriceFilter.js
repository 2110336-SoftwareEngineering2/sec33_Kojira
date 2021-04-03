import React from "react";
import styles from "../FindShelter.module.css";
import { InputNumber, Slider } from "antd";

const DistanceFilter = (props) => {
  const { filter, setFilter } = props;

  function onSliderChange(element) {
    setFilter({ ...filter, maxPrice: element });
  }

  function onMaxChange(element) {
    setFilter({ ...filter, maxPrice: element });
  }

  return (
    <div className="d-flex align-items-center">
      <span className={styles.inputLabel}>Maximum Price</span>
      <Slider
        min={0}
        max={3000}
        step={100}
        value={filter.maxPrice}
        style={{ width: "100%", marginRight: "1.5rem" }}
        marks={{
          0: 0,
          500: 500,
          1000: 1000,
          1500: 1500,
          2000: 2000,
          2500: 2500,
          3000: 3000,
        }}
        onChange={onSliderChange}
        tooltipVisible={false}
      />
      <span className={styles.fade} style={{ marginRight: "0.5rem" }}>
        ฿
      </span>
      <InputNumber
        min={0}
        max={3000}
        step={100}
        value={filter.maxPrice}
        onChange={onMaxChange}
      />
    </div>
  );
};

export default DistanceFilter;
