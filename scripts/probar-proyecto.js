// Corre los tests de cada etapa del proyecto (lo usa CI).
//
// Cada etapa es un paquete independiente en proyecto/etapa-NN-nombre/ con su propio
// package.json; aquí ejecutamos su `npm test` y exigimos que pase.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { buscar, gris, RAIZ, rojo, verde } from './comun.js';

const etapas = (await buscar('proyecto/etapa-*/package.json')).map((archivo) =>
  path.dirname(archivo),
);

if (etapas.length === 0) {
  console.log('No hay etapas del proyecto todavía.');
  process.exit(0);
}

let errores = 0;
for (const etapa of etapas) {
  const resultado = spawnSync('npm', ['test'], {
    cwd: path.join(RAIZ, etapa),
    encoding: 'utf8',
    shell: process.platform === 'win32',
    env: { ...process.env, NO_COLOR: '1' },
  });

  if (resultado.status === 0) {
    console.log(`${verde('✓')} ${etapa}`);
  } else {
    console.log(`${rojo('✗')} ${etapa} ${gris(`— código ${resultado.status}`)}`);
    console.log(resultado.stdout, resultado.stderr);
    errores++;
  }
}

console.log(`\n${etapas.length - errores}/${etapas.length} etapas con tests en verde.`);
process.exit(errores === 0 ? 0 : 1);
