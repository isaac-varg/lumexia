## Usage

```
npm run init
```
```
```


## Explanation 

This script is required to seed required records into the database and create static records that are referenced throughout the application.

## Adding Data

Initialization for a new prisma model can be added by creating a file in the `/scrips/initialization/data/` directory. 

```javascript
// modelPluralName.ts

export const data = {
  modelName: 'string',
  staticRecordName: null,
  staticRecordKeyName: null,
  seed: [
    {}
      ]
}
```

Where:
- filename is the plural name of the model
  - e.g., inventoryTypes.ts
  - the filename is not that important 
- modelName is the name of the prisma client model ----------
  - e.g., for the model InventoryType this would be inventoryType
- staticRecordName is the name of the export that is called when using the records within the application
  - if omitted this defaults to the filename without the extension
- staitcRecordKeyName is the entry for that particular record
  - if omitted this defaults to camel case of the property 'name'
- seed is an array of create data for each record being initialized
```
```
