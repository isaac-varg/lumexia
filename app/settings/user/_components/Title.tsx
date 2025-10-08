'use client'
import PageTitle from "@/components/Text/PageTitle"
import { useAppSelection } from "@/store/appSlice"

const Title = () => {
  const { user } = useAppSelection()

  return (
    <PageTitle>{`Hello ${user ? user.name : ''}`}</PageTitle>
  )
}

export default Title
