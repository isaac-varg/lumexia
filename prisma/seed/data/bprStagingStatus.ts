 const bprStagingStatuses = [
    {
      id: '3d5f8db4-3937-41e0-840b-da3c1ab682c5',
      name: 'Not Started',
      description: 'Default state'
    },
    {
      id: 'ee67bd6c-974e-407d-99d8-6482b77aabec',
      name: 'Staged',
      description: 'Item has been staged/pulled'
    },
    {
      id: '9a8f0c18-a035-424c-ba0f-d7635cf1fee8',
      name: 'Verified', 
      description: 'Someone else has checked that this material has been pulled properly'
    },
    {
      id: '52311908-0abf-4fa8-92d9-0152cce93da7',
      name: 'Secondary Verification',
      description: 'An addition person has verified that this material was pulled properly'
    },
    {
      id: 'ec7240b9-d2db-4447-9ad5-1b2ff0ba7885',
      name: 'Consumed',
      description: 'These materials have been consumed by this bpr bom'
    }
 ] 

 export default bprStagingStatuses
