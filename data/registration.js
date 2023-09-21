import {
  confirmPasswordRules,
  dogDOBRules,
  emailRules,
  passwordRules,
  requiredRules,
} from '../helpers/formRules'
import { breeds } from './breeds'

export const registrationForm = [
  {
    field: 'input',
    type: 'email',
    label: 'Email*',
    model: 'email',
    placeholder: 'Enter your email',
    rules: emailRules,
  },
  {
    field: 'input',
    type: 'password',
    label: 'Password*',
    model: 'password',
    placeholder: 'Enter a password',
    rules: passwordRules,
    hint: 'It should be at least 8 characters long and contain at least one number and one letter',
    col: true,
  },
  {
    field: 'input',
    type: 'password',
    label: 'Confirm Password*',
    model: 'passwordConfirm',
    placeholder: 'Confirm password',
    col: true,
  },
  {
    field: 'input',
    label: 'Your dog name*',
    model: 'dogName',
    placeholder: 'Enter your dog name',
    rules: requiredRules,
  },
  {
    label: 'Your dog date of birth',
    field: 'input',
    model: 'dateOfBirth',
    hint: "Enter the full date or just the month if you don't know the exact day",
    placeholder: 'Enter DD/MM/YYYY or just MM/YYYY',
    rules: dogDOBRules,
  },
  {
    field: 'select',
    label: 'First dog breed',
    model: 'dogBreed1',
    items: breeds,
    col: true,
  },
  {
    field: 'select',
    label: 'Second dog breed',
    model: 'dogBreed2',
    items: breeds,
    col: true,
  },
  {
    field: 'input',
    label: 'Your breeder name',
    placeholder: 'Enter your breeder name if applicable.',
    model: 'breederName',
  },
]
