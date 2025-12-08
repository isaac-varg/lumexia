'use server'

import { productionActions } from "@/actions/production";
import { BprStaging } from "@/actions/production/bprs/stagings/getAll";
import { BprConsumptionError } from "@/utils/errors/BprConsumptionError";

export const getStagings = async (bprId: string): Promise<BprStaging[] | BprConsumptionError> => {

  try {
    const stagings = await productionActions.bprs.stagings.getAll(bprId);

    if (stagings.length === 0) {
      throw new BprConsumptionError('NO_STAGINGS_FOUND', 'There are no stagings assocaited with this BPR ID.', { bprId, })
    }
    return stagings;
  } catch (error) {
    if (error instanceof BprConsumptionError) {
      return error;
    }
    return error as BprConsumptionError;
  }
}
