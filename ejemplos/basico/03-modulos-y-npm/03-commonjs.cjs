// CommonJS: el sistema de módulos original de Node. Ejecuta: node 03-commonjs.cjs
// require() es una función normal: carga el archivo y devuelve su module.exports.
const { saludar, despedir } = require('./modulos/saludos.cjs');
const os = require('node:os');

console.log('1.', saludar('Ana'));
console.log('2.', despedir('Luis'));
console.log('3.', typeof os.platform());

// En CommonJS existen __filename y __dirname (en ESM no; ahí se usa import.meta).
console.log('4.', typeof __dirname, typeof require, typeof module);
