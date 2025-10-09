export const data = {
  modelName: 'itemTypeConfig',
  staticRecordName: null,
  staticRecordKeyName: null,
  dependency: true,
  dependencies: ['itemTypes'],
  seed: (dependencies: any) => {
    const { itemTypes } = dependencies;
    return [
      {
        isPricingExaminationTriggerEnabled: false,
        itemTypeId: itemTypes.id,
      }
    ]
  },
};

