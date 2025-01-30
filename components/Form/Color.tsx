
import { HexColorPicker } from "react-colorful";
import { UseFormReturn } from "react-hook-form";

type ColorFieldProps = {
    form: UseFormReturn<any>;
    label: string;
    fieldName: string;
};

const ColorField = ({ form, label, fieldName }: ColorFieldProps) => {
    const { setValue, watch } = form;
    const colorValue = watch(fieldName); // Make it reactive

    return (
        <div className="flex flex-col gap-y-1">
            <label className="font-poppins text-cutty-sark-900 text-xl">{label}</label>
            <HexColorPicker
                color={colorValue || "#ffffff"} // Provide a default color
                onChange={(value) => setValue(fieldName, value, { shouldValidate: true })}
            />
        </div>
    );
};

export default ColorField;

