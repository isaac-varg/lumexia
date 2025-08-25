const getNestedValue = <T extends object>(obj: T, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj as any);
}

export const groupByProperty = <T extends object>(
  array: T[],
  property: string
): Record<string, T[]> => {
  const isPropertyNested = property.includes(".");

  return array.reduce((groups, item) => {
    const value = isPropertyNested
      ? getNestedValue(item, property)
      : (item as any)[property];

    if (value === null || value === undefined) {
      return groups;
    }

    const key = String(value);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);

    return groups;
  }, {} as Record<string, T[]>);
}

