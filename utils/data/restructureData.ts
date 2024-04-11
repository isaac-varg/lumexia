// * restructures data depending on the provided structure
// * structure object
// *    key = defines the key in the original objects
// *    rename = false retains original key, string renames key to provided argument

interface Structure {
  key: string;
  rename: boolean | string;
}

export const restructureData = (
  data: { [key: string]: any }[],
  structure: Structure[]
) => {
  const newArr = data.reduce((acc, object) => {
    const newObj: { [key: string]: any } = {};

    structure.forEach(({ key, rename }) => {
      const keys = key.split(".");
      let value = object;
      keys.forEach((k) => {
        value = value[k];
      });

      if (value !== undefined) {
        const renameStr = typeof rename === "string" ? rename : key;
        newObj[renameStr] = value;
      }
    });

    // Check if the new object already exists in the accumulator
    const duplicate = acc.find(
      (item: any) => JSON.stringify(item) === JSON.stringify(newObj)
    );

    // If it doesn't exist, add it to the accumulator
    if (!duplicate) {
      acc.push(newObj);
    }

    return acc;
  }, [] as { [key: string]: any }[]);

  return newArr;
};
