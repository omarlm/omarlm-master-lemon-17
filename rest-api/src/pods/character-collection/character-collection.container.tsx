import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from '#core/router';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';

export const CharacterCollectionContainer = () => {
  const { characterCollection, loadCharacterCollection } = useCharacterCollection();
  const navigate = useNavigate();

  React.useEffect(() => {
    loadCharacterCollection();
  }, []);

  const handleCreateCharacter = () => {
    navigate(linkRoutes.createCharacter);
  };

  const handleEdit = (id: number) => {
    navigate(linkRoutes.editCharacter(id.toString()));
  };

  const handleDelete = async (id: number) => {
    // En una implementación real, aquí se conectaría con la API para eliminar el personaje
    // await deleteCharacter(id);
    loadCharacterCollection();
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      onCreateCharacter={handleCreateCharacter}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
