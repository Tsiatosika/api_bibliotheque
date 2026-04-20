const swaggerUi = require('swagger-ui-express');
const jsYaml    = require('js-yaml');
const fs        = require('fs');
const path      = require('path');

const file     = fs.readFileSync(path.join(__dirname, '../../openapi.yaml'), 'utf8');
const swaggerDoc = jsYaml.load(file);

module.exports = { swaggerUi, swaggerDoc };