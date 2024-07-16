import ServerActions from "@/utils/classes/ServerActions";
import { getPurchasingLotOrigins } from "../auxiliary/getPurchasingLotOrigins";

class LotOriginActions extends ServerActions {
	constructor() {
		super("lotOrigin");
	}

	getPurchasingLotOrigins = async (purchaseOrderId: string) => {
		const response = await getPurchasingLotOrigins(purchaseOrderId);

		return response;
	};
}

const lotOriginActions = new LotOriginActions();

export default lotOriginActions;
