import { Character } from "../types/types";

const BASE_URL = "https://rickandmortyapi.com/api/character";

export const getCharacters = async (page: number = 1, searchTerm?: string): Promise<Character[]> => {
    try {
        const apiUrl = searchTerm
            ? `${BASE_URL}/?name=${encodeURIComponent(searchTerm)}`
            : `${BASE_URL}/?page=${page}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch characters: ${response.statusText}`);
        }

        const data = await response.json();
        return data.results as Character[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
    }
};
