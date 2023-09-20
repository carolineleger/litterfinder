import { breeds } from './breeds'
import { emailRules, passwordRules, requiredRules } from './formRules'

export const registrationForm = [
  {
    field: 'input',
    type: 'email',
    label: 'Email*',
    model: 'email',
    placeholder: 'Enter your email',
    required: true,
    rules: emailRules,
  },
  {
    field: 'input',
    type: 'password',
    label: 'Password*',
    model: 'password',
    placeholder:
      'Enter a password. It should be at least 8 characters long and contain at least one number and one letter',
    required: true,
    rules: passwordRules,
  },
  {
    field: 'input',
    label: 'Your dog name*',
    model: 'dogName',
    required: true,
    placeholder: 'Enter your dog name',
    rules: requiredRules,
  },
  {
    field: 'date',
    model: 'dateOfBirth',
    required: true,
  },
  {
    field: 'select',
    label: 'First dog breed',
    model: 'dogBreed1',
    items: breeds,
    required: true,
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
