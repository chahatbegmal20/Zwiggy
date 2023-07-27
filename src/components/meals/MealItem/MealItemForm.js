import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    let enteredAmount = inputRef.current.value;
    const amount = +enteredAmount;
    if (enteredAmount.trim().length === 0 || amount < 1 || amount > 5) {
      setIsValid(false);
      return;
    }
    props.onAdd(amount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        attributes={{
          id: props.id,
          type: "number",

          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  );
}
export default MealItemForm;
