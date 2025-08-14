import { FlattenedLot } from "./flattenLots";

export const getContainerTotals = (lots: FlattenedLot[] | any[]) => {
  const totals = lots.reduce(
    (accumulator: { [key: string]: number }, current: FlattenedLot) => {
      const type = current.containerTypeName;
      const amount = current.containers.length;

      if (accumulator[type]) {
        accumulator[type] += amount;
      } else {
        accumulator[type] = amount;
      }

      return accumulator;
    },
    {},
  );

  // returns as an array of array instead of object
  return Object.entries(totals);
};
