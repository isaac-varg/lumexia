import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { useEffect, useState } from "react"

const PurchasesTotal = () => {

  const { filteredPurchaseOrders } = useItemSelection()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = filteredPurchaseOrders.reduce((acc, curr) => curr.purchasesTotal + acc, 0)
    setTotal(total)
  }, [filteredPurchaseOrders])



  return (
    <Card.Root span={2}>
      <Card.Title>Spent</Card.Title>


      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Total $</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchaseOrders.map(supplier => (
              <tr key={supplier.supplier.id}>
                <td>{supplier.supplier.name}</td>
                <td>${toFracitonalDigits.curreny(supplier.purchasesTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>${toFracitonalDigits.curreny(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>


    </Card.Root>
  )
}

export default PurchasesTotal
