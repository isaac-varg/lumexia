'use client'
import Form from "@/components/Form";
import { usePricingProducedSelection } from "@/store/pricingProducedSlice";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form";



export type FinishedProductDetails = {
  name: string
  fillQuantity: number
  declaredQuantity: number
  difficultyAdjustmentCost: number
  freeShippingCost: number
}

type Props = {
  currentStep: number
  nextStep: () => void;
  setFinishedProductDetails: Dispatch<SetStateAction<FinishedProductDetails | null>>
}

const EditModeFinishedProductDetails = ({ currentStep, nextStep, setFinishedProductDetails }: Props) => {

  const form = useForm<FinishedProductDetails>()
  const { selectedFinishedProduct } = usePricingProducedSelection();


  const handleSubmit = (data: FinishedProductDetails) => {
    setFinishedProductDetails(data);
    nextStep()
  }


  useEffect(() => {

    if (selectedFinishedProduct) {
      const { name, fillQuantity, declaredQuantity, difficultyAdjustmentCost, freeShippingCost } = selectedFinishedProduct;
      form.reset({
        name,
        fillQuantity,
        declaredQuantity,
        difficultyAdjustmentCost,
        freeShippingCost
      });
    }

  }, [selectedFinishedProduct])

  if (currentStep !== 0) { return false }

  return (
    <div>

      <Form.Root form={form} onSubmit={handleSubmit} >

        <Form.Text form={form} fieldName="name" label="Finished Product Name" required />

        <Form.Number form={form} fieldName="fillQuantity" label="Fill Quantity (lb)" required />

        <Form.Number form={form} fieldName="declaredQuantity" label="Declared Quantity (lb)" required />

        <Form.Number form={form} fieldName="difficultyAdjustmentCost" label="Difficulty Adjustment Cost $" required />

        <Form.Number form={form} fieldName="freeShippingCost" label="Free Shipping Cost $" required />

        <div className="flex justify-end">

          <button className="btn btn-neutral btn-soft" type="submit">Next Step</button>
        </div>


      </Form.Root>

    </div>
  )
}

export default EditModeFinishedProductDetails
