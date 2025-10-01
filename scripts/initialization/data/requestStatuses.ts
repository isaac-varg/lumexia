export const data = {
  modelName: 'requestStatus',
  staticRecordName: null,
  staticRecordKeyName: null,
  seed: [
    {
      "name": "No ETA",
      "description": "No eta from supplier or delivery missed eta",
      "sequence": 8,
      "bgColor": "#FF6467",
      "textColor": "#333333"
    },
    {
      "name": "Pricing Requested",
      "description": "Waiting for supplier give us current price",
      "sequence": 3,
      "bgColor": "#FFE4E6",
      "textColor": "#333333"
    },
    {
      "name": "Requested",
      "description": "A user has made a request for this item to be purchased",
      "sequence": 0,
      "bgColor": "#D1D5DC",
      "textColor": "#333333"
    },
    {
      "name": "Discontinued Ingredient",
      "description": "Request made but this item was discontinued for us or the supplier",
      "sequence": 12,
      "bgColor": "#FF6467",
      "textColor": "#333333"
    },
    {
      "name": "PO Confirmed",
      "description": "Confirmed from supplier but no ETA",
      "sequence": 6,
      "bgColor": "#ECFCCA",
      "textColor": "#333333"
    },
    {
      "name": "Replacement Ingredient Found",
      "description": "Replacement ingredient tested and confirmed.",
      "sequence": 13,
      "bgColor": "#B9F8CF",
      "textColor": "#333333"
    },
    {
      "name": "Delivered",
      "description": "Material is here and ready to use",
      "sequence": 14,
      "bgColor": "#B9F8CF",
      "textColor": "#333333"
    },
    {
      "name": "Expected Delivery Date",
      "description": "We have an ETA",
      "sequence": 7,
      "bgColor": "#DDD6FF",
      "textColor": "#333333"
    },
    {
      "name": "Partial Delivery",
      "description": "Not all of the material arrived",
      "sequence": 10,
      "bgColor": "#FEF3C6",
      "textColor": "#333333"
    },
    {
      "name": "Request Cancelled - Duplicate Request",
      "description": "Already an active request or don''t need",
      "sequence": 11,
      "bgColor": "#FFA2A2",
      "textColor": "#333333"
    },
    {
      "name": "PO Pending",
      "description": "Awaiting for supplier to respond to po",
      "sequence": 5,
      "bgColor": "#FEF3C6",
      "textColor": "#333333"
    },
    {
      "name": "Delivered - Issue",
      "description": "PO Delivered but there is an issue with the delivery that must be resolved",
      "sequence": 9,
      "bgColor": "#FEF3C6",
      "textColor": "#333333"
    },
    {
      "name": "Replacement Ingredient Testing",
      "description": "For some reason we need to replace ingredient",
      "sequence": 2,
      "bgColor": "#DBEAFE",
      "textColor": "#333333"
    },
    {
      "name": "On Hold",
      "description": "Some thing is happening that purchaser has to wait.",
      "sequence": 1,
      "bgColor": "#DBEAFE",
      "textColor": "#333333"
    },
    {
      "name": "Allocating Ingredients",
      "description": "Waiting to fill up a PO with other materials",
      "sequence": 4,
      "bgColor": "#FEF3C6",
      "textColor": "#333333"
    }
  ]
};
