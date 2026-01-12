import Alert from "@/components/Alert";
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2";
import SectionTitle from "@/components/Text/SectionTitle"
import useDialog from "@/hooks/useDialog";
import { useItemSelection } from "@/store/itemSlice";
import { Fragment, useState } from "react";
import { changeInventoryUom } from "../../_actions/danger/changeInventoryUom";
import { useRouter } from "next/navigation";
import { useTabActions } from "@/store/tabSlice";

const ChangeInventoryUom = () => {

  const [isChanging, setIsChanging] = useState<boolean>(false);
  const { options, item } = useItemSelection()
  const { showDialog } = useDialog()
  const [selectedUomId, setSelectedUomId] = useState<string | null>(null);
  const uoms = new Map(options.uom.map(u => [u.id, u]))
  const router = useRouter();
  const { setActiveTab } = useTabActions()

  const form = useAppForm({
    defaultValues: {
      inventoryUomId: item?.inventoryUom.id || '',
    },
    onSubmit: ({ value }) => {
      setSelectedUomId(value.inventoryUomId);
      showDialog('changeInventoryUom')
    }
  })

  const handleUomChange = async () => {
    if (!item || !selectedUomId) return;
    const oldUom = uoms.get(item.inventoryUomId);
    const newUom = uoms.get(selectedUomId);

    if (!oldUom || !newUom) return;

    await changeInventoryUom(item.id, newUom, oldUom)
    router.refresh();
    setActiveTab('itemDetails', 'inventory');



  }

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Change Inventory UOM</SectionTitle>

      <Card.Root>


        {!isChanging && (
          <Fragment>
            <div className="font-poppins text-xl font-medium text-base-content">
              Do not do this unless absolutely certain you know what you are doing. The inventory unit of measurement is what the system will keep inventory, conduct transactions, calculate pricing, and affects more system facets. Changing this will immediately affect the inventory quantity and discrete unit of measurement conversions.
            </div>

            <button
              onClick={() => setIsChanging(true)}
              className="btn btn-error btn-outline ">
              Change Inventory UOM
            </button>
          </Fragment>
        )}


        {isChanging && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
          >

            <form.AppField
              name="inventoryUomId"
            >
              {(field) => <field.SelectField label="Unit of Measurement"
                options={options.uom.map(u => ({ label: u.name, value: u.id }))} />}
            </form.AppField>

            <div className="flex gap-4">
              <form.AppForm>
                <form.SubmitButton />
              </form.AppForm>
              <button className="btn" onClick={() => setIsChanging(false)}>Cancel</button>
            </div>
          </form>


        )}

      </Card.Root>

      <Alert.Root identifier="changeInventoryUom">
        <Alert.Content
          title="Change Inventory UOM"
          action={handleUomChange}
          actionLabel="Confirm"
          actionColor="error"
          cancelAction={() => {
            setIsChanging(false)
          }}
        >
          Don't do this unless absolutely certain. Are you sure you want to change the inventory unit of measurement. This will delete descrete conversions that have been added.
        </Alert.Content>
      </Alert.Root>


    </div>
  )
}

export default ChangeInventoryUom
