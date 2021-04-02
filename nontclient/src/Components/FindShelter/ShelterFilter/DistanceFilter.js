import React from "react";
import styles from "../FindShelter.module.css";
import { InputNumber, Slider } from "antd";

const DistanceFilter = (props) => {
  const { filter, setFilter, position } = props;

  function onSliderChange(element) {
    setFilter({ ...filter, mindistance: element[0], maxdistance: element[1] });
  }

  function onMinChange(element) {
    if (element <= filter.maxdistance) {
      setFilter({ ...filter, mindistance: element });
    }
  }

  function onMaxChange(element) {
    if (element >= filter.mindistance) {
      setFilter({ ...filter, maxdistance: element });
    }
  }

  return (
    <div className="d-flex align-items-center">
      <span className={styles.inputLabel}>Distance</span>
      <InputNumber
        min={0}
        max={100}
        value={filter.mindistance}
        onChange={onMinChange}
        style={{ marginRight: "0.5rem" }}
        disabled={!position}
      />
      <span className={styles.fade}>km</span>
      <Slider
        range
        min={0}
        max={100}
        step={1}
        value={[filter.mindistance, filter.maxdistance]}
        style={{ width: "100%", marginLeft: "1rem", marginRight: "1rem" }}
        marks={{ 0: 0, 20: 20, 40: 40, 60: 60, 80: 80, 100: "INF" }}
        onChange={onSliderChange}
        tooltipVisible={false}
        disabled={!position}
      />
      <InputNumber
        min={0}
        max={100}
        value={filter.maxdistance >= 100 ? "INF" : filter.maxdistance}
        onChange={onMaxChange}
        style={{ marginRight: "0.5rem" }}
        disabled={!position}
      />
      <span className={styles.fade}>km</span>
    </div>
  );
};

export default DistanceFilter;
