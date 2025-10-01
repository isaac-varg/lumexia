import Card from "@/components/Card"
import DataTable from "@/components/DataTable"
import { useItemSelection } from "@/store/itemSlice"
import { transactionColumns } from "./TransactionsColumn"
import { Filter } from "@/types/filter"
import { toFacetFilter } from "@/utils/data/toFacetFilter"
import { LotTransaction } from "../../_actions/inventory/getTransactionsByLot"
import { useRouter } from "next/navigation"
import { getBpr } from "../../_actions/inventory/getBpr"
import { transactionTypes } from "@/configs/staticRecords/transactionTypes"

const TransactionsTable = () => {
  const { selectedLotTransactions } = useItemSelection()
  const router = useRouter()

  const filters: Filter[] = [
    {
      columnName: "user",
      filterLabel: "Conducted By",
      options: toFacetFilter(selectedLotTransactions, "user.id", "user.name")
    },
    {
      columnName: "type",
      filterLabel: "Type",
      options: toFacetFilter(selectedLotTransactions, "transactionType.id", "transactionType.name")
    },

  ];

  const handleClick = async (data: LotTransaction) => {

    const transactionType = data.transactionTypeId
    if (transactionType === transactionTypes.bprConsumption) {
      const bpr = await getBpr(data.systemNote);
      if (!bpr) return;
      const path = `/production/planning/${bpr.referenceCode}?id=${bpr.id}`
      router.push(path);
    }
    return;
  }

  if (!selectedLotTransactions) {
    return <Skeleton />
  }

  return (
    <Card.Root span={2}>
      <Card.Title>Transactions</Card.Title>

      <DataTable.Default
        data={selectedLotTransactions}
        columns={transactionColumns}
        searchBg="elevated"
        filters={filters}
        onRowClick={(row) => handleClick(row.original)}
        initialSortBy={[{
          id: 'createdAt',
          desc: true,
        }]}
        tableStateName="lotTransactions"
      //    initialColumnFilters={[
      //      { id: 'isDepleted', value: [false] }
      //    ]}
      />

    </Card.Root>
  )
}

const Skeleton = () => {
  return (
    <Card.Root>
      <div className="skeleton w-full h-40" ></div>
    </Card.Root>
  )
}

export default TransactionsTable
