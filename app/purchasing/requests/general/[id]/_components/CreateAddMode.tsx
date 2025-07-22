import { ItemType } from "@/actions/inventory/itemTypes/getAll"
import Form from "@/components/Form"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { createNewItemAndRequest } from "../../_actions/createNewItemAndRequest"
import { useRouter } from "next/navigation"

type Inputs = {
    itemTypeId: string
    referenceCode: string
    name: string
}

const CreateAddMode = ({ setMode, requestId, itemTypes, requestReferenceCode }: { setMode: Dispatch<SetStateAction<'add' | 'view'>>, requestId: string, itemTypes: ItemType[], requestReferenceCode: number }) => {
    const form = useForm<Inputs>();
    const router = useRouter()

    const handleSubmit = async (data: Inputs) => {
        await createNewItemAndRequest(requestId, data.itemTypeId, data.referenceCode, data.name, requestReferenceCode);
        router.refresh();
        setMode('view')
    }

    const handleReset = () => {
        form.reset();
        setMode('view')
    }

    return (
        <div>
            <Form.Root onSubmit={handleSubmit} form={form} >

                <Form.Text form={form} label="Item Name" fieldName="name" required />

                <Form.Text form={form} label="Reference Code " fieldName="referenceCode" required />

                <Form.Select form={form} label="Item Type" fieldName="itemTypeId" options={itemTypes.map(it => ({ value: it.id, label: it.name }))} />

                <div className="justify-end flex items-center gap-2">
                    <button className="btn btn-warning" onClick={() => handleReset()}>Cancel</button>
                    <button className="btn btn-success" type="submit">Add Item & Request</button>

                </div>


            </Form.Root>
        </div>
    )
}

export default CreateAddMode
