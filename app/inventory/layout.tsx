import PageBreadcrumbs from "@/components/PageBreadcrumbs";

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