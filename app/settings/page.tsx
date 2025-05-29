import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import PageTitle from "@/components/Text/PageTitle"
import Buttons from "./_components/Buttons"

const SettingsPage = () => {

    return (
        <div className="flex flex-col gap-y-6">

            <PageBreadcrumbs />
            <PageTitle>Settings</PageTitle>

            <Buttons />



        </div>


    )
}

export default SettingsPage 
