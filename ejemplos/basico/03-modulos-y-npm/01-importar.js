// Importa de otro archivo del proyecto. Ejecuta: node 01-importar.js

// La exportación por defecto se importa sin llaves y con el nombre que tú quieras.
// Las exportaciones con nombre van entre llaves y con su nombre exacto.
import areaDeCirculo, { sumar, PI_APROX } from './modulos/matematicas.js';

// `as` renombra al importar (útil si ya tienes algo con ese nombre).
import { multiplicar as por } from './modulos/matematicas.js';

// `* as` junta todas las exportaciones en un solo objeto.
import * as matematicas from './modulos/matematicas.js';

// Los módulos de Node se importan igual, con el prefijo node:.
import { platform } from 'node:os';

console.log('1.', sumar(2, 3), PI_APROX);
console.log('2.', areaDeCirculo(2));
console.log('3.', por(4, 8));
console.log('4.', Object.keys(matematicas));
console.log('5. ¿redondear es privada?', matematicas.redondear === undefined);
console.log('6. sistema:', platform()); // darwin, linux o win32
