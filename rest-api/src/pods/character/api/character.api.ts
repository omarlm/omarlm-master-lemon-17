import { Character } from './character.api-model';
import { getCharacterGraphQL, getSpeciesGraphQL } from './character.graphql';
import { ApiType } from '../../../core/api-context/api-context';
import { inMemoryMockCharacters, updateCharacterInMemory } from '../../shared/mock-data';

// URL base del servidor mock local
const API_BASE_URL = 'http://localhost:3000';

// Función para obtener un personaje por ID desde la fuente seleccionada
export const getCharacter = async (id: number, apiType: ApiType = 'mock'): Promise<Character> => {
  // Seleccionar la fuente de datos según el tipo de API
  if (apiType === 'mock') {
    console.log(`Usando datos mock para el personaje con ID ${id}`);
    return inMemoryMockCharacters.find((c) => c.id === id);
  } else if (apiType === 'graphql') {
    console.log(`Usando GraphQL para el personaje con ID ${id}`);
    return await getCharacterGraphQL(id);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/characters/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching character: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    return inMemoryMockCharacters.find((c) => c.id === id);
  }
};

// Función para obtener las especies desde la fuente seleccionada
export const getSpecies = async (apiType: ApiType = 'mock'): Promise<string[]> => {
  // Seleccionar la fuente de datos según el tipo de API
  if (apiType === 'mock') {
    console.log('Usando datos mock para las especies');
    // Extraer especies únicas de los personajes en memoria
    const uniqueSpecies = [...new Set(inMemoryMockCharacters.map(character => character.species))];
    return uniqueSpecies;
  } else if (apiType === 'graphql') {
    console.log('Usando GraphQL para las especies');
    return await getSpeciesGraphQL();
  }

  try {
    // Obtenemos todos los personajes y extraemos las especies únicas
    const response = await fetch(`${API_BASE_URL}/characters`);
    if (!response.ok) {
      throw new Error(`Error fetching species: ${response.statusText}`);
    }
    const characters: Character[] = await response.json();
    
    // Extraer especies únicas
    const uniqueSpecies = [...new Set(characters.map(character => character.species))];
    return uniqueSpecies;
  } catch (error) {
    console.error('Error fetching species:', error);
    // Fallback a datos mock si hay un error
    const uniqueSpecies = [...new Set(inMemoryMockCharacters.map(character => character.species))];
    return uniqueSpecies;
  }
};

// Función para guardar un personaje en la fuente seleccionada
export const saveCharacter = async (character: Character, apiType: ApiType = 'mock'): Promise<boolean> => {
  // Seleccionar la fuente de datos según el tipo de API
  if (apiType === 'mock') {
    console.log('Guardando personaje en memoria:', character);
    return updateCharacterInMemory(character);
  } else if (apiType === 'graphql') {
    // GraphQL de Rick and Morty es solo lectura, simulamos una operación exitosa
    console.log('Simulando guardado de personaje en GraphQL (solo lectura):', character);
    return true;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/characters/${character.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });

    if (!response.ok) {
      throw new Error(`Error saving character: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving character:', error);
    return false;
  }
};
