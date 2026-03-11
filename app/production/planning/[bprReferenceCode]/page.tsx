import { productionActions } from "@/actions/production";
import { qualityActions } from "@/actions/quality";
import StateSetter from "./_components/state/StateSetter";
import Title from "./_components/header/Title";
import TabSelector from "./_components/shared/TabSelector";
import TabsContainer from "./_components/shared/TabsContainer";
import { inventoryActions } from "@/actions/inventory";

type BprPlanningDetailsProps = {
  searchParams: {
    id: string;
  };
}

const BprPlanningDetails = async ({ searchParams }: BprPlanningDetailsProps) => {

  const bpr = await productionActions.bprs.getOne(searchParams.id);

  const [bom, activity, notes, qcRecords] = await Promise.all([
    await productionActions.bprs.boms.getByBpr(bpr.id),
    await productionActions.bprs.activity.getAll(bpr.id),
    await productionActions.bprs.notes.getAllByBpr(bpr.id),
    await qualityActions.qc.records.getAllByBpr(bpr.id),
  ])

  const bomInventory = await inventoryActions.inventory.getAllByBprBom(bom);

  if (!bpr) return false

  return (
    <div className="flex flex-col gap-6">
      <StateSetter
        activity={activity}
        bpr={bpr}
        bom={bom}
        bomInventory={bomInventory}
        notes={notes}
        qcRecords={qcRecords}
      />

      <Title />

      <TabSelector />
      <TabsContainer />


    </div>
  )
}

export default BprPlanningDetails
