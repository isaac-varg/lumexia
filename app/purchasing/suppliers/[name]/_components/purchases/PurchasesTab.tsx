"use client"

import DataTable from "@/components/DataTable";
import { purchasesColumns } from "./Columns";

const PurchasesTab = ({purchases} : {purchases: any}) => {
	
	console.log(purchases);

  return (
    <div className="p-4">
			<DataTable.Default
				data={purchases}
				columns={purchasesColumns}
				onRowClick={(row) => console.log(row)}
			/>
    </div>
  )
}

export default PurchasesTab
