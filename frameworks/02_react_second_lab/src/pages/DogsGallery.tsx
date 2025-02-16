import { useCart } from "../hooks/useCart"; // Hook para acceder al contexto del carrito
import { dogsData } from "../data/data"; // Datos mockeados de perros
import { PictureInfo } from "../types/types"; // Interfaz para tipar las imágenes

export default function DogsGallery() {
    const { cartItems, addToCart, removeFromCart } = useCart(); // Acceso al contexto

    const handleCheckboxChange = (id: string, checked: boolean) => {
        if (checked) {
            addToCart(id); // Añadir al carrito si el checkbox se marca
        } else {
            removeFromCart(id); // Eliminar del carrito si el checkbox se desmarca
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Galería de Perros</h1>
            <div className="grid grid-cols-3 gap-4">
                {dogsData.map((dog: PictureInfo) => (
                    <div key={dog.id} className="border p-4 rounded shadow">
                        <img
                            src={dog.picUrl}
                            alt={dog.title}
                            loading="lazy"
                            className="w-full h-32 object-cover rounded"
                        />
                        <h2 className="mt-2 text-lg font-medium">{dog.title}</h2>
                        <input
                            type="checkbox"
                            id={`adopt-${dog.id}`}
                            className="mt-2"
                            checked={cartItems.includes(dog.id)}
                            onChange={(e) => handleCheckboxChange(dog.id, e.target.checked)}
                        />
                        <label
                            htmlFor={`adopt-${dog.id}`}
                            className="mt-2 mx-1"
                        >
                            Adopt
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
