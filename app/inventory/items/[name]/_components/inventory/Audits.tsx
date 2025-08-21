import Card from "@/components/Card"
import DataTable from "@/components/DataTable"
import SectionTitle from "@/components/Text/SectionTitle"
import { useItemSelection } from "@/store/itemSlice"
import { auditColumns } from "./AuditColumns"

const Audits = () => {

  const { audits } = useItemSelection()

  if (!audits) return;

  return (
    <div className="col-span-3">

      <div className="flex flex-col gap-y-6">
        <SectionTitle>{'Audits'}</SectionTitle>

        <Card.Root>
          <DataTable.Default
            data={audits.combined}
            columns={auditColumns}
            searchBg="elevated"
            onRowClick={(row) => console.log(row.original)}
            initialSortBy={[{
              id: 'createdAt',
              desc: false,
            }]}
            tableStateName="inventoryLots"


          />
        </Card.Root>


      </div>
    </div>

  )
}

export default Audits

