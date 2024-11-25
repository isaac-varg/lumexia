"use server";
import { seedAction } from "./seedAction";

const main = async () => {
        await seedAction("inventoryType");
        await seedAction("procurementType");
        await seedAction("itemType");

        await seedAction("user");
        await seedAction("verificationToken")
        await seedAction("account");

        await seedAction("item");
        await seedAction("activityLog");

        await seedAction("containerType");
        await seedAction("transactionType");
        await seedAction("unitOfMeasurement");
        await seedAction("unitOfMeasurementConversion");
        await seedAction("lot");
        await seedAction("container");
        await seedAction("transaction");

        await seedAction("aliasType");
        await seedAction("alias");
        await seedAction("paymentMethod");

        await seedAction("supplier");
        await seedAction("purchaseOrderStatus");
        await seedAction("purchaseOrder");
        await seedAction("purchaseOrderItem");
        await seedAction("purchaseOrderNote");
        await seedAction("supplierAlias");
        await seedAction("recordStatus");
        await seedAction("stepAddendumType");
        await seedAction("supplierContact");
        await seedAction("supplierContactNote");
        await seedAction("supplierNote");
        await seedAction("supplierPaymentMethod");

        await seedAction("lotOrigin");
        await seedAction("userRole");

        await seedAction("bprStatus");
        await seedAction("bprStagingStatus");
        await seedAction("stepActionableType");
        await seedAction("stepAddendumType")

        await seedAction("masterBatchProductionRecord");
        await seedAction("batchStep");
        await seedAction("stepActionable");
        await seedAction("stepAddendum")
        await seedAction("stepInstruction");

        await seedAction("billOfMaterial");
        await seedAction("batchSize");
        await seedAction("stepEquipment")
        await seedAction("bprStepActionableStatus");
        await seedAction("bprBatchStepStatus");

        await seedAction("batchProductionRecord");
        await seedAction("bprBatchStep");
        await seedAction("bprStepActionable");
        await seedAction("bprBillOfMaterials");
        await seedAction("bprStaging");
        await seedAction("bprStagingVerification");
        await seedAction("bprStepActionableCompletion");

        await seedAction("bprStepActionableVerification");

        await seedAction("microSubmission");
};

main()
        .catch((e) => {
                throw e;
        })
        .finally(async () => {
                console.log("Seeding complete!");
        });
