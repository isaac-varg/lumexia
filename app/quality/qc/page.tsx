import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import NavigationPanels from "./_components/NavigationPanels"
import ScanPanel from "./_components/ScanPanel"


const QcPage = () => {
    return (
        <div className='flex flex-col gap-y-6'>
            <PageBreadcrumbs />

            <NavigationPanels />


            <ScanPanel />


        </div>
    )
}

export default QcPage


