import React, { useState, useEffect } from "react";
import nontTypes from "../../../Constants/nontTypes";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../../Constants/FormValidity";

const TypeForm = (props) => {
  const types = Object.values(nontTypes);
  const [selectType, SetSelectType] = useState(props.defaultValue);

  useEffect( () => {
    SetSelectType(props.defaultValue);
  }, [props.defaultValue])
  
  return (
      <div className="col m-4">
        <label htmlFor="type-input" className="form-label">
          Type{" "}
          <abbr style={{color:"red"}} title="required"> 
            *
          </abbr>
        </label>
        <select 
          className={"form-control ".concat(
            props.valid === DEFAULT
              ? ""
              : props.valid === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          id="type-input" 
          name="type-input"
          onChange={(e) => {
            props.onChange(e);
            SetSelectType(e.target.value);
          } }
          aria-describedby="type-desc"
          value={selectType}
          required>
          {types.map((type) => (
            <option key={type} value={type}> {type} </option>      
          ))}
        </select>

        {props.valid === INVALID && document.getElementById("type-input").value.length === 0 &&
        <div id="type-desc" className="form-text" style={{color:"red"}}>
          Type is required.
        </div>}

      </div>
  );
};

export default TypeForm;
