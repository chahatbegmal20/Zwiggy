import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const CartCtx = useContext(CartContext);
  const {items}=CartCtx;
  const [buttonBump, setButtonBump] = useState(false);
  const NumberOfItems = items.reduce((prevValue, currentItem) => {
    return prevValue + currentItem.amount;
  }, 0);

  //adding button bump class depending on state
  let buttonClasses = `${classes.button} ${buttonBump ? classes.bump : ""}`;
  useEffect(() => {
    if(items.length===0)
    return;
    setButtonBump(true); //setting it true whenever item array changes
    const timerdId= setTimeout(() => {
      setButtonBump(false);
    }, 300);//we are removing it after 300 ms as the animation duration is 300 ms

    return ()=>{ //cleaner() to clear timer when again item array changes hence button willl not bump again if clicked before 300 ms
      clearTimeout(timerdId);
    }
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{NumberOfItems}</span>
    </button>
  );
}
export default HeaderCartButton;
