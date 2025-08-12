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
import LabelDataPair from "@/components/Text/LabelDataPair";
import { getOnHandTotal } from "../../_functions/getOnHandTotal";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";

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

  const containerTotals = getContainerTotals(lots);
  const onHandTotal = getOnHandTotal(lots);

  return (
    <>
      <LotDetailsDialog lot={selectedLot} />

      <CreateLotDialog item={item} containerTypes={containerTypes} />

      <div className="flex flex-col gap-y-6">
        <Layout.Grid>
          <Card.Root shadow="none" borderSize="small" borderColor="light">
            <h2 className="font-semibold text-base font-poppins uppercase">
              containers
            </h2>
            {containerTotals.map((container) => {
              return (
                <LabelDataPair
                  key={Math.random()}
                  label={container[0]}
                  data={container[1] as number}
                />
              );
            })}
          </Card.Root>
          <Card.Root shadow="none" borderSize="small" borderColor="light">
            <h2 className="font-semibold text-base font-poppins uppercase">
              On Hand
            </h2>
            <h1 className="text-center font-poppins font-semibold text-4xl text-base-content">
              {toFracitonalDigits.weight(onHandTotal)} lbs
            </h1>
          </Card.Root>
        </Layout.Grid>

        <DataTable.Default
          data={lots}
          columns={lotsColumns}
          dialogIdentifier="createLot"
          onRowClick={(row) => handleRowClick(row)}
          tableStateName="itemDetailsLotDialog"
        />
      </div>
    </>
  );
};

export default ContainersTable;
