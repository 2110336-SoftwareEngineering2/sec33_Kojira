import React from "react";
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import UserType from "../../Constants/UserType";

const NavigationLinks = (props) => {
  return (
    <>
      <NavItem>
        <NavLink href="/dashboard">dashboard</NavLink>
      </NavItem>
      <NavItem>
        {props.userType === UserType.NONT_OWNER && (
          <NavLink href="/reserve">reserve</NavLink>
        )}
        {props.userType === UserType.NONT_SITTER && (
          <NavLink href="/shelter">shelters</NavLink>
        )}
      </NavItem>
      {props.userType === UserType.NONT_OWNER && (
        <NavLink href="/nont">nonts</NavLink>
      )}
      <div className="ml-auto">
        <UncontrolledDropdown>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
  );
};

export default NavigationLinks;
