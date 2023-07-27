import { useReducer } from "react";
import CartContext from "./cart-context.js";

const defaultState = {
  items: [],
  total: 0,
};

// we can also define it inside component() but as we don't use any of its thing here so it will cause unnecessary
// re-rendering of this function
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.total + action.item.price * action.item.amount;
    console.log(updatedTotalAmount);

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      total: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const selectedItem = state.items[itemIndex];
    const updatedTotal = state.total - selectedItem.price;
    let updatedItems;
    if (selectedItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      let updatedItem = {
        ...selectedItem,
        amount: selectedItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      total: updatedTotal,
    };
  } else if (action.type === "CLEAR") return defaultState;

  return defaultState;
};

function CartProvider(props) {
  //we are not using 2 useState hooks here as we have 2 dependent and complex states going to use in removeitem()
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const clearCartHandler=()=>{
    dispatchCartAction({type:'CLEAR'});
  }

  const cartContextValue = {
    items: cartState.items,
    total: cartState.total,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart:clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}
export default CartProvider;
