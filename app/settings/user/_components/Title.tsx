'use client'
import PageTitle from "@/components/Text/PageTitle"
import { useAppSelection } from "@/store/appSlice"
import { signOut } from "next-auth/react"

const Title = () => {
  const { user } = useAppSelection()



  return (
    <div className="flex justify-between items-center">
      <PageTitle>{`Hello ${user ? user.name : ''}`}</PageTitle>

      <button className="btn btn-outline btn-error" onClick={() => signOut()}>Logout</button>
    </div>
  )
}

export default Title
