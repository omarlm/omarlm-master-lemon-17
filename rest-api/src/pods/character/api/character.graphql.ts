import { Character } from './character.api-model';

// URL de la API GraphQL de Rick and Morty
const GRAPHQL_API_URL = 'https://rickandmortyapi.com/graphql';

// Consulta para obtener un personaje por ID
const GET_CHARACTER_QUERY = `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
      }
      location {
        name
        dimension
      }
      image
      episode {
        name
        episode
      }
      created
    }
  }
`;

// Consulta para obtener todos los personajes
const GET_CHARACTERS_QUERY = `
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }
`;

// Función para ejecutar consultas GraphQL
const executeGraphQLQuery = async (query: string, variables: any = {}) => {
  try {
    const response = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error executing GraphQL query:', error);
    throw error;
  }
};

// Función para obtener un personaje por ID usando GraphQL
export const getCharacterGraphQL = async (id: number): Promise<Character> => {
  try {
    const data = await executeGraphQLQuery(GET_CHARACTER_QUERY, { id });
    
    // Transformar la respuesta al formato esperado por la aplicación
    const character = data.character;
    
    // Mapear los episodios a un array de strings (URLs)
    const episodeUrls = character.episode.map(
      (ep: { name: string; episode: string }) => 
        `https://rickandmortyapi.com/api/episode/${ep.episode}`
    );
    
    return {
      ...character,
      episode: episodeUrls,
      url: `https://rickandmortyapi.com/api/character/${id}`,
      bestSentence: character.bestSentence || '', // Mantener el campo bestSentence si existe
    };
  } catch (error) {
    console.error('Error fetching character with GraphQL:', error);
    throw error;
  }
};

// Función para obtener todos los personajes usando GraphQL
export const getCharactersGraphQL = async (page = 1) => {
  try {
    const data = await executeGraphQLQuery(GET_CHARACTERS_QUERY, { page });
    return data.characters.results;
  } catch (error) {
    console.error('Error fetching characters with GraphQL:', error);
    throw error;
  }
};

// Función para obtener especies únicas usando GraphQL
export const getSpeciesGraphQL = async (): Promise<string[]> => {
  try {
    // Obtenemos los personajes de la primera página
    const characters = await getCharactersGraphQL(1);
    
    // Extraer especies únicas y asegurarnos de que son strings
    const uniqueSpecies = [...new Set(characters.map((character: any) => character.species))] as string[];
    return uniqueSpecies;
  } catch (error) {
    console.error('Error fetching species with GraphQL:', error);
    throw error;
  }
};
