import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import Layout from "../Layout";
import ActionButton from "../ActionButton";

type FormActionRowProps = {
  form: UseFormReturn<any>;
};

const FormActionRow = ({ form }: FormActionRowProps) => {
  const { handleSubmit } = form;
  return (
    <Layout.Row>
      <ActionButton label={"Submit"} buttonType="submit"/>
    </Layout.Row>
  );
};

export default FormActionRow;