// Function for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (email) => emailRegex.test(email);
