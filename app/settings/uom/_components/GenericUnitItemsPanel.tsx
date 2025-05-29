import Card from "@/components/Card";
import { ItemWithGenericUnits } from "../_functions/getItemsWithUnits";
import GenericUnitsTable from "./GenericUnitsTable";
import { Uom } from "@/actions/inventory/getAllUom";


const GenericUnitItemsPanel = ({ items, uoms }: { items: ItemWithGenericUnits[], uoms: Uom[] }) => {


    return (
        <Card.Root>
            <div className="flex justify-between items-center">
                <Card.Title>Items with Generic Units</Card.Title>
            </div>


            <GenericUnitsTable items={items} uoms={uoms} />

        </Card.Root>
    )
}

export default GenericUnitItemsPanel
