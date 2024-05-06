import { UseFormReturn } from "react-hook-form";

type NumberProps = {
  form: UseFormReturn<any>;
  required: boolean;
  fieldName: string;
  label: string;
  // validation?: { value: (value: any) => string | undefined }; // Optional validation function
};
const Form = ({ form, required, fieldName, label }: NumberProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="font-poppins text-neutral-950 text-xl">{label}</label>
      <input
          {...form.register(fieldName, {
            required: required,
            valueAsNumber: true, // Ensure value is a number
            validate: {
              value: (value) => {
                if (!isNaN(value)) {
                  return undefined;
                }
                return "Please enter a valid amount (numbers with optional decimal point)";
              },
            }
          })}
        className="px-4 py-4 border-2 border-shutters-100 bg-shutters-100 rounded-lg focus:outline-none focus:ring-0 focus:border-shutters-500 text-xl text-neutral-950"
        placeholder={label}
      />
      {form.formState.errors.name && <span>This field is required</span>}
    </div>
  );
};

export default Form;
