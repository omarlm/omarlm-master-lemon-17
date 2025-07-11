import { useCart } from "../hooks/useCart";
import { catsData, dogsData } from "../data/data";

export default function Checkout() {
    const { cartItems } = useCart();

    const selectedItems = [...catsData, ...dogsData].filter((item) =>
        cartItems.includes(item.id)
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            {selectedItems.length === 0 ? (
                <p>No tienes elementos en el carrito.</p>
            ) : (
                <div>
                    <ul className="mb-4">
                        {selectedItems.map((item) => (
                            <li key={item.id} className="mb-2">
                                {item.title}
                            </li>
                        ))}
                    </ul>
                    <p className="font-bold">Gracias por tu compra.</p>
                </div>
            )}
        </div>
    );
}
