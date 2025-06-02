import Text from "@/components/Text"
import { TbPlus } from "react-icons/tb"
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice"


const ItemParametersViewMode = () => {

    const { itemParameters } = useItemDashboardSelection()
    const { setItemParametersPanelMode } = useItemDashboardActions()

    const handleAddParameter = () => {
        setItemParametersPanelMode('add')
    }


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
                                        <button className="btn btn-warning">X</button>
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
