import { CharacterEntityApi } from './character-collection.api-model';

// URL de la API GraphQL de Rick and Morty
const GRAPHQL_API_URL = 'https://rickandmortyapi.com/graphql';

// Consulta para obtener la colección de personajes
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
        gender
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

// Función para obtener la colección de personajes usando GraphQL
export const getCharacterCollectionGraphQL = async (): Promise<CharacterEntityApi[]> => {
  try {
    const data = await executeGraphQLQuery(GET_CHARACTERS_QUERY, { page: 1 });
    
    // Mapear los resultados al formato esperado por la aplicación
    return data.characters.results.map((character: any) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      image: character.image,
      bestSentence: character.bestSentence || '', // Mantener el campo bestSentence si existe
    }));
  } catch (error) {
    console.error('Error fetching character collection with GraphQL:', error);
    throw error;
  }
};
