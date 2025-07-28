'use client'

import SectionTitle from "@/components/Text/SectionTitle"
import { DiscrepancyItem } from "../_actions/getDiscrepancyItem"
import { useDiscrepancySelection } from "@/store/discrepancySlice"
import { useEffect, useState } from "react"
import LotCard from "./LotCard"


const ActiveLots = () => {

    const { item } = useDiscrepancySelection()
    const [onHandLots, setOnHandLots] = useState<DiscrepancyItem['lots']>([])
    const [totalQuantity, setTotalQuantity] = useState<number>(0)

    useEffect(() => {

        if (!item) return;

        const onHandLots = item.lots.filter(lot => lot.totalQuantityOnHand > 0);
        const total = onHandLots.reduce((acc, curr) => acc + curr.totalQuantityOnHand, 0)

        setOnHandLots(onHandLots)
        setTotalQuantity(total);



    }, [item])


    return (
        <div className="">

            <SectionTitle size="small">Active Lots</SectionTitle>

            <p className="font-poppins text-base">These are lots which have a quantity on hand (in our warehouse).</p>

            <p>Count {onHandLots.length}</p>
            <p>Quantity {totalQuantity} (lb) </p>


            <div className="grid grid-cols-3 gap-6">
                {onHandLots.map(lot => <LotCard key={lot.id} lot={lot} />)}

            </div>



        </div>
    )
}

export default ActiveLots
