export const validateText = (text: string): boolean => {
  // Remove leading and trailing spaces for validation
  const trimmedText = text.trim();

  // Check if the text consists of Latin letters, numbers, and spaces
  const regex = /^[A-Za-z0-9\s]+$/;

  // Check if the input is not empty and matches the regex
  const isValid = trimmedText.length > 0 && regex.test(trimmedText);

  return isValid;
};
