// Este módulo está en CommonJS. Conviértelo a ESM: import en lugar de require y export en
// lugar de module.exports. La lógica de las funciones ya está bien; no la cambies.
const { format } = require('node:util');

const LIMITE_TITULO = 30;

/**
 * Recorta un título largo para mostrarlo en una sola línea.
 * @param {string} titulo
 * @returns {string} El título tal cual, o recortado a LIMITE_TITULO caracteres terminando en '…'.
 */
function recortarTitulo(titulo) {
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
function resumir(tareas) {
  const completadas = tareas.filter((tarea) => tarea.completada).length;
  return format('%d de %d tareas completadas', completadas, tareas.length);
}

module.exports = { recortarTitulo, resumir };
module.exports.LIMITE_TITULO = LIMITE_TITULO;
