import moment from 'moment'
export const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) =>
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(v.trim()) ||
    'E-mail must be valid',
]

export const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 8) || 'Password must be at least 8 characters long',
  (v) => /\d/.test(v) || 'Password must contain at least 1 number',
  (v) => /[a-zA-Z]/.test(v) || 'Password must contain at least 1 letter',
]

export const requiredRules = [(v) => !!v || 'This field is required']

export const dogDOBRules = [
  (v) => !!v || 'Date of Birth is required',
  (v) => {
    const dateFormat = 'DD/MM/YYYY'
    const monthYearFormat = 'MM/YYYY'

    // Check if the value matches the DD/MM/YYYY format
    if (moment(v, dateFormat, true).isValid()) {
      return true
    }

    // Check if the value matches the MM/YYYY format
    if (moment(v, monthYearFormat, true).isValid()) {
      return true
    }

    return 'Date of Birth must be in DD/MM/YYYY or MM/YYYY format'
  },
]

export const confirmPasswordRules = (password) => [
  (v) => !!v || 'Password confirmation is required',
  (v) => v === password || 'Passwords do not match',
]
