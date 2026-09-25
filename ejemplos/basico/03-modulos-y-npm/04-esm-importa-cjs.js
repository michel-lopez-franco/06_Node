// Un módulo ESM puede importar uno CommonJS. Ejecuta: node 04-esm-importa-cjs.js

// module.exports llega como la exportación por defecto...
import saludos from './modulos/saludos.cjs';
// ...y Node también detecta sus propiedades como exportaciones con nombre.
import { despedir } from './modulos/saludos.cjs';

console.log('1.', saludos.saludar('Ana'));
console.log('2.', despedir('Ana'));
