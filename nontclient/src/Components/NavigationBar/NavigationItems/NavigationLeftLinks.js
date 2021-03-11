import React from "react";
import UserType from "../../../Constants/UserType";
import styles from "../NavigationLinks.module.css";

const NavigationLeftLinks = (props) => {
  return (
    <React.Fragment>
      {props.userType === UserType.NONT_OWNER && (
        <React.Fragment>
          <li className="nav-item">
            <a className={"nav-link " + styles.leftLink} href="/dashboard">
              {" "}
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + styles.leftLink} href="/findShelter">
              Find Shelter
            </a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + styles.leftLink} href="/nont">
              Nont
            </a>
          </li>
        </React.Fragment>
      )}
      {props.userType === UserType.NONT_SITTER && (
        <React.Fragment>
          <li className="nav-item">
            <a className={"nav-link " + styles.leftLink} href="/dashboard">
              {" "}
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + styles.leftLink} href="/shelter">
              Shelter
            </a>
          </li>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NavigationLeftLinks;
