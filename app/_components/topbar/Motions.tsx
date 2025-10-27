'use client'
import MotionsDialog from "./MotionsDialog";
import MotionsButton from "./MotionsButton";
import { usePathname } from "next/navigation";

const Motions = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");



  return (
    <div>
      <MotionsDialog segments={segments} />
      <MotionsButton />
    </div>
  )
}

export default Motions
