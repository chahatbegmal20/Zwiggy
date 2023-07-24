import { useContext, useEffect, useState } from "react";

import CartIcon from "./Icon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderButton.module.css";

const HeaderButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnstyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnstyles} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderButton;
