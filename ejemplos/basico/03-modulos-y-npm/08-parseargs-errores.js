// parseArgs lanza un error si recibe una opción que no conoce o una opción sin su valor.
// Ejecuta: node 08-parseargs-errores.js
import { parseArgs } from 'node:util';

const options = { prioridad: { type: 'string', short: 'p' } };

const pruebas = [
  ['agregar', 'Leer', '--color', 'rojo'], // --color no está en options
  ['agregar', 'Leer', '--prioridad'], // falta el valor
  ['agregar', 'Leer', '--', '--no-es-opcion'], // después de -- todo es posicional
];

for (const args of pruebas) {
  try {
    const { positionals } = parseArgs({ args, options, allowPositionals: true });
    console.log('ok      ', positionals);
  } catch (error) {
    // El mensaje viene en inglés; el código sirve para distinguir el caso.
    console.log('error   ', error.code);
  }
}
