import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
    onSearch: (term: string) => void;
    placeholder?: string;
    debounce?: boolean;
    debounceDelay?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = "Search...",
    debounce = false,
    debounceDelay = 500,
}) => {
    const [inputValue, setInputValue] = useState<string>("");


    const debouncedValue = useDebounce(inputValue, debounceDelay);


    useEffect(() => {
        if (debounce) {
            onSearch(debouncedValue);
        }
    }, [debouncedValue, debounce, onSearch]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!debounce) {
            onSearch(inputValue);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
                {!debounce && (
                    <button
                        type="submit"
                        className="absolute right-2.5 bottom-2.5 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Search
                    </button>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
