import Card from "@/components/Card"
import Tag from "@/components/Text/Tag"
import { dateFormatString } from "@/configs/data/dateFormatString"
import { useItemSelection } from "@/store/itemSlice"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"

const BatchesTable = () => {

  const { bprs } = useItemSelection()
  const router = useRouter();


  return (
    <Card.Root span={2}>

      <Card.Title>BPRs</Card.Title>


      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>BPR #</th>
              <th>Status</th>
              <th>Batch Size</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {bprs.map(bpr => {
              return (
                <tr key={bpr.id}
                  onClick={() => router.push(`/production/planning/${bpr.referenceCode}?id=${bpr.id}`)}
                  className="hover:bg-accent/40 hover:cursor-pointer">

                  <td>{bpr.referenceCode}</td>
                  <td>{<Tag bgColor={bpr.status.bgColor} textColor={bpr.status.textColor} label={bpr.status.name} />}</td>
                  <td>{bpr.batchSize.quantity} lbs</td>
                  <td>{DateTime.fromJSDate(bpr.createdAt).toFormat(dateFormatString)}</td>
                  <td>{DateTime.fromJSDate(bpr.updatedAt).toFormat(dateFormatString)}</td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>

    </Card.Root>
  )
}

export default BatchesTable
