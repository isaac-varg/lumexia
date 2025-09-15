import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { PurchaseOrder } from "@/types/purchaseOrder"
import { useEffect, useState } from "react"

interface SupplierStats {
  supplier: string;
  lowest: number;
  highest: number;
  average: number;
  lastPrice: number;
}

const Stats = () => {
  const { filteredPurchaseOrders } = useItemSelection()
  const [stats, setStats] = useState<SupplierStats[]>([]);
  const [globalLowest, setGlobalLowest] = useState<{ supplier: string; price: number } | null>(null);
  const [globalHighest, setGlobalHighest] = useState<{ supplier: string; price: number } | null>(null);

  useEffect(() => {
    if (filteredPurchaseOrders) {
      const supplierData: { [key: string]: { prices: number[], latestPurchase: { date: Date, price: number } | null } } = {};

      filteredPurchaseOrders.forEach((po) => {
        po.purchaseOrders.forEach(item => {
          if (!supplierData[po.supplier.name]) {
            supplierData[po.supplier.name] = { prices: [], latestPurchase: null };
          }
          supplierData[po.supplier.name].prices.push(item.pricePerUnit);

          const purchaseDate = new Date(item.createdAt);
          const latestPurchase = supplierData[po.supplier.name].latestPurchase;

          if (!latestPurchase || purchaseDate > latestPurchase.date) {
            supplierData[po.supplier.name].latestPurchase = { date: purchaseDate, price: item.pricePerUnit };
          }
        })
      });

      const calculatedStats: SupplierStats[] = Object.entries(supplierData).map(([supplier, data]) => {
        const lowest = Math.min(...data.prices);
        const highest = Math.max(...data.prices);
        const average = data.prices.reduce((a, b) => a + b, 0) / data.prices.length;
        const lastPrice = data.latestPurchase ? data.latestPurchase.price : 0;
        return { supplier, lowest, highest, average, lastPrice };
      });

      setStats(calculatedStats);

      if (calculatedStats.length > 0) {
        let lowest = { supplier: calculatedStats[0].supplier, price: calculatedStats[0].lowest };
        let highest = { supplier: calculatedStats[0].supplier, price: calculatedStats[0].highest };

        calculatedStats.forEach(stat => {
          if (stat.lowest < lowest.price) {
            lowest = { supplier: stat.supplier, price: stat.lowest };
          }
          if (stat.highest > highest.price) {
            highest = { supplier: stat.supplier, price: stat.highest };
          }
        });
        setGlobalLowest(lowest);
        setGlobalHighest(highest);
      } else {
        setGlobalLowest(null);
        setGlobalHighest(null);
      }
    }
  }, [filteredPurchaseOrders]);


  return (
    <Card.Root span={3}>
      <Card.Title>Pricing Stats</Card.Title>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Last Price</th>
              <th>Lowest</th>
              <th>Highest</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr key={stat.supplier}>
                <td>{stat.supplier}</td>
                <td>{stat.lastPrice.toFixed(3)}</td>
                <td>{stat.lowest.toFixed(3)}</td>
                <td>{stat.highest.toFixed(3)}</td>
                <td>{stat.average.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                {globalLowest && <p>Lowest Price: {globalLowest.price.toFixed(2)} by {globalLowest.supplier}</p>}
                {globalHighest && <p>Highest Price: {globalHighest.price.toFixed(2)} by {globalHighest.supplier}</p>}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card.Root>
  )
}

export default Stats 
