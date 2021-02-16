import React from "react";
import styles from "./NavigationLinks.module.css";
import Contexts from "../../Utils/Context/Contexts";
import NavigationLeftLinks from "./NavigationItems/NavigationLeftLinks";
import NavigationUserLinksCollapse from "./NavigationItems/NavigationUserLinksCollapse";
import NavigationUserLinksExpand from "./NavigationItems/NavigationUserLinksExpand";

const userContext = Contexts.userContext;

const Logout = (value) => {
  value.setUserType(null);
  value.setLogin(null);
  value.setEmail(null);
  localStorage.removeItem("access_token");
};

const NavigationLinks = (props) => {
  return (
    <userContext.Consumer>
      {(value) => {
        return (
          <>
            {" "}
            <ul className="navbar-nav mr-auto">
              <NavigationLeftLinks userType={value.userType} />
            </ul>
            {/** Only show the dropdown in the expanded navigation bar (lg and xl) */}
            <ul className="navbar-nav d-block d-lg-none">
              <NavigationUserLinksCollapse
                value={value}
                logout={() => Logout(value)}
              />
            </ul>
            <ul className="navbar-nav ml-auto d-none d-lg-block">
              <NavigationUserLinksExpand
                value={value}
                logout={() => Logout(value)}
              />
            </ul>
          </>
        );
      }}
    </userContext.Consumer>
  );
};

export default NavigationLinks;
