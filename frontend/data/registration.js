import { emailRules, passwordRules } from '../composables/formRules'

export const registrationFormFields = [
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
]
