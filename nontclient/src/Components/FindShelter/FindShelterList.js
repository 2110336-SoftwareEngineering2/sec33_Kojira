import React, { useEffect, useState } from "react";
import styles from "./FindShelter.module.css";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ShelterCard from "./ShelterCard";
import ShelterFilter from "./ShelterFilter/ShelterFilter";

const FindShelterList = (props) => {
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [displayedShelters, setDisplayedShelters] = useState([]);
  const [sortedBy, setSortedBy] = useState("Name");

  // Set default filtered shelters
  useEffect(() => {
    setFilteredShelters(props.allShelters);
  }, [props.allShelters]);

  // Set the shelters that will be shown to users.
  useEffect(() => {
    setDisplayedShelters(filteredShelters);
  }, [filteredShelters]);

  const sortedByMenu = (
    <Menu>
      <Menu.Item>
        <button className={styles.textButton}>Name</button>
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 text-center m-3">
          <ShelterFilter
            allShelters={props.allShelters}
            setFilteredShelters={setFilteredShelters}
          />
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <span className={styles.fade}>
            Showing {displayedShelters.length} results
          </span>
        </div>
        <div className="d-flex">
          <span className={"mr-1 " + styles.fade}>Sorted by</span>
          <Dropdown overlay={sortedByMenu}>
            <button
              className={"ant-dropdown-link " + styles.textButton}
              onClick={(e) => e.preventDefault()}
            >
              <span className="mr-1">{sortedBy}</span>
              <DownOutlined />
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="row">
        {displayedShelters.map((shelter) => (
          <div
            className={
              "col-12 col-sm-6 col-md-4 col-lg-3 " + styles.shelterCardCol
            }
            key={shelter._id}
          >
            <ShelterCard shelter={shelter} position={props.position} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default FindShelterList;
