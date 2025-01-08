import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import PageTitle from "@/components/Text/PageTitle"
import { Item } from "@/types/item"


const PurchasedMain = ({ item }: { item: Item }) => {


    return (
        <div className='flex flex-col gap-y-4'>
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />
            <ul>
                <li>basics tab - unchangeable but calculated on /new visit. e.g., item-cost</li>
                <li>itemconsumercontainers - this will be blank but more can be added</li>
                <li>for each of those above containers, show the cost and markup (both changeable to fill the other)</li>
                <li>show profit, show in dollar signs and percentage. and change relative to last pricing</li>
            </ul>

        </div>
    )
}

export default PurchasedMain
