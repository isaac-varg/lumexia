'use client'
import { ReviewablePricingExams } from "@/actions/accounting/pricing/getReviewable"
import { Receivables } from "@/actions/inventory/receiving/getReceivables"
import { PurchasingRequest } from "@/actions/purchasing/requests/getByStatus"
import { dateFormatString } from "@/configs/data/dateFormatString"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"

const ReceivableOption = ({ po }: { po: Receivables }) => {

  const path = `/receiving/${po.referenceCode}?id=${po.id}`
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(path)}
      className="flex justify-between items-center py-2 px-4 rounded-xl bg-base-300/75 hover:cursor-pointer hover:bg-base-200">

      <h1 className="font-poppins text-base text-base-content font-medium">{`#${po.referenceCode} | ${po.supplier.name}`}</h1>

      <div className="flex gap-x-2">
        <h2 className="text-center items-center flex rounded-xl px-2 py-1 font-semibold bg-secondary/70 text-secondary-content text-sm font-poppins">
          {DateTime.fromJSDate(po.createdAt).toFormat(dateFormatString)}
        </h2>

        <h2 className="text-center items-center flex rounded-xl px-2 py-1 font-semibold bg-accent/70 text-accent-content text-sm font-poppins">
          {po.status.name}
        </h2>

      </div>

    </div>

  )
}

export default ReceivableOption
