import PageTitle from "@/components/Text/PageTitle";
import ActionBar from "./_components/ActionBar";
import { getItem } from "./_functions/getItem"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import { accountingActions } from "@/actions/accounting";
import LastExaminedPanel from "./_components/LastExaminedPanel";

interface ItemPricingDashboardProps {
    searchParams: {
        id: string
    }
}

const ItemPricingDashboard = async ({ searchParams }: ItemPricingDashboardProps) => {

    const item = await getItem(searchParams.id);
    const examinations = await accountingActions.examinations.getAllByItem(item.id);


    return (
        <div className="flex flex-col gap-y-4">

            <PageTitle>Pricing Overview - {item.name}</PageTitle>
            <PageBreadcrumbs />

            <ActionBar itemId={item.id} itemName={item.name} />

            <div className="grid grid-cols-2 gap-4">
                <LastExaminedPanel lastExamination={examinations[0] || null} />
            </div>

            <ul>
                <li>graph of pricing history by overall item price</li>
                <li>overall notes for the item as a whole</li>
                <li>graph or trends of changes to container costs for the product as a whole (aggregated)</li>
                <li>basics panel with last checked, last x y z</li>
                <li>commits /history</li>
                <li>pricing trigger origins e.g., if added to pricing due to treshold trigger or production</li>
                <li>pricing trends for competitor</li>
                <li>report print out modal for pdfs for reports/summaries</li>
            </ul>
        </div>
    )
}

export default ItemPricingDashboard 
