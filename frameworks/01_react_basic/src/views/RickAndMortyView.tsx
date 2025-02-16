import React, { useEffect, useState } from "react";
import { getCharacters } from "../services/rickAndMortyService";
import { Character } from "../types/types";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import Spinner from "../components/Spinner";

const RickAndMortyView: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMoreCharacters, setHasMoreCharacters] = useState<boolean>(true);


    const fetchCharacters = async () => {
        setLoading(true);
        setError(null);
        try {
            const characterData = await getCharacters(currentPage, debouncedSearchTerm);
            setCharacters(characterData);


            if (debouncedSearchTerm) {
                setHasMoreCharacters(false);
            } else {
                setHasMoreCharacters(characterData.length === 20);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCharacters();
    }, [currentPage, debouncedSearchTerm]);


    const handleNextPage = () => {
        if (hasMoreCharacters) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="p-4">
            {/* Barra de búsqueda */}
            <SearchBar
                onSearch={(term) => setSearchTerm(term)}
                placeholder="Search characters..."
                debounce={true}
                debounceDelay={500}
            />

            {loading && (
                <div className="my-4">
                    <Spinner />
                </div>
            )}            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
                <>
                    {/* Lista de personajes */}
                    <ItemList
                        items={characters}
                        renderItem={(character) => (
                            <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl hover:border-blue-500 transition-shadow border border-gray-200">
                                {/* Imagen del personaje */}
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={character.image}
                                        alt={character.name}
                                        className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-md"
                                    />
                                </div>

                                {/* Información del personaje */}
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{character.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-600">Species:</span> {character.species}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-600">Gender:</span> {character.gender}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        <span className="font-medium text-gray-600">Location:</span> {character.location.name}
                                    </p>
                                    <p className="text-sm font-medium">
                                        Status:{" "}
                                        <span
                                            className={`${character.status === "Alive"
                                                ? "text-green-500"
                                                : character.status === "Dead"
                                                    ? "text-red-500"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {character.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}
                    />


                    {/* Controles de paginación */}
                    {!debouncedSearchTerm && (
                        <Pagination
                            currentPage={currentPage}
                            hasMore={hasMoreCharacters}
                            onPrevious={handlePreviousPage}
                            onNext={handleNextPage}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default RickAndMortyView;
