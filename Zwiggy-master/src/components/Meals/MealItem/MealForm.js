import { useRef, useState } from "react";

import styles from "./MealForm.module.css";
import Input from "../../UI/Input";

export default function MealForm(props) {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = parseInt(amountInputRef.current.value);

        if (isNaN(enteredAmount) || enteredAmount < 0 || enteredAmount > 6) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount",
                    type: "number",
                    min: "1",
                    max: "6",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Amount is not valid</p>}
        </form>
    );
};
