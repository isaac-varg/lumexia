"use client"

import { Requests } from "@/actions/purchasing/getAllRequests"
import DataTable from "@/components/DataTable";
import { Filter } from "@/types/filter";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Row } from "@tanstack/react-table";
import { columns } from "./Columns";
import { GeneralRequestMinimal } from "../../general/_actions/getAllGeneralRequests";
import { useRouter } from "next/navigation";

export interface MergedRequests {
    id: string;
    referenceCode: string;
    requestType: 'request' | 'general';
    name: string;
    status: {
        id: string;
        name: string;
    };
    requestingUser: {
        id: string;
        name: string | null;
    };
    createdAt: Date;
}

const Datatable = ({ requests, generalRequests }: { requests: Requests[], generalRequests: GeneralRequestMinimal[] }) => {
    const router = useRouter();

    const mergedRequests: MergedRequests[] = [
        ...requests.map(req => ({
            id: req.id,
            referenceCode: `${req.referenceCode}`,
            requestType: 'request' as const,
            name: req.item.name,
            status: req.status,
            requestingUser: req.requestingUser,
            createdAt: req.createdAt,
        })),
        ...generalRequests.map(req => ({
            id: req.id,
            referenceCode: `GR${req.referenceCode}`,
            requestType: 'general' as const,
            name: req.title,
            status: req.status,
            requestingUser: req.user,
            createdAt: req.createdAt,
        }))
    ];

    const filters: Filter[] = [
        {
            columnName: "name",
            filterLabel: "Name",
            options: toFacetFilter(mergedRequests, "name", "name"),
        },
        {
            columnName: "requestingUser.id",
            filterLabel: "Requester",
            options: toFacetFilter(mergedRequests, "requestingUser.id", "requestingUser.name"),
        },
        {
            columnName: "status.id",
            filterLabel: "Status",
            options: toFacetFilter(mergedRequests, "status.id", "status.name")
        },
        {
            columnName: "requestType",
            filterLabel: "Type",
            options: [
                { label: "Standard", value: "request" },
                { label: "General", value: "general" },
            ]
        }
    ];

    const handleRowClick = (row: Row<MergedRequests>) => {
        const { requestType, id, referenceCode } = row.original;
        if (requestType === 'request') {
            router.push(`/purchasing/requests/${referenceCode}?id=${id}`);
        } else {
            router.push(`/purchasing/requests/general/${id}?id=${id}`);
        }
    }


    return (
        <div>
            <DataTable.Default
                data={mergedRequests}
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
