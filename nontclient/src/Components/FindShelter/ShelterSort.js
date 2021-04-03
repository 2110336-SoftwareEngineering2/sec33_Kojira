import React, { useState, useEffect, useMemo } from "react";
import styles from "./FindShelter.module.css";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
const _ = require("lodash");

const ShelterSort = (props) => {
  const { sortedBy, setSortedBy, position } = props;

  const sortingMenu = (
    <Menu>
      <Menu.Item onClick={() => setSortedBy("Name")}>Name</Menu.Item>
      <Menu.Item onClick={() => setSortedBy("Rating")}>Rating</Menu.Item>
      {position && <Menu.Item onClick={() => setSortedBy("Distance")}>Distance</Menu.Item>}
      <Menu.Item onClick={() => setSortedBy("Price")}>Price</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <span className={styles.inputLabel}>Sorted by</span>
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
