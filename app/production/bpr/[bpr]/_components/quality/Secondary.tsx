import { useEffect } from "react"
import MaterialList from "./MaterialList"
import QualityActions from "./QualityActions"
import QualityDetails from "./QualityDetails"
import { useProductionActions } from "@/store/productionSlice"

const Secondary = () => {

  const { setQualityMode } = useProductionActions()
  useEffect(() => {
    setQualityMode('secondary');
  }, [])


  return (
    <div className="grid grid-cols-5 gap-6">

      <MaterialList />
      <QualityDetails />

    </div>
  )
}

export default Secondary 
