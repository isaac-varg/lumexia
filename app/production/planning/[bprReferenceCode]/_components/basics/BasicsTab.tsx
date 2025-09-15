import BatchSize from "./BatchSize"
import Scheduling from "./Scheduling"
import Statuses from "./Status"

const BasicsTab = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <BatchSize />
      <Statuses />

      <Scheduling />




    </div>
  )
}

export default BasicsTab
