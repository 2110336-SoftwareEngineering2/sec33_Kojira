import React from "react";
import {
  VALID,
  DEFAULT,
} from "../../Constants/FormValidity";

const LicenseForm = (props) => {
    return(
    <div class="col m-4 mb-3">
        <label htmlFor="license-input"  className="form-label">
            License
            <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input 
            className="form-control-file" 
            type="file" 
            id="license-input"
            name="license" 
            onChange={props.onFormChange}
            multiple
        />
    </div>
    )
}

export default LicenseForm