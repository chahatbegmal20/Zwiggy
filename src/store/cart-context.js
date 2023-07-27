import React from "react";

//it will create a context(object) that later can be used wherever needed
const CartContext = React.createContext({  
  items: [],
  total: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});
export default CartContext;
