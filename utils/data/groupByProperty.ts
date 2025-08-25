const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const groupByProperty = (array: any[], property: string) => {
  const isPropertyNested = property.split(".").length > 1;

  return array.reduce((groups, item) => {
    const value = isPropertyNested ? getNestedValue(item, property) : item[property];

    if (!groups[value]) {
      groups[value] = [];
    }

    groups[value].push(item);

    return groups;
  }, {} as Record<string, any[]>);
}



export type GroupByProperty = ReturnType<typeof groupByProperty>[number]
