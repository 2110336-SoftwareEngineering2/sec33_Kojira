import React, { useState } from "react";
import "./Registration.css";
import UserType from "../../Constants/UserType";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import NameForm from "./NameForm";
import PhoneNumberForm from "./PhoneNumberForm";
import BankAccountForm from "./BankAccountForm";
import UserTypeButton from "./UserTypeButton";
import RegisterService from "../../Services/RegisterService";

const Registration = (props) => {
  const [account, setAccount] = useState({
    type: UserType.NONT_OWNER,
    email: "",
    password: "",
    retypePassword: "",
    name: "",
    phoneNumber: "",
    bankAccount: "",
  });

  const [valid, setValid] = useState({
    email: null,
    password: null,
    retypePassword: null,
    name: null,
    phoneNumber: null,
    bankAccount: null,
  });

  const validator = {
    validateEmail: () => {},
    validatePassword: () => {
      if (account.password.length >= 8 && account.password.length <= 32) {
        setValid({ ...valid, password: true });
      } else {
        setValid({ ...valid, password: false });
      }
    },
    validateRetypePassword: () => {
      if (account.password === account.retypePassword) {
        setValid({ ...valid, retypePassword: true });
      } else {
        setValid({ ...valid, retypePassword: false });
      }
    },
    validateName: () => {},
    validatePhoneNumber: () => {
      const REGEX = /^[0-9]+$/;
      if (
        account.phoneNumber.length === 10 &&
        REGEX.test(account.phoneNumber)
      ) {
        setValid({ ...valid, phoneNumber: true });
      } else {
        setValid({ ...valid, phoneNumber: false });
      }
    },
    validateBankAccount: () => {
      if (account.type === UserType.NONT_OWNER && account.bankAccount.length === 0) {
        return setValid({ ...valid, bankAccount: true });
      }
      const REGEX = /^[0-9]+$/;
      if (
        account.bankAccount.length === 10 &&
        REGEX.test(account.bankAccount)
      ) {
        setValid({ ...valid, bankAccount: true });
      } else {
        setValid({ ...valid, bankAccount: false });
      }
    },
  };

  function handleUserTypeButtonClick(type) {
    if (type === UserType.NONT_OWNER || type === UserType.NONT_SITTER) {
      setAccount({ ...account, type });
    }
  }

  function handleFormChange(element) {
    const key = element.currentTarget.name;
    const value = element.currentTarget.value;
    if (Object.keys(account).includes(key)) {
      setAccount({ ...account, [key]: value });
    } else {
      console.error(`Cannot update state. No ${key} in account state`);
    }
  }

  async function submitRegistration() {
    const body = {
      email: account.email,
      password: account.password,
      name: account.name,
    };
    if (account.phoneNumber.length > 0) body.phoneNumber = account.phoneNumber;
    if (account.bankAccount.length > 0) body.bankAccount = account.bankAccount;
    try {
      const response = await RegisterService.registerAccount(
        account.type,
        body
      );
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="container">
      <h1 className="my-5 text-center">Register Account</h1>
      <UserTypeButton
        onUserTypeButtonClick={handleUserTypeButtonClick}
        accountType={account.type}
      />
      <EmailForm
        onFormChange={handleFormChange}
        validateEmail={validator.validateEmail}
        validEmail={valid.email}
        emptyEmail={account.email.length === 0}
      />
      <PasswordForm
        onFormChange={handleFormChange}
        validatePassword={validator.validatePassword}
        validateRetypePassword={validator.validateRetypePassword}
        validPassword={valid.password}
        validRetypePassword={valid.retypePassword}
        emptyPassword={account.password.length === 0}
        emptyRetypePassword={account.retypePassword.length === 0}
      />
      <NameForm
        onFormChange={handleFormChange}
        validateName={validator.validateName}
        validName={valid.name}
        emptyName={account.name.length === 0}
      />
      <div className="row">
        <PhoneNumberForm
          onFormChange={handleFormChange}
          validatePhoneNumber={validator.validatePhoneNumber}
          validPhoneNumber={valid.phoneNumber}
          emptyPhoneNumber={account.phoneNumber.length === 0}
        />
        <BankAccountForm
          onFormChange={handleFormChange}
          accountType={account.type}
          validateBankAccount={validator.validateBankAccount}
          validBankAccount={valid.bankAccount}
          emptyBankAccount={account.bankAccount.length === 0}
        />
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
};

export default Registration;
