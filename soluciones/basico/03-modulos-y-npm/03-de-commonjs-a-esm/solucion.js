// require('node:util') + desestructuración se convierte en un import con llaves.
// Diferencia importante: require() se puede llamar en cualquier lugar (incluso dentro de un
// if), mientras que import va en el nivel superior del archivo. Node lee todos los import
// ANTES de ejecutar el código; por eso detecta al arrancar si falta una exportación.
import { format } from 'node:util';

// module.exports.LIMITE_TITULO = ... se convierte en `export` delante de la declaración.
export const LIMITE_TITULO = 30;

/**
 * Recorta un título largo para mostrarlo en una sola línea.
 * @param {string} titulo
 * @returns {string} El título tal cual, o recortado a LIMITE_TITULO caracteres terminando en '…'.
 */
export function recortarTitulo(titulo) {
  if (titulo.length <= LIMITE_TITULO) {
    return titulo;
  }
  return titulo.slice(0, LIMITE_TITULO - 1) + '…';
}

/**
 * Resume cuántas tareas están completadas.
 * @param {{ completada: boolean }[]} tareas
 * @returns {string} Por ejemplo, '2 de 5 tareas completadas'.
 */
export function resumir(tareas) {
  const completadas = tareas.filter((tarea) => tarea.completada).length;
  return format('%d de %d tareas completadas', completadas, tareas.length);
}

// Una trampa común: traducir `module.exports = { recortarTitulo, resumir }` como
//   export default { recortarTitulo, resumir };
// Eso exporta UN objeto por defecto, no exportaciones con nombre, y entonces
// `import { resumir } from './solucion.js'` falla con "does not provide an export named".
//
// Alternativa válida: dejar las declaraciones sin export y al final escribir
//   export { LIMITE_TITULO, recortarTitulo, resumir };
// que se parece más al module.exports original.
