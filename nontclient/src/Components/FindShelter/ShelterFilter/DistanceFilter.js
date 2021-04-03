import React from "react";
import styles from "../FindShelter.module.css";
import { InputNumber, Slider } from "antd";

const DistanceFilter = (props) => {
  const { filter, setFilter, position } = props;

  function onSliderChange(element) {
    setFilter({ ...filter, maxDistance: element });
  }

  function onMaxChange(element) {
    setFilter({ ...filter, maxDistance: element });
  }

  return (
    <div className="d-flex align-items-center">
      <span className={styles.inputLabel}>Maximum Distance</span>
      <Slider
        min={1}
        max={100}
        step={1}
        value={filter.maxDistance}
        style={{ width: "100%", marginRight: "1rem" }}
        marks={{ 0: 0, 20: 20, 40: 40, 60: 60, 80: 80, 100: "INF" }}
        onChange={onSliderChange}
        tooltipVisible={false}
        disabled={!position}
      />
      <InputNumber
        min={1}
        max={100}
        value={filter.maxDistance >= 100 ? "INF" : filter.maxDistance}
        style={{ marginRight: "0.5rem" }}
        onChange={onMaxChange}
        disabled={!position}
      />
      <span className={styles.fade}>km</span>
    </div>
  );
};

export default DistanceFilter;
