"use client";
import DataTable from "@/components/DataTable";
import { columns } from "../_configs/Columns";
import { useRouter } from "next/navigation";
import { Supplier } from "@/types/supplier";
import { RowSelectionHandlerMethod, rowSelectionHandler } from "@/utils/auxiliary/rowSelectionHandler";

type TableProps = {
    suppliers: Supplier[];
};

const Table = ({ suppliers }: TableProps) => {
    const router = useRouter();

    const handleRowClick = (row: any, method: RowSelectionHandlerMethod) => {
        const formattedName = row.original.name.replace(/\s+/g, "-").toLowerCase();
        const path = `/purchasing/suppliers/${`${formattedName}?id=${row.original.id}`} `
        rowSelectionHandler(method, path, router)
    };

    return (
        <DataTable.Default
            data={suppliers}
            columns={columns}
            //   filters={filters}
            dialogIdentifier="createSupplier"
            onRowClick={(row, method) => handleRowClick(row, method)}
            onEnter={(row) => handleRowClick({ original: { ...row } }, 'rowClick')}
            tableStateName="suppliers"
            initialSortBy={[{ id: 'name', desc: false }]}
        />
    );
};

export default Table;
