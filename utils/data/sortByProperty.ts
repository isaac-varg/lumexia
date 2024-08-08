//  provide a value in main object (e.g., array[0].property)
// or value in a single extra depth object (e.g., array[0].property.property)
// to sort the sortData

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const sortByProperty = (array: any[], property: string) => {
  
  const isPropertyNested = property.split(".").length > 1;
  
  const sorted = array.sort((a, b) => {
    const valueA = isPropertyNested ? getNestedValue(a, property) : property;
    const valueB = isPropertyNested ? getNestedValue(b, property) : property;

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });

  return sorted;
}
