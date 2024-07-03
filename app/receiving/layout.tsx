import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";

const ReceivingLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
        <PageBreadcrumbs />
        {children}
    </div>
  )
}

export default ReceivingLayout
