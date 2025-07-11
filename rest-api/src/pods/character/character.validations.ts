import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema: ValidationSchema = {
  field: {
    name: [Validators.required],
    status: [Validators.required],
    species: [Validators.required],
    gender: [Validators.required],
    origin: [Validators.required],
  },
};

export const formValidation = createFormikValidation(validationSchema);
