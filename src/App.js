import { useState } from "react";
import CartProvider from './store/CartProvider.js';
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";

function App() {
  const [cartIsShown, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {/*// we can provide our context here like this and can manage the context values inside this
    //app component but as we want to make this component clean we manage it in another component
     <CartContext.Provider
       value={{
         items: [], //will refer to items array in this component
         total: 0, //will refer to total in this component
         additem: () => {}, //will refer to a function in this component
         removItem: () => {}, //so on
   }}
     > */}

      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>

      {/* // </CartContext.Provider> */}
    </CartProvider>
  );
}

export default App;
