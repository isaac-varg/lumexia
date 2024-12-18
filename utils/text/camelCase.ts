export const toCamelCase = (input: string): string => {
  return input
    .toLowerCase() 
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()); // Capitalize the character after non-alphanumeric symbols
}
