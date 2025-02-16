import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Fondo desenfocado */}
            <div className="absolute inset-0 backdrop-blur-sm"></div>

            <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:cursor-pointer hover:text-black text-lg"
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
