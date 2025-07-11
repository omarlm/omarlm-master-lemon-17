import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 py-6 mt-8 border-t">
            <div className="container mx-auto px-4">
                {/* Navegación y Redes */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Navegación */}
                    <nav className="mb-4 md:mb-0">
                        <ul className="flex gap-4">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                >
                                    GitHub Organization Viewer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/rick-and-morty"
                                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                >
                                    Rick and Morty
                                </Link>
                            </li>
                        </ul>
                    </nav>


                    {/* Redes Sociales */}
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/omarlm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 1.5C6.477 1.5 2 5.977 2 11.5c0 4.42 2.865 8.166 6.839 9.493.5.092.682-.217.682-.483 0-.238-.008-.866-.013-1.7-2.782.604-3.369-1.343-3.369-1.343-.454-1.154-1.11-1.46-1.11-1.46-.907-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.983 1.031-2.681-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025a9.562 9.562 0 0 1 2.5-.336c.848.004 1.703.115 2.5.336 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.392.098 2.646.642.698 1.031 1.59 1.031 2.681 0 3.841-2.338 4.687-4.566 4.937.359.309.679.92.679 1.854 0 1.338-.012 2.419-.012 2.747 0 .267.18.578.688.479C19.14 19.662 22 15.919 22 11.5c0-5.523-4.477-10-10-10Z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
