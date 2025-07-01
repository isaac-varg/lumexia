import { accountingActions } from "@/actions/accounting"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import PageTitle from "@/components/Text/PageTitle"
import PricingTemplatesTable from "./_components/Table";

const PricingTemplatesPage = async () => {

    const templates = await accountingActions.finishedProducts.templates.getAllTemplates();
    return (
        <div className="flex flex-col gap-y-4">

            <PageTitle>Pricing Templates</PageTitle>
            <PageBreadcrumbs />


            <PricingTemplatesTable templates={templates} />

        </div>

    )
}

export default PricingTemplatesPage
