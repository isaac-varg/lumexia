import { useFieldContext } from "."

const classes = {
  label: {
    default: "font-medium text-xl text-base-content",
    soft: "font-normal text-lg text-base-content/70",
  }
}

type TextFieldProps = {
  label: string,
  labelClass?: keyof typeof classes.label,
  description?: string,
}

const TextField = ({ label, description, labelClass = 'default' }: TextFieldProps) => {

  const field = useFieldContext<string>()

  return (
    <div className="flex flex-col gap-2">
      <label className={classes.label[labelClass]}>{label}</label>
      {description && <p className="font-light text-lg text-base-content/80">{description}</p>}
      <input
        value={field.state.value}
        className="input w-full input-lg"
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  )
}

export default TextField


