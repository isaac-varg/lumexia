'use client'

import { useInvestigationSelection } from "@/store/investigationSlice"
import DataTable from "@/components/DataTable/Default"
import { auditColumns } from "./AuditColumns"
import Text from "@/components/Text"
import Card from "@/components/Card/Root"
import { DateTime } from "luxon"
import UserIcon from "@/components/UI/UserIcon"

const Audits = () => {

  const { audits, auditRequests } = useInvestigationSelection()

  const combinedAudits = audits?.combined || []

  return (
    <div className="flex flex-col gap-y-8">

      <div className="flex flex-col gap-y-4">
        <Text.SectionTitle>Audits ({combinedAudits.length})</Text.SectionTitle>
        <DataTable
          data={combinedAudits}
          columns={auditColumns}
          onRowClick={() => { }}
          tableStateName="investigationAudits"
          initialSortBy={[{ id: 'createdAt', desc: true }]}
        />
      </div>

      <div className="flex flex-col gap-y-4">
        <Text.SectionTitle>Audit Requests ({auditRequests.length})</Text.SectionTitle>
        {auditRequests.length === 0 && (
          <p className="text-base-content/50 italic">No audit requests for this item.</p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {auditRequests.map(request => (
            <Card key={request.id}>
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <Text.SectionTitle size="small">
                    Request - {request.status.name}
                  </Text.SectionTitle>
                  <span className="text-sm text-base-content/60">
                    {DateTime.fromJSDate(request.createdAt).toFormat("DD @t")}
                  </span>
                </div>
                <div className="flex gap-x-2 items-center">
                  <UserIcon image={request.requestedBy.image || ''} name={request.requestedBy.name || ''} />
                  <p className="text-sm">Requested by {request.requestedBy.name}</p>
                </div>
                {request.notes.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold mb-1">Notes:</p>
                    {request.notes.map(note => (
                      <div key={note.id} className="text-sm border-l-2 border-accent/35 pl-2 mb-1">
                        <span className="text-base-content/60">{note.user.name}:</span> {note.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Audits
