import { TableFilterOption } from "@/utils/data/toTableFilter";
import { FacetOptions } from "./facetOption";

export interface Filter {
  columnName: string;
  filterLabel: string;
  options: FacetOptions[] | TableFilterOption[];
}


