export const data = {
  modelName: 'bprStagingStatus',
  staticRecordName: null,
  staticRecordKeyName: null,
  seed: [
    {
      "name": "Not Started",
      "description": "Default state",
      "sequence": 0
    },
    {
      "name": "Secondary Verification",
      "description": "An addition person has verified that this material was pulled properly",
      "sequence": 3
    },
    {
      "name": "Verified",
      "description": "Someone else has checked that this material has been pulled properly",
      "sequence": 2
    },
    {
      "name": "Consumed",
      "description": "These materials have been consumed by this bpr bom",
      "sequence": 4
    },
    {
      "name": "Staged",
      "description": "Item has been staged/pulled",
      "sequence": 1
    }
  ],
};
