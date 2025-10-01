import { accountingActions } from "@/actions/accounting"
import { PricingTemplateFinishedProductPayload } from "@/actions/accounting/finishedProducts/templates/finishedProducts/create"
import Form from "@/components/Form"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement"
import { usePricingTemplateWizardActions, usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice"
import { useForm } from "react-hook-form"

type Inputs = {
  name: string
  declaredQuantity: number
  fillQuantity: number
  freeShippingCost: number
  difficultyAdjustmentCost: number
}


const FinishedProductAddMode = () => {

  const form = useForm<Inputs>()
  const { existingTemplate } = usePricingTemplateWizardSelection()
  const { getExistingTemplate, setFinishedProductStepMode } = usePricingTemplateWizardActions()

  const handleSubmit = async (data: Inputs) => {

    if (!existingTemplate) throw new Error('Template id dne.')

    const payload: PricingTemplateFinishedProductPayload = {
      ...data,
      fillUomId: uom.pounds,
      apartOfPricingTemplateId: existingTemplate.id
    };
    const product = await accountingActions.finishedProducts.templates.finishedProducts.create(payload)
    getExistingTemplate(product.apartOfPricingTemplateId)

    setFinishedProductStepMode('all')

  }


  return (
    <Form.Root form={form} onSubmit={handleSubmit}>
      <Form.Text form={form} fieldName="name" label="Name" required />

      <Form.Number form={form} fieldName="fillQuantity" label="Fill Quantity (lb)" required />

      <Form.Number form={form} fieldName="declaredQuantity" label="Declared Quantity (lb)" required />

      <Form.Number form={form} fieldName="freeShippingCost" label="Free Shipping Cost ($)" required />

      <Form.Number form={form} fieldName="difficultyAdjustmentCost" label="Difficulty Adjustment Cost ($)" required />


      <Form.ActionRow form={form} />


    </Form.Root>
  )
}

export default FinishedProductAddMode
