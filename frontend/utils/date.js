export function matchRequiredDob(fullDate, birthDate) {
  if (!birthDate?.year || !birthDate?.month) return false

  const date = new Date(fullDate)

  return (
    date.getFullYear() === +birthDate.year &&
    date.getMonth() + 1 === +birthDate.month
  )
}

export function formatDate(dateStr) {
  const date = new Date(dateStr)

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function isValidPartialDate({ day, month, year }) {
  return !!month && !!year // Your current requirement
}

export function parseDobString(dobStr) {
  if (!dobStr) return { day: null, month: null, year: null }

  const [y, m = '', d = ''] = dobStr.split('-')

  return {
    year: y ? +y : null,
    month: m ? +m : null,
    day: d ? +d : null,
  }
}
