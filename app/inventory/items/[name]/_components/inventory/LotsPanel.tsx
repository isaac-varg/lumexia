import DataTable from "@/components/DataTable";
import React from "react";
import { lotsColumns } from "../../_configs/LotColumns";
import LotDetailsDialog from "./LotDetailsDialog";
import useDialog from "@/hooks/useDialog";
import { Lot } from "@/types/lot";
import CreateLotDialog from "./CreateLotDialog";
import { Item } from "@/types/item";
import { ContainerType } from "@/types/containerType";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import { getContainerTotals } from "../../_functions/getContainerTotals";
import { FlattenedLot } from "../../_functions/flattenLots";

const ContainersTable = ({
  lots,
  item,
  containerTypes,
}: {
  lots: Lot[];
  item: Item;
  containerTypes: ContainerType[];
}) => {
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

      <div className="flex flex-col gap-y-6">
        <Layout.Row>
          <Card.Root shadow="none" borderSize="small" borderColor="light">
            <h2 className="font-semibold text-base font-poppins uppercase">
              containers
            </h2>
          </Card.Root>
          <Card.Root shadow="none" borderSize="small" borderColor="light">
            <h2 className="font-semibold text-base font-poppins uppercase">
             On Hand 
            </h2>
          </Card.Root>
        </Layout.Row>

        <DataTable.Default
          data={lots}
          columns={lotsColumns}
          dialogIdentifier="createLot"
          onRowClick={(row) => handleRowClick(row)}
        />
      </div>
    </>
  );
};

export default ContainersTable;
