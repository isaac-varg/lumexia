import { useFieldContext } from "."

const classes = {
  label: {
    default: "font-medium text-xl text-base-content",
    soft: "font-normal text-lg text-base-content/70",
  },
  errors: {
    default: "font-medium text-lg text-error underline decoration-wavy decoration-error"
  }
}

type SelectFieldProps = {
  label: string,
  options: { label: string, value: string }[]
  labelClass?: keyof typeof classes.label
}



const SelectField = ({ label, options, labelClass = 'default' }: SelectFieldProps) => {

  const field = useFieldContext<string>()

  return (
    <div className="flex flex-col gap-2">
      <label className={`${classes.label[labelClass]}`}>{label}</label>
      <select
        value={field.state.value}
        className="select h-full w-full font-poppins text-lg p-2 text-base-content"
        onChange={(e) => field.handleChange(e.target.value)}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

export default SelectField


