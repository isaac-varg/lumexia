import PageTitle from "@/components/Text/PageTitle";
import ActionBar from "./_components/ActionBar";
import { getItem } from "./_functions/getItem"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import { accountingActions } from "@/actions/accounting";
import LastExaminedPanel from "./_components/LastExaminedPanel";
import ExaminationsTable from "./_components/ExaminationsTable";
import OverallItemPriceChart from "./_components/OverallItemPriceChart";
import ContainerPricingChart from "./_components/ContainerPricingChart";

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

            <div className="grid grid-cols-3 gap-4">
                <LastExaminedPanel lastExamination={examinations[0] || null} />
                <OverallItemPriceChart pricingExaminations={examinations} />
                <ContainerPricingChart pricingExaminations={examinations} />
            </div>


            <ExaminationsTable pricingExaminations={examinations} /> 
        </div>
    )
}

export default ItemPricingDashboard 
