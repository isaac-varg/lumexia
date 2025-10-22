import SectionTitle from "@/components/Text/SectionTitle"
import { usePurchasingRequestSelection } from "@/store/purchasingRequestSlice"
import Card from "@/components/Card"
import GeneralRequestCard from "./GeneralRequestCard"
import RequestCard from "../shared/RequestCard"

const NewTab = () => {

  const { requests, generalRequests } = usePurchasingRequestSelection()

  return (
    <div className="grid grid-cols-2 gap-6">

      <div className="flex flex-col gap-4">

        <SectionTitle>In System</SectionTitle>

        <Card.Root>
          <div className='grid grid-cols-3 gap-4 max-h-[600px] overflow-auto'>
            {requests.map((request) => <RequestCard key={request.id} request={request} />)}
          </div>
        </Card.Root>


      </div>

      <div className="flex flex-col gap-4">

        <SectionTitle>General</SectionTitle>

        <Card.Root>
          <div className='grid grid-cols-3 gap-4 max-h-[600px] overflow-auto'>
            {generalRequests.map((request) => <GeneralRequestCard key={request.id} request={request} />)}
          </div>
        </Card.Root>


      </div>


    </div>
  )
}

export default NewTab
