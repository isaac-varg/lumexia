import SectionTitle from "@/components/Text/SectionTitle"
import ActiveMbprBom from "./ActiveMbprBom"
import ActiveMbpr from "./ActiveMbpr"
import BatchesTable from "./BatchesTable"
import BatchesChart from "./BatchesChart"
import BatchesStats from "./BatchesStats"

const Produced = () => {

  // production amount chart / how much we make per year

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-6">

        <SectionTitle>Active MBPR</SectionTitle>

        <div className="grid grid-cols-4 gap-6">

          <ActiveMbprBom />
          <ActiveMbpr />

        </div>

        <SectionTitle>Produced Batches</SectionTitle>

        <div className="grid grid-cols-2 gap-6">

          <BatchesChart />
          <BatchesStats />
          <BatchesTable />

        </div>

      </div>

    </div>
  )
}

export default Produced
