import { Panels } from "@/components/Panels"
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice"
import { useEffect } from "react"
import ItemParametersViewMode from "./ItemParametersViewMode"
import ItemParametersAddMode from "./ItemParametersAddMode"


const QcParametersPanel = () => {


    const {   itemParametersPanelMode } = useItemDashboardSelection()


    return (
        <Panels.Root>

            {itemParametersPanelMode === 'view' && <ItemParametersViewMode />}


            {itemParametersPanelMode === 'add' && <ItemParametersAddMode />}




        </Panels.Root >

    )
}

export default QcParametersPanel
