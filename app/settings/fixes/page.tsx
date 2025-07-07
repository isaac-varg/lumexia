import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import { getMissingPricingData } from "./itemPricingData/getMissingPricingData"
import MissingPricingDataPanel from "./itemPricingData/MissingPricingDataPanel"

const FixesPage = async () => {

    const missingPricingData = await getMissingPricingData()

    return (
        <div className="flex flex-col gap-y-6">

            <PageBreadcrumbs />

            <div className="grid grid-cols-3 gap-4">

                <MissingPricingDataPanel missing={missingPricingData} />

            </div>



        </div>
    )
}

export default FixesPage
