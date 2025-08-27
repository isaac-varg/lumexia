"use client";
import { PricingExamination } from "@/actions/accounting/examinations/getAllByItem";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import { dateFormatString } from "@/configs/data/dateFormatString";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

const columnHelper = createColumnHelper<PricingExamination>();

export const examinationColumns = [
  columnHelper.accessor("user.name", {
    id: 'userName',
    header: SortableHeaderType("Conducted By"),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Conducted On",
    cell: (row) => {
      return DateTime.fromJSDate(row.row.original.createdAt).toFormat(dateFormatString);
    },

  }),
]
