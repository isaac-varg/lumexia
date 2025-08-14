import { FlattenedLot } from "./flattenLots";

export const getOnHandTotal = (lots: FlattenedLot[] | any[]) => {
  return lots.reduce(
    (accumulator: number, current: FlattenedLot) =>
      accumulator + current.totalQuantityOnHand, 0
  );
};
