import React, { useContext } from "react";
import NavigationLinks from "./NavigationLinks";
import styles from "./NavigationBar.module.css";
import Contexts from "../../Utils/Context/Contexts";
import UserType from "../../Constants/UserType";

const UserContext = Contexts.UserContext;

const NavigationBar = () => {
  const value = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark" id={styles.topNavBar}>
      {
        (value.userType === UserType.NONT_OWNER || value.userType === UserType.NONT_SITTER) &&
        <a className="navbar-brand" href="/dashboard">
          <img src="/nont-logo.svg" id={styles.logo} alt="Nont logo"></img>
        </a>
      }
      {
        (value.userType !== UserType.NONT_OWNER && value.userType !== UserType.NONT_SITTER) &&
        <a className="navbar-brand" href="/home">
          <img src="/nont-logo.svg" id={styles.logo} alt="Nont logo"></img>
        </a>
      }
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <NavigationLinks />
      </div>
    </nav>
  );
};

export default NavigationBar;
