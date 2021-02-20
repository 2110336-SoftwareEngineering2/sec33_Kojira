import React from "react";
import UserType from "../../../Constants/UserType";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  CHANGING,
} from "../../../Constants/FormValidity";

const BankAccountForm = (props) => {
  const EMPTY_ALLOWED =
    props.accountType === UserType.NONT_OWNER &&
    props.validBankAccount === EMPTY;

  return (
    <div className="col-lg m-4">
      <label htmlFor="bank-input" className="form-label">
        Bank Account{" "}
      </label>
      <input
        type="text"
        className={"form-control ".concat(
          props.validBankAccount === DEFAULT ||
            props.validBankAccount === CHANGING ||
            EMPTY_ALLOWED
            ? ""
            : props.validBankAccount === VALID
            ? "is-valid"
            : "is-invalid"
        )}
        id="bank-input"
        name="bankAccount"
        value={props.value}
        onChange={props.onFormChange}
        onBlur={props.validateBankAccount}
        required={props.accountType === UserType.NONT_SITTER}
      />
      {props.validBankAccount === EMPTY && !EMPTY_ALLOWED && (
        <div className="invalid-feedback">Bank account cannot be empty.</div>
      )}
      {props.validBankAccount === INVALID && (
        <div className="invalid-feedback">Invalid bank account.</div>
      )}
    </div>
  );
};

export default BankAccountForm;
