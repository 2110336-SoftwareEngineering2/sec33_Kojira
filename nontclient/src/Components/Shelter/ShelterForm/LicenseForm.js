import React from "react";
import styles from "../Shelter.module.css";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../../Constants/FormValidity";

const LicenseForm = (props) => {
    return(
    <div className="col-12 col-sm m-4 mb-3">
        <label htmlFor="license-input"  className="form-label">
            License
        </label>
        <input 
            className="form-control-file" 
            type="file" 
            id="license-input"
            name="license" 
            onChange={props.onFormChange}
        />
    </div>
    )
}

export default LicenseForm