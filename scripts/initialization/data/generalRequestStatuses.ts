export const data = {
  modelName: 'generalRequestStatus',
  staticRecordName: null,
  staticRecordKeyName: null,
  seed: [
    {
      "name": "Requested",
      "bgColor": "#D1D5DC",
      "textColor": "#333333",
      "description": "A user has made a request for this item to be purchased",
      "sequence": 1
    },
    {
      "name": "Draft / Temp",
      "bgColor": "#333333",
      "textColor": "#ffffff",
      "description": "Being actively created or abandoned.",
      "sequence": 0
    },
    {
      "name": "Linked / Completed",
      "bgColor": "#333333",
      "textColor": "#ffffff",
      "description": "this is completed",
      "sequence": 3
    },
    {
      "name": "Duplicate / Rejected",
      "bgColor": "#333333",
      "textColor": "#ffffff",
      "description": "this was denied",
      "sequence": 2
    }
  ]
};
