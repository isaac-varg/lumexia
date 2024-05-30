"use client";
import DataTable from "@/components/DataTable";
import { columns } from "../_configs/Columns";
import { useRouter } from "next/navigation";
import { Supplier } from "@/types/supplier";

type TableProps = {
  suppliers: Supplier[];
};

const Table = ({ suppliers }: TableProps) => {

  const router = useRouter();


  const handleRowClick = (row: any) => {
    const formattedName = row.original.name.replace(/\s+/g, '-').toLowerCase();
    router.push(
      `/purchasing/suppliers/${`${formattedName}?id=${row.original.id}`} `
    );
  };

  return (
    <DataTable.Default
      data={suppliers}
      columns={columns}
    //   filters={filters}
      dialogIdentifier="createSupplier"
      onRowClick={(row) => handleRowClick(row)}
      onEnter={(row) => handleRowClick({original: {...row}})}
    />
  );
};

export default Table;
