import React from "react";
import styles from "../FindShelter.module.css";
import { InputNumber, Slider } from "antd";

const NontAmountFilter = (props) => {
  const { filter, setFilter } = props;

  function onSliderChange(element) {
    setFilter({ ...filter, nontAmount: Math.round((21 - element) * 10) / 10 });
  }

  function onMinChange(element) {
    setFilter({ ...filter, nontAmount: element });
  }

  return (
    <div className="d-flex align-items-center">
      <span className={styles.inputLabel}>Nont Amount</span>
      <Slider
        reverse
        min={1}
        max={20}
        step={1}
        value={Math.round((21 - filter.nontAmount) * 10) / 10}
        style={{ width: "100%", marginRight: "1rem" }}
        marks={{ 1: 20, 4: 17, 7: 14, 11: 11, 14: 7, 17: 4, 20: 1 }}
        onChange={onSliderChange}
        tooltipVisible={false}
      />
      <InputNumber
        min={1}
        max={20}
        value={filter.nontAmount}
        onChange={onMinChange}
      />
    </div>
  );
};

export default NontAmountFilter;
