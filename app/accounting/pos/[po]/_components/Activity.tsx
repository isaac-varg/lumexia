'use client'
import { TPurchaseOrderActivity } from "@/actions/purchasing/purchaseOrders/getActivity"
import { AccountingLog } from "../../_actions/getAccountingAuditLogsByPo"
import { useMemo } from "react"
import DataTable from "@/components/DataTable"
import { activityColumns } from "./ActivityColumns"
import { Filter } from "@/types/filter"
import { toFacetFilter } from "@/utils/data/toFacetFilter"
import Card from "@/components/Card"

const Activity = ({ activity, poActivity }: { activity: AccountingLog[], poActivity: TPurchaseOrderActivity[] }) => {

  const combinedActivity = useMemo(() => {
    const poActivityTransformed = poActivity.map(po => {
      const details = po.details as any
      return ({
        id: po.id,
        poId: po.entityId as string,
        user: po.user,
        userId: po.userId,
        action: po.action,
        context: details.context,
        createdAt: po.createdAt,
        updatedAt: po.updatedAt,
        activityFrom: 'Purchase Order'
      })
    })

    const accountActivityTransformed = activity.map(a => ({
      ...a,
      activityFrom: 'Accounting',
    }))

    return ([
      ...poActivityTransformed,
      ...accountActivityTransformed,
    ])
  }, [activity, poActivity])


  const filters: Filter[] = [
    {
      columnName: "activityFrom",
      filterLabel: "Type",
      options: toFacetFilter(combinedActivity, "activityFrom", "activityFrom"),
    },
    {
      columnName: "user",
      filterLabel: "User",
      options: toFacetFilter(combinedActivity, "user.id", "user.name"),
    },
  ];


  return (
    <Card.Root>
      <DataTable.Default
        data={combinedActivity}
        columns={activityColumns}
        filters={filters}
        onRowClick={(row, method) => console.log(row, method)}
        initialSortBy={[{
          id: 'createdAt',
          desc: true,
        }]}
        tableStateName="itemDetailsPurchasesTab"
      />

    </Card.Root>
  )
}

export default Activity


