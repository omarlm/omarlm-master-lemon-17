import * as apiModel from './api/character.api-model';
import * as viewModel from './character.vm';

export const mapCharacterFromApiToVm = (
  character: apiModel.Character
): viewModel.Character => ({
  id: character.id,
  name: character.name,
  status: character.status,
  species: character.species,
  gender: character.gender,
  origin: character.origin.name,
  image: character.image,
  bestSentence: character.bestSentence || '', // Mapeo del campo bestSentence
});

export const mapCharacterFromVmToApi = (character: viewModel.Character): apiModel.Character =>
  ({
    ...character,
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    gender: character.gender,
    bestSentence: character.bestSentence, // Incluimos el campo bestSentence
    origin: {
      name: character.origin,
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    type: '',
    episode: [],
    url: '',
    created: new Date().toISOString(),
  } as unknown as apiModel.Character);
