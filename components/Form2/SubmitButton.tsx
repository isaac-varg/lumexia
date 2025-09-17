import { useStore } from "@tanstack/react-form";
import { useFormContext } from ".";

type SubmitButtonProps = {
  children?: React.ReactNode;
}

const SubmitButton = ({ children }: SubmitButtonProps) => {

  const form = useFormContext();
  const [isSubmitting, isDirty] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.isDirty,
  ])

  return (
    <button
      type="submit"
      className={`btn ${(isSubmitting || !isDirty) ? 'btn-disabled' : 'btn-success'}`}
      disabled={isSubmitting || !isDirty}
    >
      {children ? children : 'Save'}
    </button>
  )
}

export default SubmitButton
