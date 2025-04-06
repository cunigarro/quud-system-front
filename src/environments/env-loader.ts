const dotenv = require('dotenv');
const fs = require('fs');

const env = dotenv.config().parsed || {};

const targetPath = './src/environments/environment.ts';

const fileContent = `
export const environment = {
  apiUrl: '${env['API_URL']}'
};
`;

fs.writeFileSync(targetPath, fileContent);
console.log('✅ environment.ts generado desde .env');
