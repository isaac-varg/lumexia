import { Lot } from "@/actions/inventory/lots/getAll"
import { qualityActions } from "@/actions/quality"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import SearcherUnmanaged from "@/components/Search/SearcherUnmanaged"
import SectionTitle from "@/components/Text/SectionTitle"
import { staticRecords } from "@/configs/staticRecords"
import { useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Search = () => {
  const { lots } = useQcExaminationSelection()
  const [input, setInput] = useState('')
  const [filtered, setFiltered] = useState<Lot[]>([])
  const router = useRouter()

  const handleClick = async (lot: Lot) => {

    const userId = await getUserId()
    const record = await qualityActions.qc.records.create({
      conductedById: userId,
      examinedLotId: lot.id,
      examinationTypeId: staticRecords.quality.examinations.types.inProcess,
      statusId: staticRecords.quality.records.statuses.open,
    })

    const path = `/quality/qc/examination/new/${lot.lotNumber}?lotId=${lot.id}&examinationId=${record.id}`
    router.push(path)
  }


  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Search</SectionTitle>
      <Card.Root>
        <SearcherUnmanaged<Lot>
          keys={['lotNumber']}
          input={input}
          setInput={setInput}
          data={lots}
          onQueryComplete={setFiltered}
        />

        <div className="grid grid-cols-1 gap-2">

          {filtered.map(lot => {
            return (
              <button
                key={lot.id}
                className="btn btn-secondary btn-outline"
                onClick={() => handleClick(lot)}
              >
                {lot.lotNumber}
              </button>
            )
          })}

        </div>
      </Card.Root>
    </div>
  )
}

export default Search
