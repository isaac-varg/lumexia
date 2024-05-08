import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";

const PurchasingLayout = ({
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

export default PurchasingLayout