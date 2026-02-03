import { getInvestigationData } from "./_actions/getInvestigationData";
import StateSetter from "./_components/state/StateSetter";
import Summary from "./_components/summary/Summary";
import TabSelector from "./_components/shared/TabSelector";
import TabsContainer from "./_components/shared/TabsContainer";
import Text from "@/components/Text";

const InvestigationPage = async ({ searchParams }: { searchParams: { id: string } }) => {

  const { item, lots, purchaseOrders, audits, auditRequests, notes } = await getInvestigationData(searchParams.id)

  return (
    <div className="flex flex-col gap-y-6">

      <StateSetter
        item={item}
        lots={lots}
        purchaseOrders={purchaseOrders}
        audits={audits}
        auditRequests={auditRequests}
        notes={notes}
      />

      <Text.PageTitle title={`Investigation: ${item.name}`} />

      <Summary />

      <TabSelector />

      <TabsContainer />

    </div>
  )
}

export default InvestigationPage
