import {
  dogDOBRules,
  emailRules,
  passwordRules,
  requiredRules,
} from '../composables/formRules'
import { breeds } from './breeds'

export const registrationFormFields = [
  {
    description: 'Enter your personal information',
    fields: [
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
      },
      {
        field: 'input',
        type: 'password',
        label: 'Confirm Password*',
        model: 'passwordConfirm',
        placeholder: 'Confirm password',
        hint: 'Password should be at least 8 characters long and contain at least one number and one letter',
        rules: passwordRules,
      },
    ],
  },
  {
    description:
      'Now tell us about your dog (you can add more dogs once your account is created)',
    fields: [
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
    ],
  },
]
