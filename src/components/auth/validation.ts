export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateSignIn(input: { email: string; password: string }) {
  if (!input.email || !input.password) {
    return "Email and password are required."
  }

  if (!isValidEmail(input.email)) {
    return "Please enter a valid email address."
  }

  return undefined
}

export function validateSignUp(input: {
  fullName: string
  email: string
  password: string
}) {
  if (!input.fullName || !input.email || !input.password) {
    return "Full name, email, and password are required."
  }

  if (input.fullName.length < 2) {
    return "Full name must be at least 2 characters."
  }

  if (!isValidEmail(input.email)) {
    return "Please enter a valid email address."
  }

  if (input.password.length < 8) {
    return "Password must be at least 8 characters."
  }

  return undefined
}
