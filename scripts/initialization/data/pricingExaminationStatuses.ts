export const data = {
  modelName: 'pricingExaminationStatus',
  staticRecordName: null,
  staticRecordKeyName: null,
  seed: [
    {
      "name": "Queued",
      "sequence": 1,
      "description": "Newly triggered pricing examination.",
      "bgColor": "#f8ad9d",
      "textColor": "#ffffff"
    },
    {
      "name": "Rejected",
      "sequence": 2,
      "description": "Re-queued examination due to rejection",
      "bgColor": "#e5989b",
      "textColor": "#ffffff"
    },
    {
      "name": "Pending Review",
      "sequence": 0,
      "description": "Requires approval.",
      "bgColor": "#b08968",
      "textColor": "#ffffff"
    },
    {
      "name": "Approved",
      "sequence": 0,
      "description": "Examination Completed",
      "bgColor": "#84a98c",
      "textColor": "#ffffff"
    }
  ]
}
