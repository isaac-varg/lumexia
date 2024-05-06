import DataTable from "@/components/DataTable";
import React from "react";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Filter } from "@/types/filter";
import { transactionsColumns } from "../../_configs/TransactionsColumns";
import { Transaction } from "@/types/transaction";


const TransactionsTable = ({ transactions } : {transactions: Transaction[]}) => {
  const filters: Filter[] = [
    {
      columnName: "lotNumber",
      filterLabel: "Lot Number",
      options: toFacetFilter(transactions, "userName", "userName"),
    },
  ];

  const handleRowClick = (row: any) => {
    return
  };

  return (
    <>

      <DataTable.Default
        data={transactions}
        columns={transactionsColumns}
        filters={filters}
        dialogIdentifier="createItem"
        onRowClick={(row) => handleRowClick(row)}
      />
    </>
  );
};

export default TransactionsTable;
