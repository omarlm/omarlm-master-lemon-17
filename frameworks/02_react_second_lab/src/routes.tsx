import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import CatsGallery from "./pages/CatsGallery";
import DogsGallery from "./pages/DogsGallery";
import Checkout from "./pages/Checkout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <CatsGallery /> },
            { path: "/dogs-gallery", element: <DogsGallery /> },
            { path: "/checkout", element: <Checkout /> },
        ],
    },
]);
