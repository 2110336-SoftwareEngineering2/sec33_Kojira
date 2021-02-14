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
import {
  DEFAULT,
  CHANGING,
  VALID,
  INVALID,
  EXIST,
  EMPTY,
} from "../../Constants/FormValidity";

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
    email: DEFAULT,
    password: DEFAULT,
    retypePassword: DEFAULT,
    name: DEFAULT,
    phoneNumber: DEFAULT,
    bankAccount: DEFAULT,
  });

  const validator = {
    validateEmail: async () => {
      if (account.email.length === 0) {
        return setValid({ ...valid, email: EMPTY });
      }
      try {
        const response = await RegisterService.checkValidEmail(
          account.type,
          account.email
        );
        const validity = response.data;
        if (validity.status) {
          setValid({ ...valid, email: VALID });
        } else if (validity.exist) {
          setValid({ ...valid, email: EXIST });
        } else {
          setValid({ ...valid, email: INVALID });
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    validatePassword: () => {
      if (account.password.length >= 8 && account.password.length <= 32) {
        setValid({ ...valid, password: VALID });
      }
      else if (account.password.length === 0) {
        setValid({ ...valid, password: EMPTY });
      }
      else {
        setValid({ ...valid, password: INVALID });
      }
    },
    validateRetypePassword: () => {
      if (account.retypePassword.length === 0) {
        return setValid({ ...valid, retypePassword: EMPTY });
      }
      if (
        account.password === account.retypePassword &&
        account.retypePassword.length >= 8 &&
        account.retypePassword.length <= 32
      ) {
        setValid({ ...valid, retypePassword: VALID });
      } else {
        setValid({ ...valid, retypePassword: INVALID });
      }
    },
    validateName: async () => {
      if (account.name.length === 0) {
        return setValid({ ...valid, name: EMPTY });
      }
      try {
        const response = await RegisterService.checkValidName(
          account.type,
          account.name
        );
        const validity = response.data;
        if (validity.status) {
          setValid({ ...valid, name: VALID });
        } else if (validity.exist) {
          setValid({ ...valid, name: EXIST });
        } else {
          setValid({ ...valid, name: INVALID });
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    validatePhoneNumber: () => {
      if (account.phoneNumber.length === 0) {
        return setValid({ ...valid, phoneNumber: EMPTY });
      }
      const REGEX = /^[0-9]+$/;
      if (
        account.phoneNumber.length === 10 &&
        REGEX.test(account.phoneNumber)
      ) {
        setValid({ ...valid, phoneNumber: VALID });
      } else {
        setValid({ ...valid, phoneNumber: INVALID });
      }
    },
    validateBankAccount: () => {
      if (account.bankAccount.length === 0) {
        return setValid({ ...valid, bankAccount: EMPTY });
      }
      const REGEX = /^[0-9]+$/;
      if (
        account.bankAccount.length === 10 &&
        REGEX.test(account.bankAccount)
      ) {
        setValid({ ...valid, bankAccount: VALID });
      } else {
        setValid({ ...valid, bankAccount: INVALID });
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
      if (valid[key] !== CHANGING) {
        setValid({ ...valid, [key]: CHANGING });
      }
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
      />
      <PasswordForm
        onFormChange={handleFormChange}
        validatePassword={validator.validatePassword}
        validateRetypePassword={validator.validateRetypePassword}
        validPassword={valid.password}
        validRetypePassword={valid.retypePassword}
      />
      <NameForm
        onFormChange={handleFormChange}
        validateName={validator.validateName}
        validName={valid.name}
      />
      <div className="row">
        <PhoneNumberForm
          onFormChange={handleFormChange}
          validatePhoneNumber={validator.validatePhoneNumber}
          validPhoneNumber={valid.phoneNumber}
        />
        <BankAccountForm
          onFormChange={handleFormChange}
          accountType={account.type}
          validateBankAccount={validator.validateBankAccount}
          validBankAccount={valid.bankAccount}
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
