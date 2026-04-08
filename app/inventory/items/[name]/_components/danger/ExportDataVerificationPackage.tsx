'use client'
import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import { useItemSelection } from "@/store/itemSlice"
import { useState } from "react"

const ExportDataVerificationPackage = () => {
  const { item } = useItemSelection()
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    if (!item) return
    setLoading(true)
    try {
      const res = await fetch(`/api/items/${item.id}/export`)
      if (!res.ok) throw new Error(`Export failed: ${res.status}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `data-verification-package-${item.name}.zip`
      anchor.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Export Data Verification Package</SectionTitle>

      <Card.Root>
        <div className="justify-between h-full flex flex-col">
          <div className="font-poppins text-xl font-medium text-base-content">
            Export a full data verification package for this item including all records and attachments.
          </div>

          <button
            onClick={handleExport}
            disabled={loading}
            className="btn btn-outline"
          >
            {loading ? "Exporting..." : "Export Package"}
          </button>
        </div>
      </Card.Root>
    </div>
  )
}

export default ExportDataVerificationPackage
