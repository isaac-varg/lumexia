//  provide a value in main object (e.g., array[0].property)
// or value in a single extra depth object (e.g., array[0].property.property)
// to sort the sortData

const getNestedValue = <T>(obj: T, path: string): any => {
  return path.split('.').reduce((acc: any, part: string) => acc && acc[part], obj);
};

export const sortByProperty = <T>(array: T[], property: string): T[] => {
  // Create a shallow copy to avoid mutating the original array
  const sorted = [...array].sort((a, b) => {
    const valueA = getNestedValue(a, property);
    const valueB = getNestedValue(b, property);

    // Handle cases where values might be null or undefined for robust sorting
    if (valueA === null || typeof valueA === 'undefined') return 1;
    if (valueB === null || typeof valueB === 'undefined') return -1;
    
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });

  return sorted;
};
