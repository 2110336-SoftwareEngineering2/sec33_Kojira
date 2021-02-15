import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import NavigationLinks from "./NavigationLinks";
import Contexts from "../../Utils/Context/Contexts";
import styles from "./NavigationBar.module.css";

const UserTypeContext = Contexts.userTypeContext;

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <UserTypeContext.Consumer>
        {(value) => {
          setUserType(value.userType);
        }}
      </UserTypeContext.Consumer>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Logo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavigationLinks userType={userType} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
