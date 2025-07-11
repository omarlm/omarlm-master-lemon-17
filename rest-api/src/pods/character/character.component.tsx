import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import {
  TextFieldComponent,
  SelectComponent,
} from '#common/components';
import { formValidation } from './character.validations';
import { Character } from './character.vm';
import * as classes from './character.styles';

interface Props {
  character: Character;
  species: string[];
  onSave: (character: Character) => void;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character, species, onSave } = props;

  const statusOptions = [
    { id: 'Alive', name: 'Alive' },
    { id: 'Dead', name: 'Dead' },
    { id: 'unknown', name: 'Unknown' }
  ];

  const genderOptions = [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
    { id: 'Genderless', name: 'Genderless' },
    { id: 'unknown', name: 'Unknown' }
  ];

  const speciesOptions = species.map(s => ({ id: s, name: s }));

  return (
    <Formik
      onSubmit={onSave}
      initialValues={character}
      enableReinitialize={true}
      validate={formValidation.validateForm}
    >
      {() => (
        <Form className={classes.root}>
          {character.image && (
            <img src={character.image} alt={character.name} className={classes.characterImage} />
          )}
          <TextFieldComponent name="name" label="Name" />
          <SelectComponent name="status" label="Status" items={statusOptions} />
          <SelectComponent name="species" label="Species" items={speciesOptions} />
          <SelectComponent name="gender" label="Gender" items={genderOptions} />
          <TextFieldComponent name="origin" label="Origin" />
          <TextFieldComponent name="bestSentence" label="Best Sentence" multiline rows={2} />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};
