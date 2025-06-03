import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import ExaminationWizard from "./_components/ExaminationWizard";




type Props = {
    searchParams: {
        id: string;
    };
};

const ExaminationPage = ({ searchParams }: Props) => {



    return (
        <div>

            <PageBreadcrumbs />

            <ExaminationWizard />

        </div>
    )
}

export default ExaminationPage 
