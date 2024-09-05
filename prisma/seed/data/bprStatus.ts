const bprStatuses = [
  {
    id: '7a9fd26f-3153-42f5-9de4-6776f59ec670',
    name: 'Draft',
    description: 'Batches that have been requested, anticipated or generally needed but have not begun to be allocated.',
    sequence: 0
  },
  {
    id: '13b7b0dd-bd1b-4b23-a1c1-64f17f193eae',
    name: 'Allocating',
    description: 'Material availablility is being investigated and material stock being allocated to this batch.',
    sequence: 1
  },
  {
    id: 'b1701ec8-b094-4528-bb88-e70aedcc2909',
    name: 'Verifying BOM Requirements',
    description: 'The availablility of materials to fulfill this batch is being questioned. An inventory audit of one or more materials is likely.',
    sequence: 2
  },
  {
    id: '2a8332c8-87e4-4872-ac6a-7e184493ec44',
    name: 'Queued',
    description: 'In batch schedule',
    sequence: 5
  },
  {
    id: 'a45875cd-bf1b-46d1-ae3e-09770b4e2b8a',
    name: 'In Progress',
    description: 'Actively being worked on',
    sequence: 6
  },
  {
    id: 'cfb2102c-43a9-4e3a-8490-40ec9eb22930',
    name: 'Blocked By Material',
    description: 'The stock of a matarial is preventing this batch from progressing',
    sequence: 3
  },
  {
    id: '5fec6206-ce94-402e-ad34-9efe1b615cfc',
    name: 'Known Material Arrival',
    description: 'This batch is blocked by a material but the material has a known arrival date.',
    sequence: 4
  },
  {
    id: '30ad195c-1e63-4101-839f-4be663548c19',
    name: 'Completed',
    description: 'The production of this base if completed (physically)',
    sequence: 7
  },
  {
    id: '79591355-7e7f-4598-ab6c-612bce05526b',
    name: 'Awaiting QC',
    description: 'Waiting for Micro and in house QC to be conducted',
    sequence: 8
  },
  {
    id: 'c1736d86-1377-4d5c-bd3b-607fdbaa5b49',
    name: 'Awaiting Pricing Revision',
    description: 'Ensuring pricing does not need to change due the many factors affecting raw materials and production',
    sequence: 9
  },
  {
    id: '0ec79764-cc04-41b8-a3d6-c91e71a2f159',
    name: 'Released',
    description: 'Released to Public',
    sequence: 12
  },
  {
    id: '1aecf3b0-723a-43c9-b46f-907417602210',
    name: 'Investigating / Corrective Actions',
    description: 'Something has gone wrong with this batch and it is being investigated and corrective actions are being taken',
    sequence: 10
  },
  {
    id: '7f2d60ff-ecea-415e-8ed3-e868002354ed',
    name: 'Failed',
    description: 'Corrective actions could not save this batch and it was scraped as a failure.',
    sequence: 11
  }
]

export default bprStatuses
