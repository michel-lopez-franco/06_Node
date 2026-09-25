/**
 * Convierte una tarea en una línea de texto: '[x] #1 Leer' o '[ ] #1 Leer'.
 * @param {{ id: number, titulo: string, completada: boolean }} tarea
 * @returns {string}
 */
// `export` delante de la declaración: exportación con nombre. Quien la importe tiene que
// usar exactamente este nombre, entre llaves: import { formatearTarea } from './solucion.js'.
export function formatearTarea(tarea) {
  const casilla = tarea.completada ? '[x]' : '[ ]';
  return `${casilla} #${tarea.id} ${tarea.titulo}`;
}

/**
 * Convierte una lista de tareas en texto, una tarea por línea.
 * @param {{ id: number, titulo: string, completada: boolean }[]} tareas
 * @returns {string} Las líneas unidas con '\n', o 'No hay tareas.' si la lista está vacía.
 */
// `export default`: la exportación principal del módulo. Quien la importe elige el nombre y
// no usa llaves: import formatearLista from './solucion.js'. Solo puede haber una por módulo.
export default function formatearLista(tareas) {
  // Caso borde: sin este if, [].join('\n') devolvería '' y el usuario vería una línea vacía.
  if (tareas.length === 0) {
    return 'No hay tareas.';
  }
  // Reutilizamos formatearTarea en lugar de repetir el formato: si mañana cambia, cambia en
  // un solo lugar. map(formatearTarea) funciona porque la función recibe una tarea.
  // join pone '\n' solo ENTRE elementos, así que no sobra un salto de línea al final.
  return tareas.map(formatearTarea).join('\n');
}

// Alternativa: declarar las funciones sin export y exportarlas todas juntas al final:
//   export { formatearTarea };
//   export default formatearLista;
// Es cuestión de gusto; al final del archivo ves de un vistazo todo lo que el módulo ofrece.
