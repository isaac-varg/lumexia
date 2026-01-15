import SectionTitle from "@/components/Text/SectionTitle";
import { usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"
import PriceAltering from "./PriceAltering";
import Card from "@/components/Card";
import Outputs from "./Outputs";
import { TbEdit } from "react-icons/tb";
import Notes from "../notes/Notes";

const SelectedProduct = () => {

  const { selectedFinishedProduct } = usePricingSharedSelection()
  const { setModifyMode, setFinishedProductsMode } = usePricingSharedActions()

  if (!selectedFinishedProduct) return false;

  return (
    <div className="flex flex-col gap-6">

      <div className="flex justify-between items-center">
        <SectionTitle>{selectedFinishedProduct.name}</SectionTitle>
        <div className="flex gap-2">
          <button
            className="btn btn-outline btn-secondary"
            onClick={() => {
              setModifyMode('edit')
              setFinishedProductsMode('modify')
            }}
          ><TbEdit className={'size-6'} /></button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 ">

        <div className="flex flex-col gap-6 col-span-1">
          <Card.Root>
            <PriceAltering />
          </Card.Root>
          <Card.Root>
            <Notes />
          </Card.Root>
        </div>

        <div className="col-span-2">

          <Outputs />
        </div>
      </div>


    </div>
  )
}

export default SelectedProduct
