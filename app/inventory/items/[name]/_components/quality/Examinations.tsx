import { QcRecordExpanded } from "@/actions/quality/qc/records/getAllByItem"
import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import Tag from "@/components/Text/Tag"
import UserIcon from "@/components/UI/UserIcon"
import { dateFormatWithTime } from "@/configs/data/dateFormatString"
import { useItemSelection } from "@/store/itemSlice"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { TbCalendar } from "react-icons/tb"

const Examinations = () => {

  const { qcRecords } = useItemSelection()
  const router = useRouter()
  const handleClick = (record: QcRecordExpanded) => {
    const path = `/quality/qc/examination/new/${record.examinedLot.lotNumber}?lotId=${record.examinedLot.id}&examinationId=${record.id}`
    router.push(path)


  }
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Examinations</SectionTitle>

      <Card.Root>
        {qcRecords.map(record => {
          return (
            <div
              key={record.id}
              className="flex flex-col gap-4 bg-base-300/65 hover:bg-accent/55 hover:cursor-pointer rounded-xl px-4 py-4  items-center"
              onClick={() => handleClick(record)}
            >

              <div className="flex justify-between items-center w-full">
                <div className="font-semibold text-xl text-base-content">
                  {record.examinedLot.lotNumber}
                </div>

                <div className=" flex gap-2 items-center">
                  <div className="font-normal text-xl text-base-content">
                    {record.examinationType.name}
                  </div>
                  <Tag label={record.status.name} bgColor={record.status.bgColor} textColor={record.status.textColor} />
                </div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className=" flex gap-2 items-center">
                  <UserIcon image={record.conductedBy.image || ''} name={record.conductedBy.name || ''} />
                  <div className="font-normal text-xl text-base-content">{record.conductedBy.name || ''}</div>
                </div>

                <div className=" flex gap-2 items-center">
                  <TbCalendar className="size-4" />
                  <div className="font-normal text-xl text-base-content">{DateTime.fromJSDate(record.createdAt || '').toFormat(dateFormatWithTime)}</div>
                </div>
              </div>



            </div>


          )
        })}
      </Card.Root>

    </div>
  )
}

export default Examinations
