import { CharacterEntityApi } from './character-collection.api-model';
import { getCharacterCollectionGraphQL } from './character-collection.graphql';
import { ApiType } from '../../../core/api-context/api-context';
import { inMemoryMockCharacters } from '../../shared/mock-data';

// URL base del servidor mock local
const API_BASE_URL = 'http://localhost:3000';

export const getCharacterCollection = async (apiType: ApiType = 'mock'): Promise<CharacterEntityApi[]> => {
  // Seleccionar la fuente de datos según el tipo de API
  if (apiType === 'mock') {
    console.log('Usando datos mock para la colección de personajes');
    return inMemoryMockCharacters;
  } else if (apiType === 'graphql') {
    console.log('Usando GraphQL para la colección de personajes');
    return await getCharacterCollectionGraphQL();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/characters`);
    
    if (!response.ok) {
      throw new Error(`Error fetching character collection: ${response.statusText}`);
    }
    
    const characters = await response.json();
    return characters;
  } catch (error) {
    console.error('Error fetching character collection:', error);
    // Fallback a datos mock si hay un error
    return inMemoryMockCharacters;
  }
};
