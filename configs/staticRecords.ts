// this object is for record ids of imported ( or default) records that must be used in various areas of the application.
// e.g., produced procurement type should always be present in the application.
// i didn't want to hard code these in but since they are the same and essential, i didn't want to call the db every time we used them

export const staticRecords = {
    inventory: {
        transactionTypes: {
            bprConsumption: '098a21b2-3101-46a3-b3fe-ca81bb109a4a',
        },
        procurementTypes: {
            purchased: 'a3580517-22ca-419c-89d1-f30cbd4c1b4e',
            produced: '82aca833-c8e4-42c8-8488-a2bb15088f8e'
        },
        producedProcurementId: '82aca833-c8e4-42c8-8488-a2bb15088f8e',
        uom: {
            lb: '68171f7f-3ac0-4a3a-b197-18742ebf6b5b'
        },
        containerTypes: {
            drum: '8dfd5db7-06c9-4246-817e-8332f87df56f',
            tote: 'a8aa60c5-54ee-43f6-856f-625af5735391',
            container: 'c16c1cec-f71d-4b76-9075-40062ec5b740',
        },
        inventoryTypes: {
            consumable: '2bbed7c5-5ce1-4624-b1a2-8b9b50c903b5',
            tracked: '9eddbeb5-e748-4580-8e29-a7a64f8f9a84'
        },
        aliases: {
            types: {
                supplier: '7173f88e-057a-43a7-aa37-6b9b97707b08'
            }
        }
    },
    app: {
        recordStatuses: {
            active: 'd7b0a804-52c6-4586-b4f4-0fe49895f794'
        },
        userRoles: {
            productionQuality: 'ea83900a-24fa-448c-9737-02c98bfaa193',
            production: 'ef88a45c-3114-4eed-90fb-d76e25b6782c',
            systemAdmin: '95e34f0a-0b52-40e4-a48d-0643f3b1a8f4',
        },
        userConfigGroups: {
            panelSelections: '579091aa-13e9-4c0c-86a0-983f07a93ad7',
            general: '879f6a09-8308-4215-8572-18489e028cc8',
        },
    },
    production: {
        bprStatuses: {
            draft: '7a9fd26f-3153-42f5-9de4-6776f59ec670',
            allocatedMaterials: '13b7b0dd-bd1b-4b23-a1c1-64f17f193eae',
            verifyingBomFulfillment: 'b1701ec8-b094-4528-bb88-e70aedcc2909',
            awaitingMaterials: 'cfb2102c-43a9-4e3a-8490-40ec9eb22930',
            knownMaterialArrival: '5fec6206-ce94-402e-ad34-9efe1b615cfc',
            queued: '2a8332c8-87e4-4872-ac6a-7e184493ec44',
            stagingMaterials: 'c63e9eff-ee29-4987-b617-602edf1a486c',
            compounding: 'a45875cd-bf1b-46d1-ae3e-09770b4e2b8a',
            completed: '30ad195c-1e63-4101-839f-4be663548c19',
            awaitingQc: '79591355-7e7f-4598-ab6c-612bce05526b',
            released: '0ec79764-cc04-41b8-a3d6-c91e71a2f159',
            investigating: '1aecf3b0-723a-43c9-b46f-907417602210',
            failed: '7f2d60ff-ecea-415e-8ed3-e868002354ed',
        },
        //really terrible naming, this is actually bprStagingStatuses... 
        bprBomStatuses: {
            notStarted: '3d5f8db4-3937-41e0-840b-da3c1ab682c5',
            staged: 'ee67bd6c-974e-407d-99d8-6482b77aabec',
            verified: '9a8f0c18-a035-424c-ba0f-d7635cf1fee8',
            secondaryVerification: '52311908-0abf-4fa8-92d9-0152cce93da7',
            consumed: 'ec7240b9-d2db-4447-9ad5-1b2ff0ba7885'
        },
        // copy of above to start using proper name... 
        bprStagingStatuses: {
            notStarted: '3d5f8db4-3937-41e0-840b-da3c1ab682c5',
            staged: 'ee67bd6c-974e-407d-99d8-6482b77aabec',
            verified: '9a8f0c18-a035-424c-ba0f-d7635cf1fee8',
            secondaryVerification: '52311908-0abf-4fa8-92d9-0152cce93da7',
            consumed: 'ec7240b9-d2db-4447-9ad5-1b2ff0ba7885'
        },
        bprStepActionableStatuses: {
            notStarted: '1a8e6443-43a1-4531-9ee2-00156b86e7d8',
            compounding: '0639c02a-8062-463d-b7df-c47ddd9b4582',
            verify: '8be63277-c4e4-4263-9665-005113941418',
            secondaryVerification: '8dd8cfcc-533a-48e6-a1e6-acb6acea0991', // as if necessary
            completed: 'bec61e3f-87f0-485b-813f-65a8bd8103df',
        },
        bprBatchStepStatuses: {
            notStarted: '1a8e6443-43a1-4531-9ee2-00156b86e7d8',
            fulfillStep: '0639c02a-8062-463d-b7df-c47ddd9b4582',
            verify: '8be63277-c4e4-4263-9665-005113941418',
            secondaryVerification: '8dd8cfcc-533a-48e6-a1e6-acb6acea0991', // as if necessary
            completed: 'bec61e3f-87f0-485b-813f-65a8bd8103df',
        }

    },
    purchasing: {
        poStatuses: {
            confirmedSlashAwaitingDelivery: 'd1c6bb97-a554-49b5-9a6a-0261405dc2cc',
            draft: '51ef134e-f6f5-4117-a4c4-4a3df087471a',
            received: 'db907b0f-4aac-42d7-9118-ee35e178d9b3'
        },
        requestPriorities: {
            neededForBatch: "88d4f46b-72ba-44b8-b01c-d9a849f3b227",
            runningLow: "bfbe26eb-3e22-4ab8-ba82-8662846d6b70",
            outOfStock: "e19affa6-18b2-40a9-b738-f38b593480da",
            high: "88d4f46b-72ba-44b8-b01c-d9a849f3b227",
            normal: "bfbe26eb-3e22-4ab8-ba82-8662846d6b70",
            low: "e19affa6-18b2-40a9-b738-f38b593480da"

        },
        requestTypes: {
            default: 'e65a9b8c-8cf9-44d2-916e-95ef14b9720d'
        },
        requestStatuses: {
            onHold: "ea9543d2-07e3-48db-b363-52e1c6604c65",
            replacementIngredientTesting: "dac9e8ca-eb24-4422-b933-da161925e502",
            pricingRequested: "19eda7e9-32aa-4c02-a0c2-a1779fc43eab",
            allocatingIngredients: "fee82489-594c-4d33-9ca1-a37d01245c85",
            poPending: "9aaafb8f-5ce8-4fb6-9513-a3f9c8273580",
            poConfirmed: "40dcd39f-2292-4fce-9303-d2aea4c4d425",
            expectedDeliveryDate: "50e76032-a20f-43a2-976e-e1bfeabc6776",
            noEta: "128aa35a-e685-42f3-87b5-b2217d40bc1b",
            deliveredIssue: "c868b528-5075-4778-a820-1044da5c2af2",
            partialDelivery: "8ba665cb-c333-44b5-858f-6fc13fca6b43",
            requestCancelledDuplicateRequest: "97468cdd-cf95-4a3c-b740-3384176aadfa",
            discontinuedIngredient: "3ae592bf-acc8-43ad-be0b-3eba483d3545",
            replacementIngredientFound: "454eceee-9597-400e-8754-f12e64a64ff9",
            delivered: "45f46d11-af6c-43e6-b263-556a5bab3562",
            requested: "226db3a6-2756-4a5d-a6c5-b741339baeea"
        }
    },
    configs: {
        isProductionNotionEnabled: '1f782875-32aa-4804-b344-84221b4c391b',
    }
}
