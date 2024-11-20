import containerActions from "@/actions/inventory/containerActions";
import { staticRecords } from "@/configs/staticRecords";
import { toInventoryUom } from "@/utils/uom/toInventoryUom";

export const createContainer = async (lotId: string, containerTypeId: string, containerWeight: number, uomId: string) => {



    let quantity = containerWeight;
    if (uomId !== staticRecords.inventory.uom.lb) {
        const convertedQuantity = await toInventoryUom(uomId, containerWeight);
        quantity = convertedQuantity;
    }




    const createData = {
        lotId,
        containerTypeId,
        containerWeight: quantity,
        uomId: staticRecords.inventory.uom.lb,
    };

    await containerActions.createNew(createData);
}
