import Text from "@/components/Text"
import { TbEdit, TbPlus, TbTrash } from "react-icons/tb"
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice"
import { qualityActions } from "@/actions/quality"
import { useEffect } from "react"
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem"
import useDialog from "@/hooks/useDialog"
import EditParameterDialog from "./EditParameterDialog"


const ItemParametersViewMode = () => {

  const { itemParameters, isItemParametersFetched, item } = useItemDashboardSelection()
  const { setItemParametersPanelMode, getQcItemParameters, setSelectedQcItemParameter } = useItemDashboardActions()
  const { showDialog } = useDialog()

  const handleAddParameter = () => {
    setItemParametersPanelMode('add')
  }

  const handleRemoveParameter = async (id: string) => {
    await qualityActions.qc.itemParameters.delete(id)
    getQcItemParameters()
  }

  const handleEditParameter = async (parameter: QcItemParameter) => {
    setSelectedQcItemParameter(parameter);
    showDialog('editQcItemParameter');
  }

  useEffect(() => {
    if (itemParameters.length === 0) {
      getQcItemParameters()
    }

  }, [isItemParametersFetched, item])



  return (
    <>
      <EditParameterDialog />
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
                <tr key={ip.id} >
                  <th>{ip.parameter.name}</th>
                  <td>{ip.parameter.isWetParameter.toString()}</td>
                  <td>{ip.specification ? 'Exists' : 'Null'}</td>
                  <td>{JSON.stringify(ip.calculatedSpecification)}</td>
                  <td>
                    <div className="flex gap-x-2">
                      <button onClick={() => handleRemoveParameter(ip.id)} className="btn btn-error"><TbTrash /></button>
                      <button onClick={() => handleEditParameter(ip)} className="btn btn-info "><TbEdit /></button>
                    </div>
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
