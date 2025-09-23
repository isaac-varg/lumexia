import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import ExaminationWizard from "./_components/ExaminationWizard";
import StateSetter from "./_components/StateSetter";

type Props = {
  searchParams: {
    id: string;
  };
};

const NewExaminationPage = ({ searchParams }: Props) => {

  const { id } = searchParams;

  return (
    <div>

      <StateSetter lotId={id} />

      <ExaminationWizard />

    </div>
  )
}

export default NewExaminationPage 
