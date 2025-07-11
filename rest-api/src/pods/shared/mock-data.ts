import { Character } from '../character/api/character.api-model';
import { mockCharacterCollection as originalMockCharacters } from '../character/api/character.mock-data';

// Copia de los datos mock para mantener los cambios en memoria durante la ejecución
export const inMemoryMockCharacters: Character[] = [...originalMockCharacters];

// Función para actualizar un personaje en memoria
export const updateCharacterInMemory = (character: Character): boolean => {
  const index = inMemoryMockCharacters.findIndex(c => c.id === character.id);
  
  if (index !== -1) {
    // Actualizar el personaje existente
    inMemoryMockCharacters[index] = { ...character };
  } else {
    // Añadir un nuevo personaje
    inMemoryMockCharacters.push({ ...character });
  }
  
  return true;
};

// Función para eliminar un personaje en memoria
export const deleteCharacterInMemory = (id: number): boolean => {
  const index = inMemoryMockCharacters.findIndex(c => c.id === id);
  
  if (index !== -1) {
    inMemoryMockCharacters.splice(index, 1);
    return true;
  }
  
  return false;
};
