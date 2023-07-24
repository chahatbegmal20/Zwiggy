import { useContext } from "react";

import styles from "./MealItem.module.css";
import MealForm from "./MealForm";
import CartContext from "../../../store/cart-context";

export default function MealItem(props) {
    const ctx = useContext(CartContext);

    const addToCartHandler = (amount) => {
        ctx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount,
        });
    };

    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{`$${props.price.toFixed(2)}`}</div>
            </div>
            <div>
                <MealForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
}
