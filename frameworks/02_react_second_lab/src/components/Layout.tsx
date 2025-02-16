import { useState } from "react"; // Para manejar el estado
import { Outlet, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { catsData, dogsData } from "../data/data";

export default function Layout() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [isCartVisible, setCartVisible] = useState(true);

    const selectedItems = [...catsData, ...dogsData].filter((item) =>
        cartItems.includes(item.id)
    );

    return (
        <div className="h-screen flex flex-col">
            {/* Menú de navegación */}
            <nav className="bg-blue-500 text-white p-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "font-bold underline" : "hover:underline"
                            }
                        >
                            Gatos
                        </NavLink>
                        <NavLink
                            to="/dogs-gallery"
                            className={({ isActive }) =>
                                isActive ? "font-bold underline" : "hover:underline"
                            }
                        >
                            Perros
                        </NavLink>
                    </div>
                    <NavLink
                        to="/checkout"
                        className="bg-blue-700 text-white px-4 py-2 rounded text-center hover:bg-blue-800"
                    >
                        Ir al Checkout
                    </NavLink>
                </div>
            </nav>

            <div className="flex flex-1 transition-all duration-300">
                {/* Área principal para las páginas */}
                <main
                    className={`p-4 bg-gray-100 overflow-auto transition-all duration-300 ${isCartVisible ? "flex-[3]" : "flex-[4]"
                        }`}
                >
                    <Outlet />
                </main>

                {/* Carrito fijo a la derecha con animación */}
                <aside
                    className={`relative bg-white shadow-lg border-l transform transition-all duration-300 ${isCartVisible ? "w-64 translate-x-0" : "w-0 translate-x-full"
                        }`}
                >
                    {/* Botón redondo en el borde izquierdo del carrito */}
                    <button
                        onClick={() => setCartVisible(!isCartVisible)}
                        className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600"
                    >
                        {isCartVisible ? ">" : "<"}
                    </button>

                    {isCartVisible && (
                        <div className="p-4">
                            <h2 className="text-lg font-bold">Carrito</h2>
                            {selectedItems.length === 0 ? (
                                <p>No hay elementos en el carrito.</p>
                            ) : (
                                <>
                                    <ul className="mb-4">
                                        {selectedItems.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex justify-between items-center mb-2"
                                            >
                                                <span>{item.title}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    X
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={clearCart}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Vaciar carrito
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
