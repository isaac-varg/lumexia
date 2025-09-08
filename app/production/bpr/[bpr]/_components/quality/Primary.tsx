import MaterialList from "./MaterialList"
import QualityActions from "./QualityActions"
import QualityDetails from "./QualityDetails"

const Primary = () => {
  return (
    <div className="grid grid-cols-5 gap-6">


      <MaterialList />
      <QualityDetails />


    </div>
  )
}

export default Primary
