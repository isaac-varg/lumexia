import Card from "@/components/Card"
import Table from "@/components/Table"
import SectionTitle from "@/components/Text/SectionTitle"
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice"

const ViewMode = () => {

  const { orderItems } = usePurchasingSelection()
  const { setLineItemsMode } = usePurchasingActions()

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
                    <td>{i.pricePerUnit}</td>
                    <td>{i.quantity}</td>
                    <td>{i.uomAbbreviation}</td>
                    <td>{i.pricePerUnit * i.quantity}</td>
                  </tr>
                )
              })}


            </tbody>

          </table>

        </div>
      </Card.Root>


    </div>
  )
}

export default ViewMode
