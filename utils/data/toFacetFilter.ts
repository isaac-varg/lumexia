import { FacetOptions } from "@/types/facetOption";
import { restructureData } from "./restructureData";

// * A specific use of the restructureData utility
// * This is for easily creating facet filter options directly from fetched data

interface Structure {
    key: string; 
    rename: boolean | string 
  }

export const toFacetFilter = (array: any[], value: string, label: string) => {
    const structure : Structure[] = [
      {
        key: value,
        rename: "value"
      },
      {
        key: label,
        rename: "label"
      }
    ];
  
    const data = restructureData(array, structure) as FacetOptions[]
    return data
  }