import { getSteps } from "./_actions/compounding/getSteps";
import { getBprBom } from "./_actions/getBprBom";
import { getProductionBpr } from "./_actions/getProductionBpr"
import Header from "./_components/Header";
import StateSetter from "./_components/state/StateSetter";
import ViewManager from "./_components/view/ViewManager";

type Props = { searchParams: { id: string } }

const ProductionBprPage = async ({ searchParams }: Props) => {

  const bpr = await getProductionBpr(searchParams.id);

  const [
    bom,
    steps,
  ] = await Promise.all([
    getBprBom(bpr.id),
    getSteps(bpr.id),
  ])


  return (
    <div className="flex flex-col gap-6">
      <StateSetter
        bpr={bpr}
        bom={bom}
        steps={steps}
      />

      <Header />
      <ViewManager />






    </div>
  )
}

export default ProductionBprPage
