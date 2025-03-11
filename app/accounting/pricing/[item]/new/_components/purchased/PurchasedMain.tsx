import { accountingActions } from "@/actions/accounting"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import Card from "@/components/Card"
import PageTitle from "@/components/Text/PageTitle"
import { Item } from "@/types/item"
import InitialStateSetter from "./InitialStateSetter"
import Basics from "./Basics"
import ConsumerContainers from "./ConsumerContainers"
import ActionsPanel from "./ActionsPanel"


const PurchasedMain = async ({ item }: { item: Item }) => {

    const pricingData = await accountingActions.pricing.item.getItemPricingData(item.id)
    const lastPrice = await accountingActions.pricing.item.getLastItemPrice(item.id)
    const consumerContainers = await accountingActions.filledConsumerContainers.getAllByFillItem(item.id)

    return (
        <div className='flex flex-col gap-y-4'>
            <InitialStateSetter lastPrice={lastPrice} pricingData={pricingData} consumerContainers={consumerContainers} />
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />
            <div className="grid grid-cols-2 gap-4">
                <Basics />
                <ActionsPanel />

                <ConsumerContainers fillItemId={item.id} />
            </div>
        </div>
    )
}

export default PurchasedMain
