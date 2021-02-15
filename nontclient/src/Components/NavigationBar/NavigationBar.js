import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import NavigationLinks from "./NavigationLinks";
import Contexts from "../../Utils/Context/Contexts";
import styles from "./NavigationBar.module.css";

const UserTypeContext = Contexts.userTypeContext;

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <UserTypeContext.Consumer>
        {(value) => {
          return (
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Logo</NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="container-fluid" navbar>
                  <NavigationLinks userType={value.userType} />
                </Nav>
              </Collapse>
            </Navbar>
          );
        }}
      </UserTypeContext.Consumer>
    </div>
  );
};

export default NavigationBar;
