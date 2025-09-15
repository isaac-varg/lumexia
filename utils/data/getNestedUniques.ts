// limit the depth to five, so we don't look too much
type Prev = [never, 0, 1, 2, 3, 4, 5, ...Array<never>];

// path joining
type Join<K, P> = K extends string | number
  ? P extends string | number
  ? `${K}${'' extends P ? '' : '.'}${P}`
  : never
  : never;


type Paths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends (infer U)[] // If T is an array, get paths of the array's element type
  ? Paths<U, Prev[D]>
  : T extends object // If T is an object, iterate over its keys
  ? {
    [K in keyof T]-?: K extends string | number
    ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
    : never;
  }[keyof T]
  : ''; // If T is a primitive, the path ends

type DeepValue<T, P extends string> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
  ? T[K] extends (infer U)[] // If the property is an array, recurse on the element type
  ? DeepValue<U, R>
  : DeepValue<T[K], R> // Otherwise, recurse on the property type
  : never
  : P extends keyof T
  ? T[P] extends (infer U)[] // At the end of the path, if it's an array, return element type
  ? U
  : T[P] // Otherwise, return the property type
  : never;


function getValuesRecursively(obj: any, pathParts: string[]): any[] {
  // If the object is null/undefined or we've reached the end of the path, return the value.
  if (obj === null || obj === undefined || pathParts.length === 0) {
    return [obj];
  }

  const [currentKey, ...restOfPath] = pathParts;
  const value = obj[currentKey];

  // If the current value is an array, we need to recurse for each item
  // and flatten the results into a single array.
  if (Array.isArray(value)) {
    return value.flatMap(item => getValuesRecursively(item, restOfPath));
  } else {
    // Otherwise, continue traversing down the object.
    return getValuesRecursively(value, restOfPath);
  }
}

export function getUniqueValuesByPath<
  T extends object,
  P extends Paths<T>
>(data: T[], path: P): DeepValue<T, P>[] {
  const pathParts = path.split('.');

  const allValues = data.flatMap(item => getValuesRecursively(item, pathParts));

  const validValues = allValues.filter(v => v !== null && v !== undefined);

  return Array.from(new Set(validValues)) as DeepValue<T, P>[];
}
