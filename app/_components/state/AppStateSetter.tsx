'use client'

import { useAppActions, useAppSelection } from "@/store/appSlice"
import { useEffect } from "react"

const AppStateSetter = () => {

  const { getUser, getLanguage } = useAppActions()
  const { user } = useAppSelection()

  useEffect(() => {
    if (!user) {
      getUser();
      getLanguage();
    }
  }, [getUser, user, getLanguage])

  return false

}

export default AppStateSetter
