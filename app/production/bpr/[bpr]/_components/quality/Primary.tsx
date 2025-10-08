import { useEffect } from "react"
import MaterialList from "./MaterialList"
import QualityDetails from "./QualityDetails"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import Header from "./Header"

const Primary = () => {

  const { selectedBomItem } = useProductionSelection()
  const { setQualityMode } = useProductionActions()
  useEffect(() => {
    setQualityMode('primary');
  }, [])


  return (
    <div className="flex flex-col gap-6">

      <Header />
      {!selectedBomItem && <MaterialList />}
      <QualityDetails />


    </div>
  )
}

export default Primary
