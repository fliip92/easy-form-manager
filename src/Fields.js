import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const getLabelInfo = (required, info) => {
  if (required) {
    return info || "required";
  } else if (info) {
    return info;
  } else {
    return "";
  }
};


const InputField = props => {
  const {
    label = "",
    id = "",
    placeholder = "",
    required = false,
    helperText=""
  } = props;
  return (
    <TextField
      id={id}
      helperText={getLabelInfo(required, helperText)}
      placeholder={placeholder}
      label={label}
      margin="normal"
      type="textinput"
    />
  );
};


const CheckBox = props => {
  const {
    label = "",
    id = "",
    required = false  
  } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          label={label}
          id={id}
          type="checkbox"
        />
      }
      label="Primary"
    />
  )
}



export { InputField, CheckBox };