import React from "react";
import {
  VALID,
  DEFAULT,
} from "../../../Constants/FormValidity";

const PictureForm = (props) => {
    return(
    <div className="col m-4 mb-3">
        <label htmlFor="picture-input"  className="form-label">
            Picture
        </label>
        <input 
            className="form-control-file" 
            type="file" 
            id="picture-input"
            name="picture" 
            onChange={props.onChange}
            multiple
        />
    </div>
    )
}

export default PictureForm;