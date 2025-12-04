import { inventoryActions } from "@/actions/inventory"
import { DiscreteConversion } from "@/actions/inventory/items/discreteConversions/getAll"
import { useAppForm } from "@/components/Form2"
import { useItemSelection } from "@/store/itemSlice"
import { useStore } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useMemo } from "react"

const ConversionForm = ({ selected, setSelected, setIsEdit }: { selected: DiscreteConversion | null, setSelected: Dispatch<SetStateAction<DiscreteConversion | null>>, setIsEdit: Dispatch<SetStateAction<boolean>> }) => {

  const { options, item } = useItemSelection()
  const router = useRouter();

  const uoms = new Map(options.uom.map(u => [u.id, u]));

  const defaultValues = useMemo(() => {
    return ({
      supplierId: selected ? selected.supplierId : '',
      uomA: selected ? selected.uomA.id : '',
      conversionFactor: selected ? selected.conversionFactor : 0,
    })
  }, [selected])

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {

      if (!item) return;

      const payload = {
        itemId: item.id,
        supplierId: value.supplierId,
        uomAId: value.uomA,
        uomBId: item?.inventoryUom.id,
        conversionFactor: value.conversionFactor,
      }

      if (selected) {
        await inventoryActions.items.discreteConversions.update(selected.id, payload)
        setSelected(null);
        setIsEdit(false);
        router.refresh();
        return;
      }

      await inventoryActions.items.discreteConversions.create(payload);
      setSelected(null);
      setIsEdit(false);
      router.refresh();

    }
  })


  const { conversionFactor, uomA } = useStore(form.store, (state: any) => state.values);


  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex gap-6 items-center justify-center">

          <label className="text-accent font-semibold text-4xl">{`1 ${uoms.has(uomA) ? uoms.get(uomA)?.name : ""}`}</label>
          <label className="font-semibold text-base-content text-5xl">=</label>
          <label className="text-accent font-semibold text-4xl">{`${conversionFactor} ${item?.inventoryUom.name || ''} `}</label>

        </div>



        <form.AppField
          name="supplierId"
        >
          {(field) => <field.SelectField label="Supplier"
            options={options.suppliers.map(s => ({ value: s.id, label: s.name }))} />}
        </form.AppField>

        <form.AppField
          name="uomA"
        >
          {(field) => <field.SelectField label="Input UOM"
            options={options.uom.map(u => ({ label: u.name, value: u.id }))} />}
        </form.AppField>

        <form.AppField
          name="conversionFactor"
        >
          {(field) => <field.NumberField label="Conversion Factor" />}
        </form.AppField>

        <div className="flex gap-2">
          <form.AppForm>
            <form.SubmitButton />
          </form.AppForm>

          <button className="btn" onClick={() => {
            setIsEdit(false);
            setSelected(null);
          }}>Cancel</button>
        </div>
      </form>

    </div>
  )
}

export default ConversionForm
