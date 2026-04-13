import PageWrapper from "@/components/App/PageWrapper";
import { getAllFiles } from "./_actions/getAllFiles";
import FilesView from "./_components/FilesView";

const FilesPage = async () => {
  const entries = await getAllFiles();
  return (
    <PageWrapper pageTitle="Files">
      <FilesView entries={entries} />
    </PageWrapper>
  );
};

export default FilesPage;
