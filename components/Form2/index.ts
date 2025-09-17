import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextField from "./TextField";
import SubmitButton from "./SubmitButton";
import ToggleField from "./ToggleField";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    ToggleField,
  },
  formComponents: {
    SubmitButton,
  },
});
