import fs from 'fs';
import path from 'path';

const fileName = process.argv[2];

// ensure argument passed
if (!fileName) {
  console.error('❌ Error: Please provide a name for the data file.');
  console.log('ℹ️ Usage: npm run init <FileName>');
  process.exit(1);
}

// define file content
const fileContent = `export const data = {
  modelName: '${fileName}',
  staticRecordName: null,
  staticRecordKeyName: null,
  seed: [],
};
`

// define output stuff
const outputDir = path.join(__dirname, '..', 'data');
const outputPath = path.join(outputDir, `${fileName}.ts`);

// checks to ensure data directory exists and file dne
fs.mkdirSync(outputDir, { recursive: true });
if (fs.existsSync(outputPath)) {
  console.error(`❌ Error: File already exists at ${outputPath}`);
  process.exit(1);
}


// if all good make the file
fs.writeFileSync(outputPath, fileContent);


console.log(`✅ Successfully created file: ${outputPath}`);



