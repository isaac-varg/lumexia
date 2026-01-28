'use client'

import { accountingActions } from "@/actions/accounting"
import { PricingTemplate } from "@/actions/accounting/finishedProducts/templates/getAll"
import Dialog from "@/components/Dialog"
import useDialog from "@/hooks/useDialog"
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const AddTemplateDialog = () => {

  const { item, totalCostPerLb } = usePricingSharedSelection()
  const { resetDialogContext } = useDialog()
  const router = useRouter()

  const [templates, setTemplates] = useState<PricingTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isApplying, setIsApplying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!item) return

      setIsLoading(true)
      try {
        // Get templates for the item's type AND generic templates (no item type)
        const [typeSpecificTemplates, allTemplates] = await Promise.all([
          item.itemTypeId
            ? accountingActions.finishedProducts.templates.getAllByItemType(item.itemTypeId)
            : Promise.resolve([]),
          accountingActions.finishedProducts.templates.getAllTemplates(),
        ])

        // Filter generic templates (no item type) and combine with type-specific
        const genericTemplates = allTemplates.filter(t => !t.forItemTypeId)
        const combined = [...typeSpecificTemplates, ...genericTemplates]

        // Remove duplicates by id
        const uniqueTemplates = combined.filter(
          (template, index, self) => index === self.findIndex(t => t.id === template.id)
        )

        setTemplates(uniqueTemplates)
      } catch (err) {
        setError('Failed to load templates')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [item])

  const handleApplyTemplate = async (template: PricingTemplate) => {
    if (!item) return

    setIsApplying(true)
    setError(null)

    try {
      await accountingActions.finishedProducts.templates.apply({
        templateId: template.id,
        itemId: item.id,
        totalCostPerLb,
      })

      resetDialogContext()
      router.refresh()
    } catch (err) {
      setError('Failed to apply template')
      console.error(err)
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <Dialog.Root identifier="addTemplateDialog">
      <Dialog.Title>Add from Template</Dialog.Title>

      <div className="flex flex-col gap-4 mt-4">
        {isLoading && (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {!isLoading && templates.length === 0 && (
          <div className="text-center py-8 text-base-content/60">
            No templates available for this item type.
          </div>
        )}

        {!isLoading && templates.length > 0 && (
          <div className="flex flex-col gap-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <p className="text-sm text-base-content/70">{template.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="badge badge-outline badge-sm">
                          {template.finishedProducts.length} finished product{template.finishedProducts.length !== 1 ? 's' : ''}
                        </span>
                        {template.forItemType && (
                          <span className="badge badge-info badge-sm">
                            {template.forItemType.name}
                          </span>
                        )}
                        {!template.forItemType && (
                          <span className="badge badge-ghost badge-sm">
                            All item types
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleApplyTemplate(template)}
                      disabled={isApplying}
                    >
                      {isApplying ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        'Apply'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog.Root>
  )
}

export default AddTemplateDialog
