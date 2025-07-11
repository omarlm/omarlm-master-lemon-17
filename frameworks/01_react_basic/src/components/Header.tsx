import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <header className="bg-white text-gray-900 shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo o Título */}
                <h1 className="text-2xl font-bold">01 React Basic</h1>

                {/* Menú para pantallas grandes */}
                <nav className="hidden md:flex">
                    <ul className="flex gap-4">
                        <li>
                            <Link
                                to="/"
                                className="rounded-md bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 text-sm font-semibold"
                            >
                                GitHub Organization Viewer
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/rick-and-morty"
                                className="rounded-md bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 text-sm font-semibold"
                            >
                                Rick and Morty
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Botón de Menú Hamburguesa para pantallas pequeñas */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-900"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menú colapsado para pantallas pequeñas */}
            {isMenuOpen && (
                <nav className="md:hidden bg-gray-100 shadow-inner">
                    <ul className="flex flex-col gap-2 p-4">
                        <li>
                            <Link
                                to="/"
                                className="block rounded-md bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 text-sm font-semibold"
                            >
                                GitHub Organization Viewer
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/rick-and-morty"
                                className="block rounded-md bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 text-sm font-semibold"
                            >
                                Rick and Morty
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
