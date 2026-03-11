"use client"

import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import { useBprDetailsSelection } from "@/store/bprDetailsSlice"
import ExaminationCard from "./ExaminationCard"

const QualityTab = () => {
  const { qcRecords } = useBprDetailsSelection()

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>Examinations</SectionTitle>

      <Card.Root>
        {qcRecords.length === 0 ? (
          <p className="font-medium text-xl text-base-content/50 font-poppins">
            No examinations conducted for this batch.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {qcRecords.map((record) => (
              <ExaminationCard key={record.id} examination={record} />
            ))}
          </div>
        )}
      </Card.Root>
    </div>
  )
}

export default QualityTab
