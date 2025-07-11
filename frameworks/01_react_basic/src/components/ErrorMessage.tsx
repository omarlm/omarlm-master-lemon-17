import React from "react";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {message}
        </div>
    );
};

export default ErrorMessage;
