import DataTable from "@/components/DataTable";
import React from "react";
import { lotsColumns } from "../_configs/LotColumns";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Filter } from "@/types/filter";
import { FlattenedLot } from "../_functions/flattenLots";
import LotDetailsDialog from "./LotDetailsDialog";
import useDialog from "@/hooks/useDialog";
import { Lot } from "@/types/lot";

const ContainersTable = ({ lots }: { lots: Lot[] }) => {
  const { showDialog } = useDialog();
  const [selectedLot, setSelectedLot] = React.useState<Lot | null>(null);
  const filters: Filter[] = [
    {
      columnName: "lotNumber",
      filterLabel: "Lot Number",
      options: toFacetFilter(lots, "lotNumber", "lotNumber"),
    },
  ];

  const handleRowClick = (row: any) => {
    setSelectedLot(row.original)
    showDialog("lotDetails");
  };

  return (
    <>
      <LotDetailsDialog lot={selectedLot} />

      <DataTable.Default
        data={lots}
        columns={lotsColumns}
        filters={filters}
        dialogIdentifier="createItem"
        onRowClick={(row) => handleRowClick(row)}
      />
    </>
  );
};

export default ContainersTable;
