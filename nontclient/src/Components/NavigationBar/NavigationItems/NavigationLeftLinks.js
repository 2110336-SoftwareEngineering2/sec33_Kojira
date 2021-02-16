import React from "react";
import UserType from "../../../Constants/UserType";

const NavigationLeftLinks = (props) => {
  return (
    <>
      <li className="nav-item active">
        <a className="nav-link" href="/dashboard">
          {" "}
          dashboard<span className="sr-only">(current)</span>
        </a>
      </li>
      {props.userType === UserType.NONT_OWNER && (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/reserve">
              reserve
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              nont
            </a>
          </li>
        </>
      )}
      {props.userType === UserType.NONT_SITTER && (
        <li className="nav-item">
          <a className="nav-link" href="/shelter">
            shelter
          </a>
        </li>
      )}
    </>
  );
};

export default NavigationLeftLinks;
