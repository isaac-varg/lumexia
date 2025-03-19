import { createEquipment } from "./equipment/createEquipment";
import { getAllEquipment } from "./equipment/getAllEquipment";
import { updateEquipment } from "./equipment/updateEquipment";
import { getAllEquipmentTypes } from "./equipmentType/getAllEquipmentTypes";

export const facilityActions = {
    equipment: {
        getAll: getAllEquipment,
        create: createEquipment,
        update: updateEquipment,
    },
    equipmentTypes: {
        getAll: getAllEquipmentTypes,
    }
}
