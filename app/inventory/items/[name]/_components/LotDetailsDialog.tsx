import Dialog from "@/components/Dialog";
import { FlattenedLot } from "../_functions/flattenLots";
import { flattenTransactions } from "../_functions/flattenTransactions";
import { Lot } from "@/types/lot";
import DataTable from "@/components/DataTable";
import { transactionsColumns } from "../_configs/TransactionsColumns";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Filter } from "@/types/filter";
import Text from "@/components/Text";
import SectionTitle from "@/components/Text/SectionTitle";
import Layout from "@/components/Layout";
import ActionButton from "@/components/ActionButton";
import useDialog from "@/hooks/useDialog";
import CreateTransactionDialog from "./CreateTransactionDialog";

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

  return (
    <>

      <CreateTransactionDialog />

      <Dialog.Root identifier="lotDetails">
        <Dialog.Title title={`${lot?.lotNumber} Details`} />

        <Layout.Row>
          <Text.SectionTitle>Transactions</Text.SectionTitle>
          <ActionButton
            label="Create Transaction"
            onClick={() => showDialog("createTransaction")}
          />
        </Layout.Row>

        <DataTable.Default
          data={flattenedTransactions}
          columns={transactionsColumns}
          onRowClick={(row) => console.log(row)}
          filters={filters}
        />
      </Dialog.Root>
    </>
  );
};

export default LotDetailsDialog;
