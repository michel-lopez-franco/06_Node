// Utilidades compartidas por los scripts del repositorio.
import { glob } from 'node:fs/promises';
import path from 'node:path';

export const RAIZ = path.resolve(import.meta.dirname, '..');

/** Devuelve rutas relativas a RAIZ que coinciden con el patrón, ordenadas. */
export async function buscar(patron, { cwd = RAIZ } = {}) {
  const encontrados = await Array.fromAsync(
    glob(patron, { cwd, exclude: (nombre) => nombre.includes('node_modules') }),
  );
  return encontrados.sort();
}

/** Carpetas (relativas a RAIZ) que contienen al menos un *.test.js dentro de `base`. */
export async function carpetasDeEjercicios(base = 'ejercicios') {
  const tests = await buscar(`${base}/**/*.test.js`);
  return [...new Set(tests.map((archivo) => path.dirname(archivo)))];
}

// Colores solo en terminal interactiva (no en CI ni al redirigir la salida).
const conColor = process.stdout.isTTY && !process.env.NO_COLOR;
const pintar = (codigo) => (texto) => (conColor ? `\x1b[${codigo}m${texto}\x1b[0m` : texto);

export const verde = pintar(32);
export const rojo = pintar(31);
export const gris = pintar(90);
