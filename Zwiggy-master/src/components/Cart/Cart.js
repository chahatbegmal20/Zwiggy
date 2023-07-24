import { useContext, useState } from "react";

import CartContext from "../../store/cart-context";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
    const ctx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const cartItemAddHandler = (item) => {
        ctx.addItem(item);
    };

    const cartItemRemoveHandler = (id) => {
        ctx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);

        await fetch(process.env.REACT_APP_URL + "users.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                items: ctx.items,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setIsSubmitting(false);
        ctx.clearCart();
        setDidSubmit(true);
    };

    const cartItems = (
        <ul className={styles["cart-items"]}>
            {ctx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={props.onClose}>
                Close
            </button>
            {hasItems && (
                <button className={styles.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onClose={props.onClose}
                />
            )}
            {!isCheckout && modalActions}
        </>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <>
            <p>Successfully sent the order!</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}
