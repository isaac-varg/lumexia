import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { useEffect, useState } from "react"

const PurchasesCount = () => {

  const { filteredPurchaseOrders } = useItemSelection()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = filteredPurchaseOrders.reduce((acc, curr) => curr.purchaseOrders.length + acc, 0)
    setTotal(total)
  }, [filteredPurchaseOrders])



  return (
    <Card.Root span={2}>
      <Card.Title>Purchases Count</Card.Title>


      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchaseOrders.map(supplier => (
              <tr key={supplier.supplier.id}>
                <td>{supplier.supplier.name}</td>
                <td>{supplier.purchaseOrders.length}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
      </div>


    </Card.Root>
  )
}

export default PurchasesCount
