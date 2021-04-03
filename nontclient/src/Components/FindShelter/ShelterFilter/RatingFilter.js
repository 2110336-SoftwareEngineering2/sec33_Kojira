import React from "react";
import styles from "../FindShelter.module.css";
import { InputNumber, Slider } from "antd";

const RatingFilter = (props) => {
  const { filter, setFilter } = props;

  function onSliderChange(element) {
    setFilter({ ...filter, minRate: Math.round((5 - element) * 10) / 10 });
  }

  function onMinChange(element) {
    setFilter({ ...filter, minRate: element });
  }

  return (
    <div className="d-flex align-items-center">
      <span className={styles.inputLabel}>Minimum Rating</span>
      <Slider
        reverse
        min={0}
        max={5}
        step={0.1}
        value={Math.round((5 - filter.minRate) * 10) / 10}
        style={{ width: "100%", marginRight: "1rem" }}
        marks={{ 0: 5, 1: 4, 2: 3, 3: 2, 4: 1, 5: 0 }}
        onChange={onSliderChange}
        tooltipVisible={false}
      />
      <InputNumber
        min={0}
        max={5}
        value={filter.minRate}
        onChange={onMinChange}
      />
    </div>
  );
};

export default RatingFilter;
