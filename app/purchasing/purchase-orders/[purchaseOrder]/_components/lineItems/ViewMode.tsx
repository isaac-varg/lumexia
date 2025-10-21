import Card from "@/components/Card"
import Table from "@/components/Table"
import SectionTitle from "@/components/Text/SectionTitle"
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { useEffect, useState } from "react"

const ViewMode = () => {

  const { orderItems, lineItemsMode } = usePurchasingSelection()
  const { setLineItemsMode } = usePurchasingActions()
  const [total, setTotal] = useState(0)

  useEffect(() => {

    const total = orderItems.reduce((acc, curr) => {
      return acc + (curr.pricePerUnit * curr.quantity)
    }, 0)

    setTotal(total);

  }, [orderItems, lineItemsMode])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <SectionTitle>Order Items</SectionTitle>
        <button onClick={() => setLineItemsMode('edit')} className="btn btn-secondary">Modify</button>
      </div>

      <Card.Root>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>IID</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>UOM</th>
                <th>Total</th>
              </tr>

            </thead>
            <tbody>

              {orderItems.map(i => {
                return (
                  <tr
                    key={i.id}
                    onClick={() => console.log(i)}
                  >
                    <td>{i.item.referenceCode}</td>
                    <td>{i.item.name}</td>
                    <td>{`$ ${toFracitonalDigits.weight(i.pricePerUnit)}`}</td>
                    <td>{toFracitonalDigits.weight(i.quantity)}</td>
                    <td>{i.uomAbbreviation}</td>
                    <td>{toFracitonalDigits.curreny(i.pricePerUnit * i.quantity)}</td>
                  </tr>
                )
              })}


            </tbody>

          </table>

        </div>
      </Card.Root>

      <div className="grid grid-cols-3 gap-6">

        <div />
        <div />

        <div className="flex flex-col gap-4">
          <SectionTitle>Total</SectionTitle>
          <Card.Root>
            <div className="font-poppins text-lg font-medium text-base-content">$ {toFracitonalDigits.curreny(total)}</div>
          </Card.Root>
        </div>

      </div>


    </div>
  )
}

export default ViewMode
