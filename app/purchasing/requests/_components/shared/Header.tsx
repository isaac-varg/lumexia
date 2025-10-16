import PageTitle from "@/components/Text/PageTitle"
import CreateRequestButton from "./CreateRequestButton"
import ArchiveButton from "./ArchiveButton"

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <PageTitle>Requests</PageTitle>
      <div className='flex gap-x-2'>
        <CreateRequestButton />
        <ArchiveButton />
      </div>
    </div>

  )
}

export default Header
