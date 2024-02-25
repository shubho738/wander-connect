
const validatePasswordCharLimit = (password: string): boolean => (password.length <= 64)

export default validatePasswordCharLimit