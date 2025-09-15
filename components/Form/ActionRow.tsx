import React from "react";
import { UseFormReturn } from "react-hook-form";
import Layout from "../Layout";
import ActionButton from "../ActionButton";
import useDialog from "@/hooks/useDialog";

type FormActionRowProps = {
  form: UseFormReturn<any>;
};

const FormActionRow = ({ form }: FormActionRowProps) => {
  const { resetDialogContext } = useDialog();

  const handleCancel = () => {
    resetDialogContext();
    form.reset();
  };

  return (
    <Layout.Row justify="end">
      <ActionButton
        color="errorSoft"
        label={"Cancel"}
        buttonType="reset"
        onClick={handleCancel}
      />
      <ActionButton color="success" label={"Submit"} buttonType="submit" />
    </Layout.Row>
  );
};

export default FormActionRow;
