import { getProducibleBprs } from "./_actions/getProducibleBprs"
import Bprs from "./_components/bprs/Bprs";
import Timers from "./_components/timers/Timers"

const BprProductionPage = async () => {

  const bprs = await getProducibleBprs();
  // active timers
  // this week
  // next week
  return (
    <div className="flex flex-col gap-6">
      <Timers />
      <Bprs bprs={bprs} />
    </div>
  )
}

export default BprProductionPage
