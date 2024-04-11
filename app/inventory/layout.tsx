import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";

const InventoryLayout = ({
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

export default InventoryLayout