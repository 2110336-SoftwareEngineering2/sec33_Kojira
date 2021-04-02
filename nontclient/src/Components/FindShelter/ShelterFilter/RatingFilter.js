import React from "react";
import styles from "../FindShelter.module.css";
import { InputNumber, Slider } from "antd";

const RatingFilter = (props) => {
  const { filter, setFilter } = props;

  function onSliderChange(element) {
    setFilter({ ...filter, minrate: element[0], maxrate: element[1] });
  }

  function onMinChange(element) {
    if (element <= filter.maxrate) {
      setFilter({ ...filter, minrate: element });
    }
  }

  function onMaxChange(element) {
    if (element >= filter.minrate) {
      setFilter({ ...filter, maxrate: element });
    }
  }

  return (
    <div className="d-flex align-items-center">
      <span className={styles.inputLabel}>Rating</span>
      <InputNumber
        min={0}
        max={5}
        value={filter.minrate}
        onChange={onMinChange}
      />
      <Slider
        range
        min={0}
        max={5}
        step={0.1}
        value={[filter.minrate, filter.maxrate]}
        style={{ width: "100%", marginLeft: "1rem", marginRight: "1rem" }}
        marks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }}
        onChange={onSliderChange}
        tooltipVisible={false}
      />
      <InputNumber
        min={0}
        max={5}
        value={filter.maxrate}
        onChange={onMaxChange}
      />
    </div>
  );
};

export default RatingFilter;
