import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from './api';
import { createEmptyCharacter, Character } from './character.vm';
import { mapCharacterFromApiToVm, mapCharacterFromVmToApi } from './character.mappers';
import { CharacterComponent } from './character.component';
import { useApiContext } from '../../core/api-context/api-context';

export const CharacterContainer: React.FunctionComponent = () => {
  const [character, setCharacter] = React.useState<Character>(createEmptyCharacter());
  const [species, setSpecies] = React.useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { apiType } = useApiContext();

  const handleLoadSpecies = async () => {
    const apiSpecies = await api.getSpecies(apiType);
    setSpecies(apiSpecies);
  };

  const handleLoadCharacter = async () => {
    const apiCharacter = await api.getCharacter(Number(id), apiType);
    setCharacter(mapCharacterFromApiToVm(apiCharacter));
  };

  React.useEffect(() => {
    if (id) {
      handleLoadCharacter();
    }
    handleLoadSpecies();
  }, []);

  const handleSave = async (character: Character) => {
    const apiCharacter = mapCharacterFromVmToApi(character);
    const success = await api.saveCharacter(apiCharacter, apiType);
    if (success) {
      navigate(-1);
    } else {
      alert('Error on save character');
    }
  };

  return <CharacterComponent character={character} species={species} onSave={handleSave} />;
};
