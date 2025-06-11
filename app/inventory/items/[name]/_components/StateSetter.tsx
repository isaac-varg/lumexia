"use client"

import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice"
import { useEffect } from "react"

const StateSetter = ({ itemId }: { itemId: string }) => {

    const { getItem, getAliases } = useItemDashboardActions()
    const { aliases, item } = useItemDashboardSelection()

    useEffect(() => {
        getItem(itemId);
    }, [itemId])

    useEffect(() => {
        if (aliases.length === 0) {
            getAliases();
        }
    }, [item])

    return false
}

export default StateSetter
