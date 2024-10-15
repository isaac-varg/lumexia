// this object is for record ids of imported ( or default) records that must be used in various areas of the application.
// e.g., produced procurement type should always be present in the application.
// i didn't want to hard code these in but since they are the same and essential, i didn't want to call the db every time we used them

export const staticRecords = {
  inventory: {
    producedProcurementId: '82aca833-c8e4-42c8-8488-a2bb15088f8e',
    uom: {
      lb: '68171f7f-3ac0-4a3a-b197-18742ebf6b5b'
    }
  },
  app: {
    recordStatuses: {
      active: 'd7b0a804-52c6-4586-b4f4-0fe49895f794'
    }
  },
  production: {
    bprStatuses: {
      draft: '7a9fd26f-3153-42f5-9de4-6776f59ec670',
      queued: '2a8332c8-87e4-4872-ac6a-7e184493ec44',
      compounding: 'a45875cd-bf1b-46d1-ae3e-09770b4e2b8a',
      stagingMaterials: 'c63e9eff-ee29-4987-b617-602edf1a486c',
    },
    bprBomStatuses: {
      notStarted: '3d5f8db4-3937-41e0-840b-da3c1ab682c5',
      staged: 'ee67bd6c-974e-407d-99d8-6482b77aabec',
      verified: '9a8f0c18-a035-424c-ba0f-d7635cf1fee8',
      secondaryVerification: '52311908-0abf-4fa8-92d9-0152cce93da7',
      consumed: 'ec7240b9-d2db-4447-9ad5-1b2ff0ba7885'
    },
    bprStepActionableStatuses: {
        notStarted: 'todo',
        compounded: 'todo',
        verify: 'todo',
        secondaryVerification: 'todo', // as if necessary
        completed: 'todo'
    }
  }
}
