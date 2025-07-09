import { Row, createColumnHelper } from "@tanstack/react-table";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { useRouter } from "next/navigation";
import { getSlug } from "@/utils/general/getSlug";
import { PoWithAccounting } from "../_actions/getPoWithAccountingDetails";
import Tag, { TagColor } from "@/components/Text/Tag";


const columnHelper = createColumnHelper<PoWithAccounting>();

//const ActionButtons = ({ row }: { row: Row<BatchSummations["bomWithCost"][number]> }) => {
//
//
//
//    const router = useRouter()
//    const handleClick = (e: React.MouseEvent) => {
//        if (!row || !row.original) return;
//
//        e.stopPropagation();
//        const path = `/inventory/items/${getSlug(row.original.item.name)}?id=${row.original.item.id}`
//        router.push(path)
//
//    };
//    return (
//        <div>
//            <button className="btn btn-accent" onClick={handleClick}>Item Page</button>
//        </div>
//    )
//}

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
    columnHelper.accessor("total", {
        header: 'Total ($)',
        cell: (row) => toFracitonalDigits.curreny(row.row.original.total),
    }),
    columnHelper.accessor("poAccountingDetail.status.id", {
        id: 'status',
        header: "Status",
        cell: (row) => {
            const details = row.row.original.poAccountingDetail
            if (details && Object.keys(details).length !== 0 ) {
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
        header: "Paperwork",
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
