export const data = {
  modelName: 'pricingExaminationStatus',
  staticRecordName: null,
  staticRecordKeyName: null,
  seed: [
    {
      "name": "Queued",
      "sequence": 0,
      "description": "Newly triggered pricing examination.",
      "bgColor": "#f8ad9d",
      "textColor": "#ffffff"
    },
    {
      "name": "Rejected",
      "sequence": 1,
      "description": "Re-queued examination due to rejection",
      "bgColor": "#e5989b",
      "textColor": "#ffffff"
    },
    {
      "name": "Pending Review",
      "sequence": 2,
      "description": "Requires approval.",
      "bgColor": "#b08968",
      "textColor": "#ffffff"
    },
    {
      "name": "Approved",
      "sequence": 3,
      "description": "Examination Completed",
      "bgColor": "#84a98c",
      "textColor": "#ffffff"
    }
  ]
}
