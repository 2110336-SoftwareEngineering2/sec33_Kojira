import React from 'react';
import { NONT_SITTER_TYPE } from "../../Constants/UserType"

const BankAccountForm = props => {
  return (
    <div className="col-lg m-4">
      <label htmlFor="bank-input" className="form-label">
        Bank Account{" "}
        {props.accountType === NONT_SITTER_TYPE && (
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
        required={props.accountType === NONT_SITTER_TYPE}
      />
    </div>
  );
}
 
export default BankAccountForm;