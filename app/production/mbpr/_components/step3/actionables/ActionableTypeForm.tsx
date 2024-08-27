import stepActionableTypeActions from "@/actions/production/stepActionableTypes";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import useProductionWizard from "@/hooks/useProductionWizard";
import { ActionableType } from "@/types/actionableType";
import { UserRole } from "@/types/userRole";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  userRoleId: string
  description: string
  dataType: string
}
const ActionableTypeForm = ({ userRoles }: { userRoles: UserRole[] }) => {
  const form = useForm();
  const { revalidate } = useProductionWizard()
  const { resetDialogContext } = useDialog()

  const handleSubmit = async (data: Inputs) => {

    const { name, userRoleId, description, dataType } = data;
    const payload = {
      name,
      userRoleId,
      description,
      dataType
    }


    const finish = (response: ActionableType) => {


      createActivityLog('createdActionableType', 'actionable', response.id, { context: `Added ${name} actionable type`, description: description })
      revalidate()
      resetDialogContext();

    }

    const response = await stepActionableTypeActions.createNew(payload)

    finish(response)


  }


  return (
    <Dialog.Root identifier="createNewActionableType">

      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Text
          form={form}
          fieldName="name"
          label="Name"
          required
        />


        <Form.Select
          form={form}
          label="User Role"
          fieldName="userRoleId"
          options={userRoles.map((ur) => ({ value: ur.id, label: ur.name }))}
        />


        <Form.TextArea
          form={form}
          fieldName="description"
          label="Description"
          required
        />

        <Form.Text
          form={form}
          fieldName="dataType"
          label="Data Type"
          required
        />


        <Form.ActionRow form={form} />


      </Form.Root>
    </Dialog.Root>
  )
}

export default ActionableTypeForm
