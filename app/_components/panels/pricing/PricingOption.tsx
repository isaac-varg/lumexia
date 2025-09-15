'use client'
import { ReviewablePricingExams } from "@/actions/accounting/pricing/getReviewable"
import { PurchasingRequest } from "@/actions/purchasing/requests/getByStatus"
import { dateFormatString } from "@/configs/data/dateFormatString"
import { DateTime } from "luxon"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PricingOption = ({ exam }: { exam: ReviewablePricingExams }) => {

  const path = `/accounting/pricing/details?id=${exam.id}`
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(path)}
      className="flex justify-between items-center py-2 px-4 rounded-xl bg-base-300/75 hover:cursor-pointer hover:bg-base-200">

      <h1 className="font-poppins text-base text-base-content font-medium">{exam.examinedItem.name}</h1>

      <div className="flex gap-x-2">
        <h2 className="text-center items-center flex rounded-xl px-2 py-1 font-semibold bg-secondary/70 text-secondary-content text-sm font-poppins">
          {DateTime.fromJSDate(exam.createdAt).toFormat(dateFormatString)}
        </h2>
        <div className="avatar">
          <div className="w-8 rounded-full">
            <Image
              src={exam.user.image || ''}
              alt={exam.user.name || 'user image'}
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>

    </div>

  )
}

export default PricingOption
