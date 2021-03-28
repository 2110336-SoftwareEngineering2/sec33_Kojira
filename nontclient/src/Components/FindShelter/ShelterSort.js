import React, { useState, useEffect, useMemo } from "react";
import styles from "./FindShelter.module.css";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
const _ = require("lodash");

const ShelterSort = (props) => {
  const { filteredShelters, setSortedShelters } = props;

  const [sortedBy, setSortedBy] = useState("Distance");

  // Map from "sortedBy" to a key in a shelter
  const keyMapper = useMemo(
    () => ({
      Name: "name",
      Distance: "distance",
    }),
    []
  );

  useEffect(() => {
    setSortedShelters(_.sortBy(filteredShelters, keyMapper[sortedBy]));
  }, [sortedBy, filteredShelters, setSortedShelters, keyMapper]);

  const sortingMenu = (
    <Menu>
      <Menu.Item onClick={() => setSortedBy("Name")}>Name</Menu.Item>
      <Menu.Item onClick={() => setSortedBy("Distance")}>Distance</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <span className={"mr-1 " + styles.fade}>Sorted by</span>
      <Dropdown overlay={sortingMenu} trigger={["click"]}>
        <Button>
          <span className="mr-1">{sortedBy}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </React.Fragment>
  );
};

export default ShelterSort;
