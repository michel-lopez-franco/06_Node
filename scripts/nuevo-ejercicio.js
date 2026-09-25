// Crea la estructura de un ejercicio nuevo y su solución espejo.
//
//   npm run nuevo-ejercicio -- basico/04-asincronia/01-leer-con-promesas
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { RAIZ, verde } from './comun.js';

const ruta = process.argv[2];
const FORMATO = /^(basico|intermedio|pro)\/\d{2}-[a-z0-9-]+\/\d{2}-[a-z0-9-]+$/;

if (!ruta || !FORMATO.test(ruta)) {
  console.error('Uso: npm run nuevo-ejercicio -- <nivel>/<NN-modulo>/<NN-nombre>');
  console.error('Ejemplo: npm run nuevo-ejercicio -- basico/04-asincronia/01-leer-con-promesas');
  process.exit(1);
}

const stub = `/**
 * TODO: describe qué hace la función, qué recibe y qué devuelve.
 * @param {unknown} entrada
 * @returns {unknown}
 */
export function resolver(entrada) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}
`;

const solucion = `/**
 * TODO: solución de referencia.
 * @param {unknown} entrada
 * @returns {unknown}
 */
export function resolver(entrada) {
  return entrada;
}
`;

const pruebas = `import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { resolver } from './solucion.js';

describe('resolver', () => {
  test('TODO: describe el comportamiento esperado', () => {
    assert.equal(resolver(1), 1);
  });
});
`;

const enunciado = `# ${path
  .basename(ruta)
  .replace(/^\d{2}-/, '')
  .replaceAll('-', ' ')}

TODO: enunciado corto. El enunciado completo vive en la lección del sitio.

Edita \`solucion.js\` y comprueba tu avance con:

\`\`\`sh
npm test -- ejercicios/${ruta}
\`\`\`
`;

const archivos = {
  [`ejercicios/${ruta}/README.md`]: enunciado,
  [`ejercicios/${ruta}/solucion.js`]: stub,
  [`ejercicios/${ruta}/solucion.test.js`]: pruebas,
  [`soluciones/${ruta}/solucion.js`]: solucion,
};

for (const [relativa, contenido] of Object.entries(archivos)) {
  const destino = path.join(RAIZ, relativa);
  await mkdir(path.dirname(destino), { recursive: true });
  try {
    await writeFile(destino, contenido, { flag: 'wx' });
    console.log(`${verde('creado')} ${relativa}`);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    console.log(`ya existe ${relativa}`);
  }
}
