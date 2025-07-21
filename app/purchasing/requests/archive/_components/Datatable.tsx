"use client"

import { Requests } from "@/actions/purchasing/getAllRequests"
import DataTable from "@/components/DataTable";
import { Filter } from "@/types/filter";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Row } from "@tanstack/react-table";
import { columns } from "./Columns";
import { GeneralRequestMinimal } from "../../general/_actions/getAllGeneralRequests";

interface MergedRequests {

}

const Datatable = ({ requests, generalRequests }: { requests: Requests[], generalRequests: GeneralRequestMinimal[] }) => {


    const mergedRequested = [];

    const filters: Filter[] = [
        {
            columnName: "item.id",
            filterLabel: "Item",
            options: toFacetFilter(requests, "item.id", "item.name"),
        },
        {
            columnName: "requestingUser.id",
            filterLabel: "Requester",
            options: toFacetFilter(requests, "requestingUser.id", "requestingUser.name"),
        },
        {
            columnName: "status.id",
            filterLabel: "Status",
            options: toFacetFilter(requests, "status.id", "status.name")
        }
    ];

    const handleRowClick = (row: Row<Requests>) => {
        // router.push()
    }


    return (
        <div>
            <DataTable.Default
                data={requests}
                columns={columns}
                filters={filters}
                onRowClick={(row) => handleRowClick(row)}
                initialSortBy={[{
                    id: 'referenceCode',
                    desc: true,
                }]}
                tableStateName="requestArchive"
            />


        </div>
    )
}

export default Datatable
