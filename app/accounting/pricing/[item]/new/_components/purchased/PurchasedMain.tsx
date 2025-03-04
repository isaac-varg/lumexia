import { accountingActions } from "@/actions/accounting"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import Card from "@/components/Card"
import PageTitle from "@/components/Text/PageTitle"
import { Item } from "@/types/item"
import InitialStateSetter from "./InitialStateSetter"
import Basics from "./Basics"
import ConsumerContainers from "./ConsumerContainers"


const PurchasedMain = async ({ item }: { item: Item }) => {

    const pricingData = await accountingActions.pricing.item.getItemPricingData(item.id)
    const lastPrice = await accountingActions.pricing.item.getLastItemPrice(item.id)
    const consumerContainers = await accountingActions.consumerContainers.getAllByFillItem(item.id)

    return (
        <div className='flex flex-col gap-y-4'>
            <InitialStateSetter lastPrice={lastPrice} pricingData={pricingData} consumerContainers={consumerContainers}/>
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />
            <p>this is for purchased item</p>
            <ul>
                <li>itemconsumercontainers - this will be blank but more can be added</li>
                <li>for each of those above containers, show the cost and markup (both changeable to fill the other)</li>
                <li>show profit, show in dollar signs and percentage. and change relative to last pricing</li>
            </ul>
            <div className="grid grid-cols-2 gap-4">
                <Basics />

                <Card.Root>
                    <Card.Title>another</Card.Title>
                    asdf

                </Card.Root>

                <ConsumerContainers />
            </div>
        </div>
    )
}

export default PurchasedMain
