// this object is for record ids of imported ( or default) records that must be used in various areas of the application.
// e.g., produced procurement type should always be present in the application.
// i didn't want to hard code these in but since they are the same and essential, i didn't want to call the db every time we used them

export const staticRecords = {
  inventory: {
    producedProcurementId: '82aca833-c8e4-42c8-8488-a2bb15088f8e' 
  }
}
