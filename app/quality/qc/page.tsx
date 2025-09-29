import PageTitle from "@/components/Text/PageTitle"
import NavigationPanels from "./_components/NavigationPanels"
import ScanPanel from "./_components/ScanPanel"


const QcPage = () => {

  return (
    <div className='flex flex-col gap-y-6'>

      <PageTitle>Quality</PageTitle>

      <NavigationPanels />


      <ScanPanel />


    </div>
  )
}

export default QcPage


