export const emailRules = [
  (v) =>
    !v ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    'E-mail must be valid',
]

export const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 8) || 'Password must be at least 8 characters long',
  (v) => /\d/.test(v) || 'Password must contain at least 1 number',
  (v) => /[a-zA-Z]/.test(v) || 'Password must contain at least 1 letter',
]

export const requiredRules = [(v) => !!v || 'This field is required']
