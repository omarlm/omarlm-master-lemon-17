import { useCart } from "../hooks/useCart";
import { catsData } from "../data/data";
import { PictureInfo } from "../types/types";

export default function CatsGallery() {
    const { cartItems, addToCart, removeFromCart } = useCart();

    const handleCheckboxChange = (id: string, checked: boolean) => {
        if (checked) {
            addToCart(id);
        } else {
            removeFromCart(id);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Galería de Gatos</h1>
            <div className="grid grid-cols-3 gap-4">
                {catsData.map((cat: PictureInfo) => (
                    <div key={cat.id} className="border p-4 rounded shadow">
                        <img
                            src={cat.picUrl}
                            alt={cat.title}
                            loading="lazy"
                            className="w-full h-32 object-cover rounded"
                        />
                        <h2 className="mt-2 text-lg font-medium">{cat.title}</h2>
                        <input
                            type="checkbox"
                            id={`adopt-${cat.id}`}
                            className="mt-2"
                            checked={cartItems.includes(cat.id)}
                            onChange={(e) => handleCheckboxChange(cat.id, e.target.checked)}
                        />
                        <label
                            htmlFor={`adopt-${cat.id}`}
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
