import PageWrapper from "@/components/App/PageWrapper";
import { getAllFiles } from "./_actions/getAllFiles";
import FilesTabs from "./_components/FilesTabs";

const FilesPage = async () => {
  const entries = await getAllFiles();
  return (
    <PageWrapper pageTitle="Files">
      <FilesTabs entries={entries} />
    </PageWrapper>
  );
};

export default FilesPage;
