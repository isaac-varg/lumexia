import PageTitle from "@/components/Text/PageTitle";
import ActionBar from "./_components/ActionBar";
import { getItem } from "./_functions/getItem"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import { accountingActions } from "@/actions/accounting";
import LastExaminedPanel from "./_components/LastExaminedPanel";
import ExaminationsTable from "./_components/ExaminationsTable";
import OverallItemPriceChart from "./_components/OverallItemPriceChart";
import ContainerPricingChart from "./_components/ContainerPricingChart";
import { staticRecords } from "@/configs/staticRecords";
import { getProducedPricingExaminations } from "./_functions/getProducedPricingExamination";
import OverallMbprPricingChart from "./_components/OverallMbprPricingChart";
import BomPricingChart from "./_components/BomPricingChart";

interface ItemPricingDashboardProps {
    searchParams: {
        id: string
    }
}

const ItemPricingDashboard = async ({ searchParams }: ItemPricingDashboardProps) => {

    const item = await getItem(searchParams.id);
    const examinations = await accountingActions.examinations.getAllByItem(item.id);
    const isProduced = item.procurementTypeId === staticRecords.inventory.procurementTypes.produced;
    const pricingExaminationProduced = await getProducedPricingExaminations(item.id)

    return (
        <div className="flex flex-col gap-y-4">

            <PageTitle>Pricing Overview - {item.name}</PageTitle>
            <PageBreadcrumbs />

            <ActionBar itemId={item.id} itemName={item.name} />

            <div className="grid grid-cols-3 gap-4">
                <LastExaminedPanel lastExamination={examinations[0] || null} />
                {!isProduced && <OverallItemPriceChart pricingExaminations={examinations} />}
                {isProduced && <OverallMbprPricingChart pricingExaminations={pricingExaminationProduced} />}
                <ContainerPricingChart pricingExaminations={examinations} />
            </div>

            {isProduced && <BomPricingChart pricingExaminations={pricingExaminationProduced} />}

            <ExaminationsTable pricingExaminations={examinations} />
        </div>
    )
}

export default ItemPricingDashboard 
