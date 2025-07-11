export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
  bestSentence?: string; // Campo para la mejor frase del personaje
}

export const createEmptyCharacter = (): Character => ({
  id: null,
  name: '',
  status: '',
  species: '',
  gender: '',
  origin: '',
  image: '',
  bestSentence: '', // Inicializado como cadena vacía
});
