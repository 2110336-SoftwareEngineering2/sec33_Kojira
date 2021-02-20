import React from "react";
import NavigationLinks from "./NavigationLinks";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light" id={styles.topNavBar}>
      <a className="navbar-brand" href="/home">
        <img src="/nont-logo.svg" id={styles.logo} alt="Nont logo"></img>
      </a>
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
