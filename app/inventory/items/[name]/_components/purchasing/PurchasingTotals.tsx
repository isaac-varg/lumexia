import Layout from "@/components/Layout";
import { FlattenedPurchaseOrder } from "../../_functions/flattenPurchaseOrder";
import { getPurchasesTotals } from "../../_functions/getPurchasesTotals";
import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { Item } from "@prisma/client";

const PurchasingTotals = ({
  purchaseOrders,
	item,
}: {
  purchaseOrders: FlattenedPurchaseOrder[];
		item: Item
}) => {
  const purchasesTotals = getPurchasesTotals(purchaseOrders, item);
//  const totalCount = purchasesTotals.reduce((acc, curr) => acc + curr[2], 0);
 // const quantityTotal = purchasesTotals.reduce((acc, curr) => acc + curr[3], 0);

  return (
    <div>
      <Layout.Grid>
        <Card.Root>
          <h2 className="font-semibold text-base font-poppins uppercase">
            PO Count
          </h2>
          {purchasesTotals.map((po: any[]) => {
            const [id, name, poCount] = po;

            return <LabelDataPair key={id} label={name} data={poCount} />;
          })}
          <LabelDataPair label="Total" data={totalCount} />
        </Card.Root>
        <Card.Root>
          <h2 className="font-semibold text-base font-poppins uppercase">
            Quantity Ordered
          </h2>
          {purchasesTotals.map((po: any[]) => {
            const [id, name, , quantity] = po;

            return (
              <LabelDataPair key={id} label={name} data={`${quantity} lbs`} />
            );
          })}
          <LabelDataPair label="Total" data={`${quantityTotal} lbs`} />
        </Card.Root>
      </Layout.Grid>
    </div>
  );
};

export default PurchasingTotals;
