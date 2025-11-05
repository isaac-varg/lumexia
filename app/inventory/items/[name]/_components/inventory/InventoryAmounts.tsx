import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { Fragment } from "react"

const InventoryAmounts = () => {

  const { inventory } = useItemSelection();

  if (!inventory) return false

  return (
    <Fragment>
      <Card.Root>
        <Card.Title>On Hand</Card.Title>
        <AmountData amount={inventory.totalQuantityOnHand} uomAbbreviation={inventory.item?.inventoryUom.abbreviation || ''} />
      </Card.Root>

      <Card.Root>
        <Card.Title>Allocated</Card.Title>
        <AmountData amount={inventory.totalQuantityAllocated} uomAbbreviation={inventory.item?.inventoryUom.abbreviation || ''} />
      </Card.Root>

      <Card.Root>
        <Card.Title>Available</Card.Title>
        <AmountData amount={inventory.totalQuantityAvailable} uomAbbreviation={inventory.item?.inventoryUom.abbreviation || ''} />
      </Card.Root>


    </Fragment>
  )
}

const AmountData = ({ amount, uomAbbreviation }: { amount: number, uomAbbreviation: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-x-2 items-end">      <h1
        className="font-poppins text-4xl font-semibold text-base-content"
      >{toFracitonalDigits.weight(amount)}</h1>
        <p className="font-poppins text-base-content/50 text-lg font-semibold">{uomAbbreviation}</p>
      </div>

    </div>
  )
}

export default InventoryAmounts
