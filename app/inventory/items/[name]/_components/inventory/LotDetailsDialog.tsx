import Dialog from "@/components/Dialog";
import { FlattenedLot } from "../../_functions/flattenLots";
import { flattenTransactions } from "../../_functions/flattenTransactions";
import { Lot } from "@/types/lot";
import DataTable from "@/components/DataTable";
import { transactionsColumns } from "../../_configs/TransactionsColumns";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Filter } from "@/types/filter";
import Text from "@/components/Text";
import SectionTitle from "@/components/Text/SectionTitle";
import Layout from "@/components/Layout";
import ActionButton from "@/components/ActionButton";
import useDialog from "@/hooks/useDialog";
import CreateTransactionDialog from "./CreateTransactionDialog";
import { TbQrcode } from "react-icons/tb";
import { printLotLabel } from "../../_functions/printLotLabel";

type LotDetailsDialogProps = {
  lot: Lot | null;
};

const LotDetailsDialog = ({ lot }: LotDetailsDialogProps) => {
  const flattenedTransactions = flattenTransactions(lot?.transactions || []);
  const { showDialog } = useDialog();

  const filters: Filter[] = [
    {
      columnName: "userName",
      filterLabel: "User",
      options: toFacetFilter(flattenedTransactions, "userName", "userName"),
    },
  ];

  if (!lot) { return null }

  const printLabel = async () => {
    await printLotLabel(lot)
  }

  return (
    <>
      <CreateTransactionDialog lot={lot} />


      <Dialog.Root identifier="lotDetails">

        <Layout.Row justify="between">
          <Dialog.Title title={`${lot?.lotNumber} Details`} />
          <ActionButton onClick={() => printLabel()}>
            <span className="flex flex-row gap-x-2">
            <span className="text-2xl"><TbQrcode /></span>
            Print QR</span>
          </ActionButton>
        </Layout.Row>

        <Layout.Row>
          <Text.SectionTitle>Transactions</Text.SectionTitle>
          <div>
            <ActionButton
              label="Create Transaction"
              onClick={() => showDialog("createTransaction")}
            />

          </div>
        </Layout.Row>

        <DataTable.Default
          data={flattenedTransactions}
          columns={transactionsColumns}
          onRowClick={(row) => console.log(row)}
          filters={filters}
          tableStateName="itemDetailsLot"
        />
      </Dialog.Root>
    </>
  );
};

export default LotDetailsDialog;
