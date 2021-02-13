import React, { useState } from "react";
import "./Registration.css";
import { NONT_OWNER_TYPE, NONT_SITTER_TYPE } from "../../Constants/UserType";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import NameForm from "./NameForm";
import PhoneNumberForm from "./PhoneNumberForm";
import BankAccountForm from "./BankAccountForm";
import UserTypeButton from "./UserTypeButton";

const Registration = props => {
  const [account, setAccount] = useState({
    type: NONT_OWNER_TYPE,
    email: "",
    password: "",
    retypePassword: "",
    name: "",
    phoneNumber: "",
    bankAccount: "",
  });

  function handleUserTypeButtonClick(type) {
    if (type === NONT_OWNER_TYPE || type === NONT_SITTER_TYPE) {
      setAccount({ ...account, type });
    }
  }

  function handleFormChange(element) {
    const key = element.currentTarget.name;
    const value = element.currentTarget.value;
    if (Object.keys(account).includes(key)) {
      setAccount({ ...account, [key]: value });
    }
    else {
      console.error(`Cannot update state. No ${key} in account state`);
    }
  }

  function submitRegistration() {
    console.log("Submit", account);
  }

  return (
    <div className="container">
      <h1 className="my-5 text-center">Register Account</h1>
      <UserTypeButton onUserTypeButtonClick={handleUserTypeButtonClick} accountType={account.type} />
      <EmailForm onFormChange={handleFormChange} />
      <PasswordForm onFormChange={handleFormChange} />
      <NameForm onFormChange={handleFormChange} />
      <div className="row">
        <PhoneNumberForm onFormChange={handleFormChange} />
        <BankAccountForm onFormChange={handleFormChange} accountType={account.type} />
      </div>
      <div className="m-5" style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={submitRegistration}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Registration;
