import { useEffect } from "react"
import MaterialList from "./MaterialList"
import QualityActions from "./QualityActions"
import QualityDetails from "./QualityDetails"
import { useProductionActions } from "@/store/productionSlice"

const Primary = () => {

  const { setQualityMode } = useProductionActions()
  useEffect(() => {
    setQualityMode('primary');
  }, [])


  return (
    <div className="grid grid-cols-5 gap-6">

      <MaterialList />
      <QualityDetails />

    </div>
  )
}

export default Primary
