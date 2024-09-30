"use server"

import bprBomActions from "@/actions/production/bprBom";
import { staticRecords } from "@/configs/staticRecords"
import { BprBom  } from "@/types/bprBom"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

// the naming is really similar to the verifyBomItemStaging, but
// this is the overall bom item the other file is for the actual scan/staging to fulfill the item
// i.e., a bomitem can have many different lots scanned/stagings

export const verifyBomItem = async (bomItem: BprBom) => {

  const payload = {
      statusId: staticRecords.production.bprBomStatuses.verified
  };

  const bomResponse: BprBom = await bprBomActions.update({id: bomItem.id } , payload)

  await createActivityLog( 'updateBprBom' , 'bprBom', bomItem.id, {context: `BOM item status changed to ${bomResponse.statusId}`})

}
