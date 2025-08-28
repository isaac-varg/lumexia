import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { calculateGrandTotal } from "../../_functions/calculateTotal";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { usePurchasingSelection } from "@/store/purchasingSlice";

const Totals = () => {

  const { orderItems } = usePurchasingSelection()

  const total = calculateGrandTotal(orderItems);

  return (
    <Card.Root>
      <Card.Title>Total</Card.Title>
      <LabelDataPair label="Total" data={toFracitonalDigits.curreny(total)} />
    </Card.Root >

  )
};

export default Totals;
