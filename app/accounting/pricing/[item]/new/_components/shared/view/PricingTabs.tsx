'use client'
import { Tabs } from "@/components/Tabs2"
import { procurementTypes } from "@/configs/staticRecords/procurementTypes"
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import FinishedProducts from "../finishedProducts/FinishedProducts"

const PricingTabs = () => {

  const { item } = usePricingSharedSelection();
  const isPurchased = item?.procurementTypeId === procurementTypes.purchased;


  return (
    <div>
      <Tabs.Root defaultValue="finishedProducts">

        <Tabs.List>
          <Tabs.Trigger size="large" value="finishedProducts">Finsihed Products</Tabs.Trigger>
          <Tabs.Trigger size="large" value="competition">Competition</Tabs.Trigger>
          {!isPurchased && <Tabs.Trigger size="large" value="bom">Bill of Materials</Tabs.Trigger>}
        </Tabs.List>

        <Tabs.ContentContainer>

          <Tabs.Content value="finishedProducts">
            <FinishedProducts />
          </Tabs.Content>
        </Tabs.ContentContainer>
      </Tabs.Root>

    </div>
  )
}

export default PricingTabs
