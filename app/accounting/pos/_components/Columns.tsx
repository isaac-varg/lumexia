import { createColumnHelper } from "@tanstack/react-table";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { PoWithAccounting } from "../_actions/getPoWithAccountingDetails";
import Tag, { TagColor } from "@/components/Text/Tag";
import { FilterFunction } from "@/components/DataTable/FilterFunction";


const columnHelper = createColumnHelper<PoWithAccounting>();


export const poAccountingColumns = [
  columnHelper.accessor("referenceCode", {
    header: "#",
  }),
  columnHelper.accessor("supplier.id", {
    id: 'supplier',
    header: 'Supplier',
    cell: (row) => row.row.original.supplier.name,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("poAccountingDetail.paymentMethod.id", {
    id: 'paymentMethod',
    header: 'Payment Method',
    cell: (row) => {
      if (!row.row.original.poAccountingDetail || !row.row.original.poAccountingDetail.paymentMethod) {
        return "Method Not Selected"
      }
      const { methodName, accountEndingIn, paymentType } = row.row.original.poAccountingDetail.paymentMethod

      return `${paymentType.toUpperCase()} ${methodName}-${accountEndingIn}`
    },
    filterFn: FilterFunction,

  }),
  columnHelper.accessor("total", {
    header: 'Total ($)',
    cell: (row) => toFracitonalDigits.curreny(row.row.original.total),
  }),
  columnHelper.accessor("poAccountingDetail.status.id", {
    id: 'status',
    header: "Status",
    cell: (row) => {
      const details = row.row.original.poAccountingDetail
      if (details && Object.keys(details).length !== 0) {
        const status = details.status
        return < Tag bgColor={status.bgColor} textColor={status.textColor} label={status.name} tooltip={status?.description || ''} />
      }

      return <Tag color="default" label="No Data" tooltip="This PO has no data associated with it. Click to add some!" />
    }
  }),
  columnHelper.accessor("poAccountingDetail.paid", {
    header: "Paid",
    cell: (row) => {
      const details = row.row.original.poAccountingDetail
      if (details) {
        const value = details.paid
        const color: TagColor = value ? 'green' : 'rose';
        const label = value ? 'paid' : 'not paid'
        return < Tag color={color} label={label} />
      }

      return <Tag color="default" label="No Data" tooltip="This PO has no data associated with it. Click to add some!" />
    }
  }),
  columnHelper.accessor("poAccountingDetail.packingSlipReceived", {
    header: "Packing Slip",
    cell: (row) => {
      const details = row.row.original.poAccountingDetail
      if (details) {
        const value = details.packingSlipReceived;
        const color: TagColor = value ? 'green' : 'rose';
        const label = value ? 'Recieved' : 'Missing'
        return < Tag color={color} label={label} />
      }

      return <Tag color="default" label="No Data" tooltip="This PO has no data associated with it. Click to add some!" />
    }
  }),
  columnHelper.accessor("poAccountingDetail.paperworkGivenToAdmin", {
    header: "Invoice",
    cell: (row) => {
      const details = row.row.original.poAccountingDetail
      if (details) {
        const value = details.paperworkGivenToAdmin;
        const color: TagColor = value ? 'green' : 'rose';
        const label = value ? 'Handed Off' : 'Not Yet'
        return < Tag color={color} label={label} />
      }

      return <Tag color="default" label="No Data" tooltip="This PO has no data associated with it. Click to add some!" />
    }
  }),

]
