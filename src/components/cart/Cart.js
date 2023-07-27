import { useContext, useState } from "react";
import Modal from "../UI/modal/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context.js";
import CartItem from "./CartItem/CartItem";
import Checkout from "./checkout";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [ordered, setOrdered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const hasItems = cartCtx.items.length > 0;
  const removeHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addHandler = (item) => {
    cartCtx.addItem({...item,amount:1});
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          name={item.name}
          amount={item.amount}
          onRemove={removeHandler.bind(null, item.id)}
          onAdd={addHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  function orderHandler() {
    setOrdered(true);
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const confirmHandler = async (userData) => {
    setSubmitting(true);
    await fetch("https://react-demo-51a5a-default-rtdb.firebaseio.com/users.json", 
      {
        method: "POST",
        body: JSON.stringify({
          userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  };
  const cartData = (
    <>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`₹${cartCtx.total.toFixed(2)}`}</span>
      </div>
      {ordered && (
        <Checkout onHide={props.onHideCart} onConfirm={confirmHandler} />
      )}
      {!ordered && modalActions}
    </>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {!submitting && !submitted && cartData}
      {submitting && <p>Processing Your Order...</p>}
      {submitted && (
        <>
          <p>Successfully Placed Your Order</p>
          <div className={classes.actions}>
            <button
              className={classes["button-alt"]}
              onClick={props.onHideCart}
            >
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
export default Cart;
