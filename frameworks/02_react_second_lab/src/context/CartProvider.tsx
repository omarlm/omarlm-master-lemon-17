import React, { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<string[]>([]);

    const addToCart = (id: string) => {
        setCartItems((prev) => [...prev, id]);
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
