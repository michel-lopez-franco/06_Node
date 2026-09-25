// Importa un archivo JSON como módulo. Ejecuta: node 06-leer-package-json.js
// `with { type: 'json' }` es obligatorio: le confirma a Node que es JSON y no código.
import paquete from './package.json' with { type: 'json' };

console.log(`${paquete.name} v${paquete.version}`);
console.log('Scripts disponibles:', Object.keys(paquete.scripts).join(', '));
