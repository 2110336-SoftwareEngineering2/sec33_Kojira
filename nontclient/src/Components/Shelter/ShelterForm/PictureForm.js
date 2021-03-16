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
            onChange={props.onFormChange}
            multiple
        />
    </div>
    )
}

export default PictureForm