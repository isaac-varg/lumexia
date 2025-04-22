'use client'
import { PurchasingRequest } from "@/actions/purchasing/requests/getByStatus"
import { useRouter } from "next/navigation"

const RequestOption = ({ req }: { req: PurchasingRequest }) => {

    const path = `/purchasing/requests/${req.referenceCode}?id=${req.id}`
    const router = useRouter()

    return (
        <div
            onClick={() => router.push(path)}
            className="flex justify-between items-center py-2 px-4 rounded-xl bg-neutral-100 hover:cursor-pointer hover:bg-lilac-200">

            <h1 className="font-poppins text-base font-medium">{req.item.name}</h1>

            <div className="flex gap-x-2">
                <h2 className="text-center items-center flex rounded-xl px-2 py-1 font-semibold text-sm font-poppins" style={{ backgroundColor: req.priority.bgColor, color: req.priority.textColor }}>{req.priority.name}</h2>
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <img src={req.requestingUser.image || ''} />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default RequestOption
