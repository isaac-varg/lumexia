import { notFound } from "next/navigation"
import PageWrapper from "@/components/App/PageWrapper"
import { getFileDetails } from "./_actions/getFileDetails"
import FileDetailsView from "./_components/FileDetailsView"

type Props = { params: { fileId: string } }

const FileDetailPage = async ({ params }: Props) => {
  const details = await getFileDetails(params.fileId)

  if (!details) notFound()

  return (
    <PageWrapper pageTitle={details.file.name}>
      <FileDetailsView details={details} />
    </PageWrapper>
  )
}

export default FileDetailPage
