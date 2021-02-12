import React, { useState } from "react";
import "./Registration.css";
import { NONT_OWNER_TYPE, NONT_SITTER_TYPE } from "../../Constants/UserType";

function Registration(props) {
  const [account, setAccount] = useState({
    type: NONT_OWNER_TYPE,
    email: "",
    password: "",
    retypePassword: "",
    username: "",
    phoneNumber: "",
    bankAccount: "",
  });

  function userTypeButtonClickHandler(type) {
    if (type === NONT_OWNER_TYPE || type === NONT_SITTER_TYPE) {
      setAccount({ ...account, type });
    }
  }

  function handleChange(element) {
    const key = element.currentTarget.name;
    const value = element.currentTarget.value;
    setAccount({ ...account, [key]: value });
  }

  function registrationSubmit() {
    console.log("Submit", account);
  }

  return (
    <div className="container">
      <h1 className="my-5 text-center">Register Account</h1>
      <div
        className="row d-flex justify-content-center"
        style={{ height: "75px" }}
      >
        <div className="col-5" id="nont-owner-col">
          <button
            type="button"
            className={
              account.type === NONT_OWNER_TYPE
                ? "btn btn-info btn-block"
                : "btn btn-outline-info btn-block"
            }
            id="nont-owner-btn"
            onClick={() => userTypeButtonClickHandler(NONT_OWNER_TYPE)}
          >
            Nont Owner
          </button>
        </div>
        <div className="col-5" id="nont-sitter-col">
          <button
            type="button"
            className={
              account.type === NONT_SITTER_TYPE
                ? "btn btn-success btn-block"
                : "btn btn-outline-success btn-block"
            }
            id="nont-sitter-btn"
            onClick={() => userTypeButtonClickHandler(NONT_SITTER_TYPE)}
          >
            Nont Sitter
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col m-4">
          <label htmlFor="email-input" className="form-label">
            Email address{" "}
            <abbr className="required" title="required">
              *
            </abbr>
          </label>
          <input
            type="email"
            className="form-control"
            id="email-input"
            name="email"
            value={account.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg m-4">
          <label htmlFor="password-input" className="form-label">
            Password{" "}
            <abbr className="required" title="required">
              *
            </abbr>
          </label>
          <input
            type="password"
            id="password-input"
            className="form-control"
            name="password"
            value={account.password}
            onChange={handleChange}
            aria-describedby="password-desc"
            required
          />
          <div id="password-desc" className="form-text">
            Your password must be 8-32 characters long.
          </div>
        </div>
        <div className="col-lg m-4">
          <label htmlFor="retype-password-input" className="form-label">
            Retype Password{" "}
            <abbr className="required" title="required">
              *
            </abbr>
          </label>
          <input
            type="password"
            id="retype-password-input"
            className="form-control"
            name="retypePassword"
            value={account.retypePassword}
            onChange={handleChange}
            aria-describedby="retype-password-desc"
            required
          />
          <div id="retype-password" className="form-text">
            Please retype your password.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col m-4">
          <label htmlFor="username-input" className="form-label">
            Username{" "}
            <abbr className="required" title="required">
              *
            </abbr>
          </label>
          <input
            type="text"
            className="form-control"
            id="username-input"
            name="username"
            value={account.username}
            onChange={handleChange}
            aria-describedby="name-desc"
            required
          />
          <div id="name-desc" className="form-text">
            Your username must be 2-32 characters long.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg m-4">
          <label htmlFor="phone-input" className="form-label">
            Phone Number{" "}
            <abbr className="required" title="required">
              *
            </abbr>
          </label>
          <input
            type="text"
            className="form-control"
            id="phone-input"
            name="phoneNumber"
            value={account.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-lg m-4">
          <label htmlFor="bank-input" className="form-label">
            Bank Account{" "}
            {account.type === NONT_SITTER_TYPE && (
              <abbr className="required" title="required">
                *
              </abbr>
            )}
          </label>
          <input
            type="text"
            className="form-control"
            id="bank-input"
            name="bankAccount"
            value={account.bankAccount}
            onChange={handleChange}
            required={account.type === NONT_SITTER_TYPE}
          />
        </div>
      </div>
      <div className="m-5" style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={registrationSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Registration;
