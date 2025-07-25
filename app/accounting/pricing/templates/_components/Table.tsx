'use client'
import DataTable from "@/components/DataTable";
import { Filter } from "@/types/filter";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { pricingTemplateColumns } from "./Columns";
import { PricingTemplate } from "@/actions/accounting/finishedProducts/templates/getAll";
import { useRouter } from "next/navigation";

const PricingTemplatesTable = ({ templates }: { templates: PricingTemplate[] }) => {

    const router = useRouter()
    const filters: Filter[] = [
        {
            columnName: "forItemType",
            filterLabel: "For Item Type",
            options: toFacetFilter(templates, "forItemType.id", "forItemType.name"),
        },

    ];

    const handleClick = (row: any) => {
        const path = `/accounting/pricing/templates/wizard?isExisting=true&templateId=${row.original.id}`
        console.log(path)
        router.push(path)
    }

    return (
        <div className="gap-y-5 flex-col flex">
            <div className="flex justify-start">
                <button className="btn" onClick={() => router.push('/accounting/pricing/templates/wizard')}>
                    Create Template

                </button>
            </div>
            <DataTable.Default
                filters={filters}
                data={templates}
                columns={pricingTemplateColumns}
                onRowClick={(row) => handleClick(row)}
                tableStateName='poRequests'

            />
        </div>
    )
}

export default PricingTemplatesTable 
