import React, { useState, useContext, useEffect } from "react";
import _ from "lodash";
import UserType from "../../../Constants/UserType";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import NameForm from "./NameForm";
import PhoneNumberForm from "./PhoneNumberForm";
import BankAccountForm from "./BankAccountForm";
import CheckService from "../../../Services/CheckService";
import SettingService from "../../../Services/SettingService";
import {
  DEFAULT,
  CHANGING,
  VALID,
  INVALID,
  EXIST,
  EMPTY,
} from "../../../Constants/FormValidity";
import Contexts from "../../../Utils/Context/Contexts";

const UpdateAccount = (props) => {
  const user = useContext(Contexts.UserContext);

  const [account, setAccount] = useState({
    email: "",
    password: "",
    retypePassword: "",
    name: "",
    phoneNumber: "",
    bankAccount: "",
  });

  const [defaultAccount, setDefaultAccount] = useState({
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

  const [updated, setUpdated] = useState(0);

  async function getAccountInfo() {
    try {
      const response = await SettingService.getAccountInfo(
        user.userType,
        user._id
      );
      const info = _.pick(response.data, ['email', 'name', 'phoneNumber']);
      if (response.data.bankAccount) {
        info.bankAccount = response.data.bankAccount;
      } else {
        info.bankAccount = "";
      }
      info.password = "";
      info.retypePassword = "";
      setAccount(info);
      setDefaultAccount(info);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (user._id) {
      getAccountInfo();
    }
  }, [user._id, updated]);

  const validator = {
    validateEmail: async () => {
      if (account.email === defaultAccount.email) {
        setValidEmail(DEFAULT);
        return true;
      }
      if (account.email.length === 0) {
        setValidEmail(EMPTY);
        return false;
      }
      try {
        const response = await CheckService.checkValidEmail(
          user.userType,
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
        return true;
      } else {
        setValidPassword(INVALID);
        return false;
      }
    },
    validateRetypePassword: () => {
      if (account.retypePassword.length === 0) {
        setValidRetypePassword(EMPTY);
        if (account.password.length === 0) return true;
        else return false;
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
      if (account.name === defaultAccount.name) {
        setValidName(DEFAULT);
        return true;
      }
      if (account.name.length === 0) {
        setValidName(EMPTY);
        return false;
      }
      try {
        const response = await CheckService.checkValidName(
          user.userType,
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
      if (account.phoneNumber === defaultAccount.phoneNumber) {
        setValidPhoneNumber(DEFAULT);
        return true;
      }
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
      if (account.bankAccount === defaultAccount.bankAccount) {
        setValidBankAccount(DEFAULT);
        return true;
      }
      if (account.bankAccount.length === 0) {
        setValidBankAccount(EMPTY);
        if (user.userType === UserType.NONT_OWNER) return true;
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

  async function submitUpdate() {
    const valid = await validateAll();
    if (!valid) return;
    const body = {};
    if (validEmail !== DEFAULT) body.email = account.email;
    if (validPassword !== EMPTY && validPassword !== DEFAULT) body.password = account.password;
    if (validName !== DEFAULT) body.name = account.name;
    if (validPhoneNumber !== DEFAULT) body.phoneNumber = account.phoneNumber;
    if (validBankAccount !== DEFAULT) body.bankAccount = account.bankAccount;
    if (_.isEmpty(body)) return;
    body._id = user._id;
    try {
      const response = await SettingService.updateAccount(user.userType, body);
      console.log(response);
      setUpdated(updated + 1);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="container">
      <h1 className="my-5 text-center">Update Account</h1>
      {updated > 0 && (
        <div className="alert alert-primary" role="alert">
          The account has been successfully updated.
        </div>
      )}
      <EmailForm
        onFormChange={handleFormChange}
        validateEmail={validator.validateEmail}
        validEmail={validEmail}
        value={account.email}
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
        value={account.name}
      />
      <div className="row">
        <PhoneNumberForm
          onFormChange={handleFormChange}
          validatePhoneNumber={validator.validatePhoneNumber}
          validPhoneNumber={validPhoneNumber}
          value={account.phoneNumber}
        />
        <BankAccountForm
          onFormChange={handleFormChange}
          accountType={user.userType}
          validateBankAccount={validator.validateBankAccount}
          validBankAccount={validBankAccount}
          value={account.bankAccount}
        />
      </div>
      <div className="m-5" style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={submitUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateAccount;
