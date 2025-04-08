import { CellContext, Row, createColumnHelper } from "@tanstack/react-table";
import { PricingBom } from "../_functions/getBomWithPricing";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { useRouter } from "next/navigation";
import { getSlug } from "@/utils/general/getSlug";

const columnHelper = createColumnHelper<PricingBom>();

const ActionButtons = ({ row }: { row: Row<PricingBom> }) => {



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
    columnHelper.accessor("itemCost", {
        header: "Item Cost",
        cell: (row) => {
            return toFracitonalDigits.curreny(row.row.original?.itemCost || 0)
        }
    }),
    columnHelper.accessor("itemCostPerBatch", {
        header: "$ / batch",
        cell: (row) => {
            return toFracitonalDigits.curreny(row.row.original?.itemCostPerBatch || 0)
        }
    }),
    columnHelper.accessor("itemCostPerPound", {
        header: "$ / lb",
        cell: (row) => {
            return toFracitonalDigits.curreny(row.row.original?.itemCostPerPound || 0)
        }
    }),
    columnHelper.display({
        id: 'actions',
        cell: (props) => {
            return <ActionButtons row={props.row} />
        }
    })
]
