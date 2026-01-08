import SectionTitle from "@/components/Text/SectionTitle";
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import PriceAltering from "./PriceAltering";
import Card from "@/components/Card";
import Outputs from "./Outputs";

const SelectedProduct = () => {

  const { selectedFinishedProduct } = usePricingSharedSelection()

  if (!selectedFinishedProduct) return false;

  return (
    <div className="flex flex-col gap-6">

      <div className="flex justify-between items-center">
        <SectionTitle>{selectedFinishedProduct.name}</SectionTitle>
        <div className="flex gap-2">
          i
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 ">

        <div className=" col-span-1">
          <Card.Root>
            <PriceAltering />
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
