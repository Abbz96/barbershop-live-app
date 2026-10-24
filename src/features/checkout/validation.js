// Input checks for the mock payment form. They catch typos early so the
// demo behaves like a real checkout; a real provider validates again.

const digitsOnly = (value) => value.replace(/\D/g, '')

// Swedish mobile: 07X XXX XX XX, optionally written as +46 7X…
export function isValidSwishNumber(value) {
  const compact = value.replace(/[\s-]/g, '')
  return /^(\+467|07)\d{8}$/.test(compact)
}

// Luhn checksum — the standard check digit on every payment card number.
export function isValidCardNumber(value) {
  const digits = digitsOnly(value)
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let digit = Number(digits[digits.length - 1 - i])
    if (i % 2 === 1) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
  }
  return sum % 10 === 0
}

// MM/ÅÅ, not in the past.
export function isValidExpiry(value, today = new Date()) {
  const match = value.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  return year > today.getFullYear() || (year === today.getFullYear() && month >= today.getMonth() + 1)
}

export const isValidCvc = (value) => /^\d{3,4}$/.test(value)

// Input formatters, applied as the user types.
export const formatCardNumber = (value) =>
  digitsOnly(value).slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ')

export function formatExpiry(value) {
  const digits = digitsOnly(value).slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}
