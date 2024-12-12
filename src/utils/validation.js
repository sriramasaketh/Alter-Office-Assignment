export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = password => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return passwordRegex.test(password)
}

export const validateUsername = username => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/
  return usernameRegex.test(username)
}

export const validateRequiredField = field => {
  return field && field.trim() !== ''
}

export const validateFormFields = fields => {
  const errors = {}

  for (const [field, value] of Object.entries(fields)) {
    if (!validateRequiredField(value)) {
      errors[field] = `${field} is required.`
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
