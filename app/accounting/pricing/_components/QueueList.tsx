'use client'

import { usePricingQueue } from "@/hooks/appQuery/usePricingQueue"
import { useRouter } from "next/navigation"

const QueueList = () => {

    const router = useRouter()
    const { data: queue, isLoading } = usePricingQueue()

    
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-1">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
            </div>
        )
    }
    if (!queue || queue.length === 0) {
        return (
            <p className="font-poppins text-xl">None queued 👍🏽👍🏽🫰🏽🫰🏽</p>
        )
    }


    return (
        <div className="grid grid-cols-1 gap-2">

            {queue.map((item) => {
                return (
                    <div
                        key={item.id}
                        className="flex px-4 py-2 rounded-xl bg-neutral-100 font-poppins text-xl font-medium hover:bg-lilac-300 hover:cursor-pointer"
                        onClick={() => router.push(`/accounting/pricing/${item.item.referenceCode}?id=${item.item.id}&fromQueueId=${item.id}`)}
                    >
                        {item.item.name}
                    </div>
                )
            })}

        </div>
    )
}

export default QueueList
