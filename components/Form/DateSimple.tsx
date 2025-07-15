import { UseFormReturn } from 'react-hook-form';

type DateSimpleProps = {
    form: UseFormReturn<any>;
    required: boolean;
    fieldName: string;
    label: string;
};
const DateSimple = ({ form, required, fieldName, label }: DateSimpleProps) => {
    return (
        <div className='flex flex-col gap-y-1'>
            <label className="font-poppins text-neutral-950 text-xl">
                {label}
            </label>
            <input
                type='datetime'
                {...form.register(fieldName, { required: required })}
                className="px-4 py-4 border-2 border-cutty-sark-100 bg-cutty-sark-100 rounded-lg focus:outline-none focus:ring-0 focus:border-cutty-sark-500 text-xl text-neutral-950"
                placeholder={label}
            />
            {form.formState.errors.name && <span>This field is required</span>}
        </div>
    );
};

export default DateSimple;
