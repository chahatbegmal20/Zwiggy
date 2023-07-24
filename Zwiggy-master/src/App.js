import { useState } from "react";

import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from "./store/CartProvider";

function App() {
    const [isCart, setIsCart] = useState(false);

    const showCartHandler = () => {
        setIsCart(true);
    };

    const hideCartHandler = () => {
        setIsCart(false);
    };

    return (
        <CartProvider>
            {isCart && <Cart onClose={hideCartHandler} />}
            <Header onShow={showCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
