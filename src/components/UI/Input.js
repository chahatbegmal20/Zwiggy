import React from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      {/*The spread operator will take all keyvalue pairs from object and add as attributes to tag */}
      <label htmlFor={props.attributes.id}>{props.label}</label>
      <input ref={ref} {...props.attributes}></input>
    </div>
  );
});
export default Input;
