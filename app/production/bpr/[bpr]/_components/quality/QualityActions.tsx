import Card from "@/components/Card"
import ButtonApproveAll from "./ButtonApproveAll"
import ButtonCompleteVerification from "./ButtonCompleteVerification"

const QualityActions = () => {




  return (
    <Card.Root>

      <Card.Title>Actions</Card.Title>

      <div className="grid grid-cols-1 gap-2">

        {/*<ButtonApproveAll />*/}
        <ButtonCompleteVerification />


      </div>
    </Card.Root>

  )
}

export default QualityActions
