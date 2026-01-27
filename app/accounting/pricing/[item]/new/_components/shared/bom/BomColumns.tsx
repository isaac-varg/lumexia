"use client"
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { createColumnHelper } from "@tanstack/react-table"
import { PricingBomItemCost } from "../../../_actions/getBomItemCost"

const columnHelper = createColumnHelper<PricingBomItemCost>()

export const bomColumns = [
  columnHelper.accessor("identifier", {
    header: SortableHeaderType("#"),
  }),
  columnHelper.accessor("item.name", {
    header: SortableHeaderType("Item"),
  }),
  columnHelper.accessor("concentration", {
    header: SortableHeaderType("Concentration"),
    cell: (info) => `${toFracitonalDigits.digits(info.getValue(), 2)}%`,
  }),
  columnHelper.accessor("totalItemCost", {
    header: SortableHeaderType("$/lb"),
    cell: (info) => `$${toFracitonalDigits.pricingCurrency(info.getValue())}`,
  }),
  columnHelper.accessor("itemCostInBatch", {
    header: SortableHeaderType("$/Batch"),
    cell: (info) => `$${toFracitonalDigits.pricingCurrency(info.getValue())}`,
  }),
  columnHelper.accessor("itemCostPerLb", {
    header: SortableHeaderType("$/lb Contribution"),
    cell: (info) => `$${toFracitonalDigits.pricingCurrency(info.getValue())}`,
  }),
  columnHelper.accessor("priceUsed", {
    header: "Price Source",
  }),
]
