import { createContext } from "react";

export interface CartContextType {
    cartItems: string[];
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
