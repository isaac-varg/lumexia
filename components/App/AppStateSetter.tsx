'use client'

import { useAppActions, useAppSelection } from "@/store/appSlice"
import { useEffect } from "react"

const AppStateSetter = () => {

    const { getUser } = useAppActions()
    const { user } = useAppSelection()

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [])

    return false

}

export default AppStateSetter
