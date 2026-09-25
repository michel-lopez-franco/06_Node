// Verifica los ejercicios contra sus soluciones de referencia (lo usa CI).
//
// Para cada carpeta de ejercicios/ con tests:
//   1. Con la solución de soluciones/<misma ruta> copiada encima, los tests deben PASAR.
//   2. Con el stub sin resolver, los tests deben FALLAR (si pasan, no están probando nada).
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { carpetasDeEjercicios, gris, RAIZ, rojo, verde } from './comun.js';

function correrTests(cwd) {
  return spawnSync(process.execPath, ['--test'], { cwd, encoding: 'utf8' });
}

async function existe(ruta) {
  try {
    await stat(ruta);
    return true;
  } catch {
    return false;
  }
}

const carpetas = await carpetasDeEjercicios();
if (carpetas.length === 0) {
  console.log('No hay ejercicios todavía.');
  process.exit(0);
}

let errores = 0;
for (const carpeta of carpetas) {
  const relativa = path.relative('ejercicios', carpeta);
  const solucion = path.join(RAIZ, 'soluciones', relativa);

  if (!(await existe(solucion))) {
    console.log(`${rojo('✗')} ${carpeta} ${gris('— falta soluciones/' + relativa)}`);
    errores++;
    continue;
  }

  const temporal = await mkdtemp(path.join(tmpdir(), 'ejercicio-'));
  try {
    await cp(path.join(RAIZ, carpeta), temporal, { recursive: true });
    await cp(solucion, temporal, { recursive: true, force: true });

    const conSolucion = correrTests(temporal);
    const conStub = correrTests(path.join(RAIZ, carpeta));

    if (conSolucion.status !== 0) {
      console.log(`${rojo('✗')} ${carpeta} ${gris('— la solución no pasa los tests')}`);
      console.log(conSolucion.stdout, conSolucion.stderr);
      errores++;
    } else if (conStub.status === 0) {
      console.log(`${rojo('✗')} ${carpeta} ${gris('— el stub sin resolver pasa los tests')}`);
      errores++;
    } else {
      console.log(`${verde('✓')} ${carpeta}`);
    }
  } finally {
    await rm(temporal, { recursive: true, force: true });
  }
}

console.log(`\n${carpetas.length - errores}/${carpetas.length} ejercicios correctos.`);
process.exit(errores === 0 ? 0 : 1);
