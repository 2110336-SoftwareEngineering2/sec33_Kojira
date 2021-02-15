import React, { useState } from "react";
import NavigationLinks from "./NavigationLinks";
import Contexts from "../../Utils/Context/Contexts";
import "./NavigationBar.module.css";

const userContext = Contexts.userContext;

const NavigationBar = (props) => {
  return (
    <div>
      <userContext.Consumer>
        {(value) => {
          return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="/home">
                Navbar
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <NavigationLinks userType={value.userType} />
              </div>
            </nav>
          );
        }}
      </userContext.Consumer>
    </div>
  );
};

export default NavigationBar;
