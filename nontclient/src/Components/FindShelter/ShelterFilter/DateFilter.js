import React from "react";
import styles from "../FindShelter.module.css";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const DateFilter = (props) => {
  const { filter, setFilter } = props;

  function onChange(element) {
    if (!element) setFilter({ ...filter, date: null });
    else {
      const startDate = new Date(
        element[0]._d.getFullYear(),
        element[0]._d.getMonth(),
        element[0]._d.getDate(),
        0,
        0,
        0
      );
      const endDate = new Date(
        element[1]._d.getFullYear(),
        element[1]._d.getMonth(),
        element[1]._d.getDate(),
        23,
        59,
        59
      );
      setFilter({ ...filter, date: [startDate, endDate] });
    }
  }

  return (
    <div className="d-flex align-items-center">
      <span className={styles.inputLabel}>Available Date</span>
      <RangePicker format="D-M-YYYY" onChange={onChange} />
    </div>
  );
};

export default DateFilter;
