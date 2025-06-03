import Text from "@/components/Text"
import { TbPlus, TbTrash } from "react-icons/tb"
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice"
import { qualityActions } from "@/actions/quality"
import { useEffect } from "react"


const ItemParametersViewMode = () => {

    const { itemParameters, isItemParametersFetched, item } = useItemDashboardSelection()
    const { setItemParametersPanelMode, getQcItemParameters } = useItemDashboardActions()

    const handleAddParameter = () => {
        setItemParametersPanelMode('add')
    }

    const handleRemoveParameter = async (id: string) => {
        await qualityActions.qc.itemParameters.delete(id)
        getQcItemParameters()
    }

    useEffect(() => {
        if (itemParameters.length === 0) {
            getQcItemParameters()
        }

    }, [isItemParametersFetched, item])



    return (
        <>
            <div className="flex justify-between items-center">

                <Text.SectionTitle>QC Parameters</Text.SectionTitle>

                <button className="btn btn-circle" onClick={() => handleAddParameter()}><TbPlus /></button>


            </div>

            <div className="overflow-x-auto">
                <table className="table text-lg font-poppins">

                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Is Wet</th>
                            <th>Specification</th>
                            <th>Calculated Specification</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemParameters.map((ip) => {

                            return (
                                <tr key={ip.id}>
                                    <th>{ip.parameter.name}</th>
                                    <td>{ip.parameter.isWetParameter.toString()}</td>
                                    <td>{JSON.stringify(ip.specification)}</td>
                                    <td>{JSON.stringify(ip.calculatedSpecification)}</td>
                                    <td>
                                        <button onClick={() => handleRemoveParameter(ip.id)} className="btn btn-error"><TbTrash /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>




        </>
    )
}

export default ItemParametersViewMode
