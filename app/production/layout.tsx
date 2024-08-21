import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";

const PurchasingLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <>
        <PageBreadcrumbs />
        {children}
    </>
  )
}

export default PurchasingLayout
