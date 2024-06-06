import { Lot } from "@/types/lot";
import { FlattenedLot } from "./flattenLots";

export const getContainerTotals = (lots: FlattenedLot[]) => {
    return lots.reduce( (accumulator: {[key: string]: number}, current: FlattenedLot) => {
        const type = current.containerTypeName;
        const amount = current.containers.length;
      
        if (accumulator[type]) {
          accumulator[type] += amount;
        } else {
          accumulator[type] = amount;
        }
      
        return accumulator
      
    }, {})
    
} 