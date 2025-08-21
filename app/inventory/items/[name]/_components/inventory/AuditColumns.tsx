"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ItemInventoryAudits } from "../../_actions/inventory/getAudits";
import { DateTime } from "luxon";
import { dateFormatWithTime } from "@/configs/data/dateFormatString";



const columnHelper = createColumnHelper<ItemInventoryAudits['combined'][number]>();

export const auditColumns = [
  columnHelper.accessor("createdAt", {
    id: 'createdAt',
    header: 'Created At',
    cell: (row) => DateTime.fromJSDate(row.row.original.createdAt).toFormat(dateFormatWithTime),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },

  }),
  columnHelper.accessor('type', {
    header: 'Audit Type',
  })
]
