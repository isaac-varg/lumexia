'use client'
import useDialog from "@/hooks/useDialog";
import { useHotkeys } from "react-hotkeys-hook";
import { TbKeyboard } from "react-icons/tb"

const MotionsButton = () => {

  const { showDialog } = useDialog();

  useHotkeys('ctrl+/', () => showDialog('motions'))

  return (
    <button onClick={() => showDialog('motions')} className="btn btn-circle btn-ghost">
      <TbKeyboard className="size-6" />
    </button>

  )
}

export default MotionsButton
