import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import ExaminationWizard from "./_components/ExaminationWizard";

type Props = {
    searchParams: {
        id: string;
    };
};

const NewExaminationPage = ({ searchParams }: Props) => {

    return (
        <div>

            <PageBreadcrumbs />

            <ExaminationWizard />

        </div>
    )
}

export default NewExaminationPage 
