import React, { useContext } from "react";
import Contexts from "../../Utils/Context/Contexts";
import NavigationLeftLinks from "./NavigationItems/NavigationLeftLinks";
import NavigationUserLinksCollapse from "./NavigationItems/NavigationUserLinksCollapse";
import NavigationUserLinksExpand from "./NavigationItems/NavigationUserLinksExpand";

const UserContext = Contexts.UserContext;

const Logout = (props) => {
  localStorage.removeItem("access_token");
};

const NavigationLinks = (props) => {
  const value = useContext(UserContext);
  return (
    <React.Fragment>
      {" "}
      <ul className="navbar-nav mr-auto">
        <NavigationLeftLinks userType={value.userType} />
      </ul>
      {/** Only show the dropdown in the expanded navigation bar (lg and xl) */}
      <ul className="navbar-nav d-block d-sm-none">
        <NavigationUserLinksCollapse value={value} logout={Logout} />
      </ul>
      <ul className="navbar-nav ml-auto d-none d-sm-block">
        <NavigationUserLinksExpand value={value} logout={Logout} />
      </ul>
    </React.Fragment>
  );
};

export default NavigationLinks;
