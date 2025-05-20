import {  Row, createColumnHelper } from "@tanstack/react-table";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { useRouter } from "next/navigation";
import { getSlug } from "@/utils/general/getSlug";
import { BatchSummations } from "../_functions/getBomPricingSummations";


const columnHelper = createColumnHelper<BatchSummations["bomWithCost"][number]>();

const ActionButtons = ({ row }: { row: Row<BatchSummations["bomWithCost"][number]> }) => {



    const router = useRouter()
    const handleClick = (e: React.MouseEvent) => {
        if (!row || !row.original) return;

        e.stopPropagation();
        const path = `/inventory/items/${getSlug(row.original.item.name)}?id=${row.original.item.id}`
        router.push(path)

    };
    return (
        <div>
            <button className="btn btn-accent" onClick={handleClick}>Item Page</button>
        </div>
    )
}

export const bomColumns = [
    columnHelper.accessor("identifier", {
        header: "#",
    }),
    columnHelper.accessor("item.name", {
        header: 'Material Name'
    }),
    columnHelper.accessor("concentration", {
        header: 'w/w %'
    }),
    columnHelper.accessor("totalItemCost", {
        header: "Total Item Cost",
        cell: (row) => {
            return toFracitonalDigits.curreny(row.row.original?.totalItemCost || 0)
        }
    }),
    columnHelper.accessor("itemCostInBatch", {
        header: "$ / batch",
        cell: (row) => {
            return toFracitonalDigits.curreny(row.row.original?.itemCostInBatch || 0)
        }
    }),
    columnHelper.accessor("itemCostPerLb", {
        header: "$ / lb",
        cell: (row) => {
            return toFracitonalDigits.curreny(row.row.original?.itemCostPerLb || 0)
        }
    }),
    columnHelper.display({
        id: 'actions',
        cell: (props) => {
            return <ActionButtons row={props.row} />
        }
    })
]
