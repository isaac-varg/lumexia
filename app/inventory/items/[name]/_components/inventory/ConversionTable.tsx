import { inventoryActions } from "@/actions/inventory"
import { DiscreteConversion } from "@/actions/inventory/items/discreteConversions/getAll"
import { useItemSelection } from "@/store/itemSlice"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { TbEdit, TbTrash } from "react-icons/tb"

const ConversionTable = ({ setIsEdit, setSelected }: { setIsEdit: Dispatch<SetStateAction<boolean>>, setSelected: Dispatch<SetStateAction<DiscreteConversion | null>> }) => {
  const { discreteConversions } = useItemSelection()
  const router = useRouter()

  const handleDelete = async (id: string) => {

    await inventoryActions.items.discreteConversions.delete(id);
    router.refresh();

  }

  const handleEdit = (selected: DiscreteConversion) => {
    setSelected(selected);
    setIsEdit(true);
  }


  return (
    <div className="flex flex-col gap-6 min-h-max">

      <div className="font-poppins text-base-content text-lg">
        Discrete conversions are specific to this item and the listed supplier.
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Input UOM</th>
              <th>Conversion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {discreteConversions.map((d, index) => {
              return (
                <tr key={index}>
                  <td>{d.supplier.name}</td>
                  <td>{`1  ${d.uomA.name}`}</td>
                  <td>{`${d.conversionFactor}  ${d.uomB.name}`}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleEdit(d)} className="btn btn-ghost btn-accent">
                      <TbEdit className="size-4" />

                    </button>

                    <button onClick={() => handleDelete(d.id)} className="btn btn-ghost btn-error">
                      <TbTrash className="size-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>

  )
}

export default ConversionTable
