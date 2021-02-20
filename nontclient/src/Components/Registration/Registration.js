import React, { useState } from "react";
import "./Registration.css";
import UserType from "../../Constants/UserType";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import NameForm from "./NameForm";
import PhoneNumberForm from "./PhoneNumberForm";
import BankAccountForm from "./BankAccountForm";
import UserTypeButton from "./UserTypeButton";
import CheckService from "../../Services/CheckService";
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

  const [validEmail, setValidEmail] = useState(DEFAULT);
  const [validPassword, setValidPassword] = useState(DEFAULT);
  const [validRetypePassword, setValidRetypePassword] = useState(DEFAULT);
  const [validName, setValidName] = useState(DEFAULT);
  const [validPhoneNumber, setValidPhoneNumber] = useState(DEFAULT);
  const [validBankAccount, setValidBankAccount] = useState(DEFAULT);

  const [registered, setRegistered] = useState(false);

  const validator = {
    validateEmail: async () => {
      if (account.email.length === 0) {
        setValidEmail(EMPTY);
        return false;
      }
      try {
        const response = await CheckService.checkValidEmail(
          account.type,
          account.email
        );
        const validity = response.data;
        if (validity.status) {
          setValidEmail(VALID);
          return true;
        } else if (validity.exist) {
          setValidEmail(EXIST);
          return false;
        } else {
          setValidEmail(INVALID);
          return false;
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    validatePassword: () => {
      if (account.password.length >= 8 && account.password.length <= 32) {
        setValidPassword(VALID);
        return true;
      } else if (account.password.length === 0) {
        setValidPassword(EMPTY);
        return false;
      } else {
        setValidPassword(INVALID);
        return false;
      }
    },
    validateRetypePassword: () => {
      if (account.retypePassword.length === 0) {
        setValidRetypePassword(EMPTY);
        return false;
      }
      if (
        account.password === account.retypePassword &&
        account.retypePassword.length >= 8 &&
        account.retypePassword.length <= 32
      ) {
        setValidRetypePassword(VALID);
        return true;
      } else {
        setValidRetypePassword(INVALID);
        return false;
      }
    },
    validateName: async () => {
      if (account.name.length === 0) {
        setValidName(EMPTY);
        return false;
      }
      try {
        const response = await CheckService.checkValidName(
          account.type,
          account.name
        );
        const validity = response.data;
        if (validity.status) {
          setValidName(VALID);
          return true;
        } else if (validity.exist) {
          setValidName(EXIST);
          return false;
        } else {
          setValidName(INVALID);
          return false;
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    validatePhoneNumber: () => {
      if (account.phoneNumber.length === 0) {
        setValidPhoneNumber(EMPTY);
        return false;
      }
      const REGEX = /^[0-9]+$/;
      if (
        account.phoneNumber.length === 10 &&
        REGEX.test(account.phoneNumber)
      ) {
        setValidPhoneNumber(VALID);
        return true;
      } else {
        setValidPhoneNumber(INVALID);
        return false;
      }
    },
    validateBankAccount: () => {
      if (account.bankAccount.length === 0) {
        setValidBankAccount(EMPTY);
        if (account.type === UserType.NONT_OWNER) return true;
        else return false;
      }
      const REGEX = /^[0-9]+$/;
      if (
        account.bankAccount.length === 10 &&
        REGEX.test(account.bankAccount)
      ) {
        setValidBankAccount(VALID);
        return true;
      } else {
        setValidBankAccount(INVALID);
        return false;
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
      switch (key) {
        case "email":
          setValidEmail(CHANGING);
          break;
        case "password":
          setValidPassword(CHANGING);
          break;
        case "retypePassword":
          setValidRetypePassword(CHANGING);
          break;
        case "name":
          setValidName(CHANGING);
          break;
        case "phoneNumber":
          setValidPhoneNumber(CHANGING);
          break;
        case "bankAccount":
          setValidBankAccount(CHANGING);
          break;
        default:
          break;
      }
    } else {
      console.error(`Cannot update state. No ${key} in account state`);
    }
  }

  async function validateAll() {
    const emailResult = await validator.validateEmail();
    const passwordResult = validator.validatePassword();
    const retypePasswordResult = validator.validateRetypePassword();
    const nameResult = await validator.validateName();
    const phoneNumberResult = validator.validatePhoneNumber();
    const bankAccountResult = validator.validateBankAccount();
    return (
      emailResult &&
      passwordResult &&
      retypePasswordResult &&
      nameResult &&
      phoneNumberResult &&
      bankAccountResult
    );
  }

  async function submitRegistration() {
    const valid = await validateAll();
    if (!valid) return;
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
      setRegistered(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  if (registered) {
    return (
      <div className="container">
        <h1 className="my-5 text-center">
          Your account is successfully registered.
        </h1>
      </div>
    );
  }

  return (
    <div className="container" id="registration-container">
      <h1 className="my-5 text-center">Register Account</h1>
      <UserTypeButton
        onUserTypeButtonClick={handleUserTypeButtonClick}
        accountType={account.type}
      />
      <hr />
      <EmailForm
        onFormChange={handleFormChange}
        validateEmail={validator.validateEmail}
        validEmail={validEmail}
      />
      <PasswordForm
        onFormChange={handleFormChange}
        validatePassword={validator.validatePassword}
        validateRetypePassword={validator.validateRetypePassword}
        validPassword={validPassword}
        validRetypePassword={validRetypePassword}
      />
      <NameForm
        onFormChange={handleFormChange}
        validateName={validator.validateName}
        validName={validName}
      />
      <div className="row">
        <PhoneNumberForm
          onFormChange={handleFormChange}
          validatePhoneNumber={validator.validatePhoneNumber}
          validPhoneNumber={validPhoneNumber}
        />
        <BankAccountForm
          onFormChange={handleFormChange}
          accountType={account.type}
          validateBankAccount={validator.validateBankAccount}
          validBankAccount={validBankAccount}
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
