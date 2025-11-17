type OptionValue = string | number | boolean;


export interface TableFilterOption {
  value: OptionValue;
  label: string;
}

/**
 * Generic function to map an array to unique Options
 * @param items - The array of raw data objects
 * @param getValue - Function to selector the unique ID (value): (i) => <return>
 * @param getLabel - Function to selector the display text (label): (i) => <return>

 */
export const toTableFilter = <T>(
  items: T[],
  getValue: (item: T) => OptionValue,
  getLabel: (item: T) => string
): TableFilterOption[] => {
  const map = new Map<OptionValue, TableFilterOption>();

  items.forEach((item) => {
    const value = getValue(item);
    const label = getLabel(item);

    if (!map.has(value)) {
      map.set(value, { value, label });
    }
  });

  return Array.from(map.values());

};
