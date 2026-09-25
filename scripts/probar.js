// Corre los tests de los ejercicios. Es el comando que usa el alumno.
//
//   npm test                                       -> todos los ejercicios
//   npm test -- ejercicios/basico/04-asincronia    -> solo esa carpeta
//   npm test -- ruta/al/archivo.test.js            -> solo ese archivo
import { spawnSync } from 'node:child_process';
import { buscar, RAIZ } from './comun.js';

const ruta = (process.argv[2] ?? 'ejercicios').replace(/\/+$/, '');
const archivos = ruta.endsWith('.test.js') ? [ruta] : await buscar(`${ruta}/**/*.test.js`);

if (archivos.length === 0) {
  console.log(`No encontré tests en "${ruta}".`);
  process.exit(ruta === 'ejercicios' ? 0 : 1);
}

const { status } = spawnSync(process.execPath, ['--test', ...archivos], {
  cwd: RAIZ,
  stdio: 'inherit',
});
process.exit(status ?? 1);
