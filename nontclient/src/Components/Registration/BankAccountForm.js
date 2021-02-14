import React from 'react';
import UserType from "../../Constants/UserType";

const BankAccountForm = props => {
  return (
    <div className="col-lg m-4">
      <label htmlFor="bank-input" className="form-label">
        Bank Account{" "}
        {props.accountType === UserType.NONT_SITTER && (
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
        onChange={props.onFormChange}
        onBlur={props.validateBankAccount}
        required={props.accountType === UserType.NONT_SITTER}
      />
    </div>
  );
}
 
export default BankAccountForm;