import DataTable from "@/components/DataTable";
import React from "react";
import { lotsColumns } from "../../_configs/LotColumns";
import LotDetailsDialog from "./LotDetailsDialog";
import useDialog from "@/hooks/useDialog";
import { Lot } from "@/types/lot";
import CreateLotDialog from "./CreateLotDialog";
import { Item } from "@/types/item";
import { ContainerType } from "@/types/containerType";

const ContainersTable = ({ lots, item, containerTypes }: { lots: Lot[]; item: Item, containerTypes: ContainerType[] }) => {
  const { showDialog } = useDialog();
  const [selectedLot, setSelectedLot] = React.useState<Lot | null>(null);

  const handleRowClick = (row: any) => {
    setSelectedLot(row.original);
    showDialog("lotDetails");
  };


  return (
    <>
      <LotDetailsDialog lot={selectedLot} />

      <CreateLotDialog item={item} containerTypes={containerTypes} />

      <DataTable.Default
        data={lots}
        columns={lotsColumns}
        dialogIdentifier="createLot"
        onRowClick={(row) => handleRowClick(row)}
      />
    </>
  );
};

export default ContainersTable;
