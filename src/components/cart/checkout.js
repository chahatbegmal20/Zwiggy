import { useRef, useState } from "react";
import classes from "./checkout.module.css";

function isEmpty(data) {
  return data.trim() === "";
}

function has4Chars(data) {
  return data.trim().length === 5;
}

function Checkout(props) {
  const [formValidity, setFormValidity] = useState({
    nameIsValid: true,
    streetIsValid: true,
    cityIsValid: true,
    codeIsValid: true,
  });

  const nameRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
  const streetRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredCode = postalCodeRef.current.value;

    setFormValidity({
      nameIsValid: !isEmpty(enteredName),
      streetIsValid: !isEmpty(enteredStreet),
      cityIsValid: !isEmpty(enteredCity),
      codeIsValid: has4Chars(enteredCode),
    });

    let formIsValid =
      formValidity.nameIsValid &&
      formValidity.streetIsValid &&
      formValidity.cityIsValid &&
      formValidity.codeIsValid;
      if(!formIsValid)
      return;

     let userData={
      enteredName,
      enteredStreet,
      enteredCity,
      enteredCode
     } ;
     props.onConfirm(userData);
  }

  const nameInputClasses = `${classes.control} ${
    formValidity.nameIsValid ? "" : classes.invalid
  }`;
  const streetInputClasses = `${classes.control} ${
    formValidity.streetIsValid ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    formValidity.cityIsValid ? "" : classes.invalid
  }`;
  const codeInputClasses = `${classes.control} ${
    formValidity.codeIsValid ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        {!formValidity.nameIsValid && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="Street">Street</label>
        <input type="text" id="Street" ref={streetRef}></input>
        {!formValidity.streetIsValid && <p>Please enter a valid street!</p>}
      </div>
      <div className={codeInputClasses}>
        <label htmlFor="code">Postal Code</label>
        <input type="text" id="code" ref={postalCodeRef}></input>
        {!formValidity.codeIsValid && <p>Please enter a valid code!</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.cityIsValid && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onHide}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}
export default Checkout;
