import { useEffect } from "react"
import MaterialList from "./MaterialList"
import QualityDetails from "./QualityDetails"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import Header from "./Header"

const Secondary = () => {

  const { selectedBomItem } = useProductionSelection()
  const { setQualityMode } = useProductionActions()
  useEffect(() => {
    setQualityMode('secondary');
  }, [])


  return (
    <div className="flex flex-col gap-6">

      <Header />
      {!selectedBomItem && <MaterialList />}
      <QualityDetails />


    </div>
  )
}

export default Secondary
