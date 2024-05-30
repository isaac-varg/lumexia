import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";

const PurchasingEditLayout = ({
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

export default PurchasingEditLayout