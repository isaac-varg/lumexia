import PageTitle from "@/components/Text/PageTitle";
import ActionBar from "./_components/ActionBar";
import { getItem } from "./_functions/getItem"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";

interface ItemPricingDashboardProps {
    searchParams: {
        id: string
    }
}

const ItemPricingDashboard = async ({ searchParams }: ItemPricingDashboardProps) => {

    const item = await getItem(searchParams.id);


    return (
        <div className="flex flex-col gap-y-4">

            <PageTitle>Pricing Overview - {item.name}</PageTitle>
            <PageBreadcrumbs />


            <ActionBar itemId={item.id} itemName={item.name} />
            <ul>
                <li>basics panel with last checked, last x y z</li>
                <li>commits /history</li>
                <li>pricing trigger origins e.g., if added to pricing due to treshold trigger or production</li>
                <li>pricing trends for competitor</li>
                <li>report print out modal for pdfs for reports/summaries</li>
                <li>add new pricing button that takes you to form/dashboard for starting new pricing verification</li>
            </ul>
        </div>
    )
}

export default ItemPricingDashboard 
