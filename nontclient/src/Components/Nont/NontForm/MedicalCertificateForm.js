import React from "react";
import {
  VALID,
  DEFAULT,
} from "../../../Constants/FormValidity";

const MedicalCertificateForm = (props) => {
    return(
    <div className="col m-4 mb-3">
        <label htmlFor="medical_certificate-input"  className="emphasis form-label">
            Medical certificate
        </label>
        <input 
            className="form-control-file" 
            type="file" 
            id="medical_certificate-input"
            name="medical_certificate" 
            onChange={props.onChange}
            defaultValue = {props.defaultValue}
            multiple
        />
    </div>
    )
}

export default MedicalCertificateForm;