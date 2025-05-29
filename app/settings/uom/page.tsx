import { getItemsWithUnits } from "./_functions/getItemsWithUnits"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import PageTitle from "@/components/Text/PageTitle";
import GenericUnitItemsPanel from "./_components/GenericUnitItemsPanel";
import { inventoryActions } from "@/actions/inventory";

const UomPage = async () => {

    const itemsWithUnits = await getItemsWithUnits();
    const uoms = await inventoryActions.uom.getAll();

    return (

        <div className="flex flex-col gap-y-6">

            <PageBreadcrumbs />

            <GenericUnitItemsPanel items={itemsWithUnits} uoms={uoms} />

        </div>

    )
}

export default UomPage 
