"use client"

import { useItemDashboardActions  } from "@/store/itemDashboardSlice"
import { useEffect } from "react"

const StateSetter = ({itemId} : {itemId: string}) => {

    const { getItem } = useItemDashboardActions()

    useEffect(() => {
        getItem(itemId);
    }, [itemId])

    return false
}

export default StateSetter
