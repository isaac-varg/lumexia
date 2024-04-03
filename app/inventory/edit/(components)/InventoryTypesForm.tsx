import Form from "@/components/Form";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

const InventoryTypesForm = () => {
  const form = useForm<Inputs>();

  const handleSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <Form.Root form={form} onSubmit={handleSubmit}>
      <Form.Text form={form} fieldName="name" label="Name" required={true} />
      <Form.ActionRow form={form} />
    </Form.Root>
  );
};

export default InventoryTypesForm;
