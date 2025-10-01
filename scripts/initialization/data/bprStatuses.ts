export const data = {
  modelName: 'bprStatus',
  staticRecordName: null,
  staticRecordKeyName: null,
  seed: [
    {
      "name": "Released",
      "description": "Released to Public",
      "sequence": 10,
      "bgColor": "#E3E9DD",
      "textColor": "#333333"
    },
    {
      "name": "Allocating Materials",
      "description": "Material availablility is being investigated and material stock being allocated to this batch.",
      "sequence": 1,
      "bgColor": "#F7DDD9",
      "textColor": "#333333"
    },
    {
      "name": "Investigating / Corrective Actions",
      "description": "Something has gone wrong with this batch and it is being investigated and corrective actions are being taken",
      "sequence": 11,
      "bgColor": "#FCD5CE",
      "textColor": "#333333"
    },
    {
      "name": "Queued",
      "description": "In batch schedule",
      "sequence": 5,
      "bgColor": "#C8C7D6",
      "textColor": "#333333"
    },
    {
      "name": "Completed",
      "description": "The production of this base if completed (physically)",
      "sequence": 8,
      "bgColor": "#E3E9DD",
      "textColor": "#333333"
    },
    {
      "name": "Known Material Arrival",
      "description": "This batch is blocked by a material but the material has a known arrival date.",
      "sequence": 4,
      "bgColor": "#C8C7D6",
      "textColor": "#333333"
    },
    {
      "name": "Awaiting QC",
      "description": "Waiting for Micro and in house QC to be conducted",
      "sequence": 9,
      "bgColor": "#C8C7D6",
      "textColor": "#333333"
    },
    {
      "name": "Draft",
      "description": "Batches that have been requested, anticipated or generally needed but have not begun to be allocated.",
      "sequence": 0,
      "bgColor": "#F8EAEC",
      "textColor": "#333333"
    },
    {
      "name": "Failed",
      "description": "Corrective actions could not save this batch and it was scraped as a failure.",
      "sequence": 12,
      "bgColor": "#FEC5BB",
      "textColor": "#333333"
    },
    {
      "name": "Compounding",
      "description": "Actively being worked on",
      "sequence": 7,
      "bgColor": "#D8E2DC",
      "textColor": "#333333"
    },
    {
      "name": "Verifying BOM Fulfillment",
      "description": "The availablility of materials to fulfill this batch is being questioned. An inventory audit of one or more materials is likely.",
      "sequence": 2,
      "bgColor": "#FFD7BA",
      "textColor": "#333333"
    },
    {
      "name": "Staging Materials",
      "description": "In batch schedule",
      "sequence": 6,
      "bgColor": "#D4E5E3",
      "textColor": "#333333"
    },
    {
      "name": "Awaiting Materials",
      "description": "The stock of a matarial is preventing this batch from progressing",
      "sequence": 3,
      "bgColor": "#FCD5CE",
      "textColor": "#333333"
    }
  ],
};
