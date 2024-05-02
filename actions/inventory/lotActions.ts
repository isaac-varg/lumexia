import ServerActions from "@/utils/classes/ServerActions";
import { getLotsByItem } from "../auxiliary/getLotsByItem";



class LotActions extends ServerActions {
    constructor() {
        super('lot');
    }

    getByItem = async (itemId: string) => {
        const response = await getLotsByItem(itemId);
        return response;
    }
}

const lotActions = new LotActions();

export default lotActions;