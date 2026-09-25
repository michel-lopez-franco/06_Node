// Ejecuta cada ejemplo de ejemplos/ y falla si alguno termina con error.
//
// Comentarios especiales dentro de un ejemplo:
//   // @verificar omitir          -> no se ejecuta (p. ej. servidores que no terminan)
//   // @verificar args: a b c     -> argumentos de línea de comandos
//   // @verificar falla           -> se espera que termine con código distinto de 0
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { buscar, gris, RAIZ, rojo, verde } from './comun.js';

const LIMITE_MS = 10_000;

const ejemplos = await buscar('ejemplos/**/*.{js,mjs}');
if (ejemplos.length === 0) {
  console.log('No hay ejemplos todavía.');
  process.exit(0);
}

let errores = 0;
let omitidos = 0;
for (const ejemplo of ejemplos) {
  const codigo = await readFile(path.join(RAIZ, ejemplo), 'utf8');

  if (codigo.includes('@verificar omitir')) {
    console.log(`${gris('-')} ${ejemplo} ${gris('(omitido)')}`);
    omitidos++;
    continue;
  }

  const args =
    codigo
      .match(/@verificar args:(.*)$/m)?.[1]
      .trim()
      .split(/\s+/) ?? [];
  const esperaFallo = codigo.includes('@verificar falla');

  const resultado = spawnSync(process.execPath, [path.basename(ejemplo), ...args], {
    cwd: path.join(RAIZ, path.dirname(ejemplo)),
    encoding: 'utf8',
    timeout: LIMITE_MS,
    env: { ...process.env, NO_COLOR: '1' },
  });

  const fallo = resultado.status !== 0;
  if (resultado.error || fallo !== esperaFallo) {
    const motivo =
      resultado.error?.code === 'ETIMEDOUT' ? 'tardó más de 10 s' : `código ${resultado.status}`;
    console.log(`${rojo('✗')} ${ejemplo} ${gris(`— ${motivo}`)}`);
    console.log(resultado.stderr);
    errores++;
  } else {
    console.log(`${verde('✓')} ${ejemplo}`);
  }
}

console.log(
  `\n${ejemplos.length - errores - omitidos} correctos, ${omitidos} omitidos, ${errores} con error.`,
);
process.exit(errores === 0 ? 0 : 1);
