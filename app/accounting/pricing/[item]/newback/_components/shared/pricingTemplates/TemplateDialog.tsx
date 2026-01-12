'use client'

import { PricingTemplate } from "@/actions/accounting/finishedProducts/templates/getAll"
import Dialog from "@/components/Dialog"
import { usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSliceback"
import { useEffect } from "react"
import { inflateTemplate } from "../../../_functions/inflateTemplate"
import { usePricingProducedActions } from "@/store/pricingProducedSliceback"

const TemplateDialog = ({ itemTypeId, filledWithItemId }: { itemTypeId: string, filledWithItemId: string }) => {

  const { templates } = usePricingSharedSelection()
  const { getTemplates, } = usePricingSharedActions()

  const handleTemplate = async (template: PricingTemplate) => {

    await inflateTemplate(template, filledWithItemId)

    location.reload();

  }

  useEffect(() => {
    getTemplates(itemTypeId);
  }, [getTemplates, itemTypeId])



  return (
    <Dialog.Root identifier="usepricingtemplate">

      <Dialog.Title>Template</Dialog.Title>

      <p>Select a template to inflate for this product. </p>
      <p>New templates can be created by clicking the Configure Templates button on the top right of the pricing dashboard.</p>

      <div className="grid grid-cols-1 gap-6 mt-6">

        {templates.map(t => {
          return (
            <div key={t.id} onClick={() => handleTemplate(t)} className="p-6 rounded-xl font-poppins text-lg font-semibold bg-slate-200 hover:cursor-pointer hover:bg-slate-300">
              {t.name}
            </div>
          )
        })}
      </div>


    </Dialog.Root>
  )
}

export default TemplateDialog
