import containerActions from "@/actions/inventory/containerActions";
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import { toInventoryUom } from "@/utils/uom/toInventoryUom";

export const createContainer = async (lotId: string, containerTypeId: string, containerWeight: number, uomId: string) => {



  let quantity = containerWeight;
  if (uomId !== uom.pounds) {
    const convertedQuantity = await toInventoryUom(uomId, containerWeight);
    quantity = convertedQuantity;
  }




  const createData = {
    lotId,
    containerTypeId,
    containerWeight: quantity,
    uomId: uom.pounds,
  };

  await containerActions.createNew(createData);
}
