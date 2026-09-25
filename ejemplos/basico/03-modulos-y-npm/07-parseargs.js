// Lee opciones de la terminal con util.parseArgs.
//   node 07-parseargs.js agregar Leer --prioridad alta --urgente
//   node 07-parseargs.js agregar Leer -p baja
// @verificar args: agregar Leer --prioridad alta --urgente
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  // Permite argumentos sin guiones, como "agregar" y "Leer".
  allowPositionals: true,
  options: {
    // Una opción con valor: --prioridad alta, --prioridad=alta o -p alta.
    prioridad: { type: 'string', short: 'p', default: 'media' },
    // Una bandera: está (true) o no está (false).
    urgente: { type: 'boolean', default: false },
  },
});

console.log('values:', values);
console.log('positionals:', positionals);
