"use client"

import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { useEffect, useState } from "react"

interface YearlyStats {
  year: string;
  total: number;
}

const BatchesStats = () => {
  const { bprs } = useItemSelection()
  const [stats, setStats] = useState<YearlyStats[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);

  useEffect(() => {
    if (bprs) {
      const yearlyData: { [key: string]: number } = {};
      let totalProduced = 0;

      bprs.forEach((bpr) => {
        const year = new Date(bpr.createdAt).getFullYear().toString();
        if (!yearlyData[year]) {
          yearlyData[year] = 0;
        }
        yearlyData[year] += bpr.batchSize.quantity;
        totalProduced += bpr.batchSize.quantity;
      });

      const calculatedStats: YearlyStats[] = Object.entries(yearlyData)
        .map(([year, total]) => ({ year, total }))
        .sort((a, b) => parseInt(b.year) - parseInt(a.year)); // Sort by year descending

      setStats(calculatedStats);
      setGrandTotal(totalProduced);
    }
  }, [bprs]);


  return (
    <Card.Root >
      <Card.Title>Production Stats</Card.Title>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Produced</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr key={stat.year}>
                <td>{stat.year}</td>
                <td>{stat.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Grand Total</th>
              <th>{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card.Root>
  )
}

export default BatchesStats
