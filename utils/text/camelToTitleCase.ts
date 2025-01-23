export const camelToTitleCase = (str: string): string => {
  const result = str.replace(/([A-Z])/g, ' $1');
  
  return result
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

