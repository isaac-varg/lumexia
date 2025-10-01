// this object is for record ids of imported ( or default) records that must be used in various areas of the application.
// e.g., produced procurement type should always be present in the application.
// i didn't want to hard code these in but since they are the same and essential, i didn't want to call the db every time we used them

export const staticRecords = {
  production: {
    bprStepActionableTypes: {
      completeStep: '48505c39-a0bd-4d9d-9c2e-241bb3cba10c'
    },
    bprNotes: {
      types: {
        default: '87b50042-fbc0-415c-8afc-a61b80b37859'
      }
    },
    stepAddendaTypes: {
      warning: '05a7f359-cb54-446e-bcfd-af32d91088f9',
      info: 'f03b6354-eb25-4742-990a-92feb8a3971c'
    }
  },
  purchasing: {
    poStatuses: {
      confirmedSlashAwaitingDelivery: 'd1c6bb97-a554-49b5-9a6a-0261405dc2cc',
      partiallyReceived: '8b319770-6317-4cca-8a15-99df248dc603',
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
    // ugh, this is supposed to be request note types :facepalm:
    requestTypes: {
      default: 'e65a9b8c-8cf9-44d2-916e-95ef14b9720d',
      automated: 'bdf7c7b0-3524-4f2c-a43b-b9a6c8c77322'

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
    },
    generalRequests: {
      statuses: {
        draft: 'ac412826-a79f-439c-9558-196c910a638b',
        requested: '226db3a6-2756-4a5d-a6c5-b741339baeea',
        linked: 'ebd4b314-8596-4ac9-b114-c6a29ab49644',
        rejected: 'f9229772-62e8-45e7-b7dd-dd42a6a7b751',

      }
    }
  },
  configs: {
    isProductionNotionEnabled: '1f782875-32aa-4804-b344-84221b4c391b',
  },
  pricing: {
    notes: {
      noteTypes: {
        default: '030a218c-50fd-419f-8b4b-b3302d91b7f8'
      }
    }
  },
  quality: {
    dataTypes: {
      text: '0862072f-1e53-4272-a16b-9a2d861d61b4',
      boolean: '9ef83856-80d9-473d-8cd4-4cbe83e4d7c6',
    },
    examinations: {
      types: {
        inProcess: 'a158361e-ccc2-4ad7-ac46-b1d854a86bac'
      }
    },
    recordNotes: {
      types: {
        default: 'e2ca11e7-1d89-4773-a0e5-71c895760925'
      }
    },
    recordFiles: {
      types: {
        default: 'dd781a7a-e8c5-4808-a316-e94f881b31d9'
      },
    },
    records: {
      statuses: {
        open: 'bfe0a4fb-80b5-4eb4-9c73-5ddfd730af80',
        pass: 'a09bd94d-f6db-465f-8bc7-7b99111e9b40',
        oos: '0b02109c-dadb-42b6-888b-247b8b0a5d68',
      }
    }
  },
  accounting: {
    pos: {
      statuses: {
        default: '846f1580-06a9-4de3-956b-989933d947e6'
      }
    },
    notes: {
      types: {
        default: '7bc51425-a1f7-41d3-922d-fbb836c00340'
      }
    }
  }
}
