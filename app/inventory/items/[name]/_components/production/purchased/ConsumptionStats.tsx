import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { toMathFractionalDigits } from "@/utils/data/toMathFractionalDigits";

const ConsumptionStats = () => {

  const { usage } = useItemSelection()
  const consumption = usage?.consumption;

  const yearlyConsumption: { [year: string]: number } = {};

  if (consumption) {
    consumption.forEach((transaction) => {
      const year = new Date(transaction.createdAt).getFullYear().toString();
      if (!yearlyConsumption[year]) {
        yearlyConsumption[year] = 0;
      }
      yearlyConsumption[year] += transaction.amount;
    });
  }

  return (
    <Card.Root>

      <Card.Title>Consumption Stats</Card.Title>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Year</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(yearlyConsumption).map(([year, quantity]) => (
              <tr key={year}>
                <td>{year}</td>
                <td>{toMathFractionalDigits(quantity, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card.Root>
  )
}

export default ConsumptionStats
