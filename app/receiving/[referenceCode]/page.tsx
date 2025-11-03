import { appActions } from "@/actions/app";
import { purchasingActions } from "@/actions/purchasing";
import PageTitle from "@/components/Text/PageTitle";
import ItemTable from "./_components/ItemTable";

const ReceivingDetails = async ({ searchParams }: { searchParams: { id: string } }) => {

  const purchaseOrder = await purchasingActions.purchaseOrders.getOne(searchParams.id);
  const poItems = await purchasingActions.purchaseOrders.items.getAll(searchParams.id);
  const activity = await appActions.activity.getAll(searchParams.id);

  if (!purchaseOrder) { return <Skeleton /> }

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle>
        {`#${purchaseOrder.referenceCode} - ${purchaseOrder.supplier.name}`}

      </PageTitle>

      <ItemTable
        items={poItems}
      />


    </div>
  )
}

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-y-6">

      <div className="skeleton w-40 h-12" />

    </div>
  )
}

export default ReceivingDetails; 
