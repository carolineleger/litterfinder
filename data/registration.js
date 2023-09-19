import { breeds } from './breeds'

export const registrationForm = [
  {
    field: 'input',
    type: 'email',
    label: 'Email',
    model: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    field: 'input',
    type: 'password',
    label: 'Password',
    model: 'password',
    placeholder:
      'Enter a password. It should be at least 8 characters long and contain at least one number and one letter',
    required: true,
  },
  {
    field: 'input',
    label: 'Your dog name',
    model: 'dogName',
    required: true,
    placeholder: 'Enter your dog name',
  },
  {
    field: 'date',
    label: 'Your dog birth date (requires at least the year of birth)',
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
    label: 'Second dog breed (optional)',
    model: 'dogBreed2',
    items: breeds,
    col: true,
  },
  {
    field: 'input',
    label: 'Your breeder name (optional)',
    placeholder: 'Enter your breeder name if applicable.',
    model: 'breederName',
  },
]
