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
        <AmountData amount={inventory.totalQuantityOnHand} />
      </Card.Root>

      <Card.Root>
        <Card.Title>Allocated</Card.Title>
        <AmountData amount={inventory.totalQuantityAllocated} />
      </Card.Root>

      <Card.Root>
        <Card.Title>Available</Card.Title>
        <AmountData amount={inventory.totalQuantityAvailable} />
      </Card.Root>


    </Fragment>
  )
}

const AmountData = ({ amount }: { amount: number }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-x-2 items-end">      <h1
        className="font-poppins text-4xl font-semibold text-base-content"
      >{toFracitonalDigits.weight(amount)}</h1>
        <p className="font-poppins text-base-content/50 text-lg font-semibold">lbs</p>
      </div>

    </div>
  )
}

export default InventoryAmounts
