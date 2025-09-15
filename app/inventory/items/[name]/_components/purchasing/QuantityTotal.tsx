import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { getUniqueValuesByPath } from "@/utils/data/getNestedUniques"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { UnitOfMeasurement } from "@prisma/client"
import { useEffect, useState } from "react"

const QuantityTotal = () => {

  const { filteredPurchaseOrders } = useItemSelection()
  const [total, setTotal] = useState(0)
  const [uom, setUom] = useState<string>()

  useEffect(() => {
    const total = filteredPurchaseOrders.reduce((acc, supplier) => supplier.quantityTotal + acc, 0)
    const uoms = getUniqueValuesByPath(filteredPurchaseOrders, 'purchaseOrders.uom.abbreviation');

    if (uoms.length > 1) {
      // TODO handle this by unifying the uoms
      setUom('Issue: Multiple')
    }

    setUom(uoms[0]);

    setTotal(total)


  }, [filteredPurchaseOrders])



  return (
    <Card.Root span={2}>
      <Card.Title>Quantity</Card.Title>


      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Quantity Ordered</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchaseOrders.map(supplier => (
              <tr key={supplier.supplier.id}>
                <td>{supplier.supplier.name}</td>
                <td>{`${toFracitonalDigits.weight(supplier.quantityTotal)} ${uom}`}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{`${toFracitonalDigits.weight(total)} ${uom}`}</td>
            </tr>
          </tfoot>
        </table>
      </div>


    </Card.Root>
  )
}

export default QuantityTotal
