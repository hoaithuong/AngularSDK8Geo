const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
    production: false,
    apiUrl: 'https://localhost:4200',
    EXAMPLE_MAPBOX_ACCESS_TOKEN: '${process.env.EXAMPLE_MAPBOX_ACCESS_TOKEN}',
};
`;

console.log('The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);
fs.writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
   }
});
