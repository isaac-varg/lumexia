import PageTitle from "../Text/PageTitle"
import PageBreadcrumbs from "./PageBreadcrumbs"

type PageWrapperProps = {
  children: React.ReactNode,
  pageTitle?: string | null
}

const PageWrapper = ({ children, pageTitle }: PageWrapperProps) => {
  return (
    <div className='flex flex-col gap-y-6'>
      <div className="flex flex-col gap-y-2">

        {pageTitle && <PageTitle> {pageTitle}</PageTitle>}

      </div>

      {children}


    </div >

  )
}

export default PageWrapper
