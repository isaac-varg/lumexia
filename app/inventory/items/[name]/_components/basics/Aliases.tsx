import { ItemAlias } from "@/actions/inventory/aliases/getByItem"
import Card from "@/components/Card"
import Layout from "@/components/Layout"
import LabelDataPair from "@/components/Text/LabelDataPair"
import { staticRecords } from "@/configs/staticRecords"
import useDialog from "@/hooks/useDialog"
import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { TbPlus } from "react-icons/tb"
import AliasDialog from "./AliasDialog"
import { aliasTypes } from "@/configs/staticRecords/aliasTypes"

const supplierAliasType = aliasTypes.supplier

const Aliases = () => {

  const { aliases } = useItemSelection()
  const { setSelectedAlias } = useItemActions()
  const { showDialog } = useDialog()

  const handleClick = (alias: ItemAlias | null) => {
    setSelectedAlias(alias)
    showDialog('aliasDialog')
  }

  return (
    <Card.Root>
      <AliasDialog />

      <Layout.Row>

        <Card.Title>Aliases</Card.Title>
        <button
          className="btn btn-primary btn-outline btn-circle"
          onClick={() => handleClick(null)}
        >
          <TbPlus className="text-xl" />
        </button>

      </Layout.Row>


      <div className="grid grid-cols-1 gap-y-1">
        {aliases.map(alias => {


          if (alias.aliasTypeId === supplierAliasType) {

            return (
              <LabelDataPair
                key={alias.id}
                onClick={() => handleClick(alias)}
                label={`${alias.supplierAlias[0].supplier.name}`}
                data={alias.name}
              />
            )
          }


          return (
            <LabelDataPair
              key={alias.id}
              onClick={() => handleClick(alias)}
              label={alias.aliasType.name}
              data={alias.name}
            />
          )

        })}
      </div>

    </Card.Root>
  )
}

export default Aliases
