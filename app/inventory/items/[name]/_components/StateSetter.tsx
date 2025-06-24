"use client"

import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice"
import { useEffect } from "react"

const StateSetter = ({ itemId }: { itemId: string }) => {

    const { getItem, getAliases } = useItemDashboardActions()
    const { item } = useItemDashboardSelection()

    useEffect(() => {
        getItem(itemId);
    }, [itemId])

    useEffect(() => {
        getAliases();
    }, [item])

    return false
}

export default StateSetter
