import { FacetOptions } from "./facetOption";

export interface Filter {
    columnName: string;
    filterLabel: string; 
    options: FacetOptions[];
  }
  
  