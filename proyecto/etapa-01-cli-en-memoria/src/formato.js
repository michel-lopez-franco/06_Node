// Cómo se ve cada tarea en la terminal.

/**
 * @param {{ id: number, titulo: string, prioridad: string, completada: boolean }} tarea
 * @returns {string} Por ejemplo: '[ ] #2 Leer el módulo 3 (alta)'.
 */
export function formatearTarea(tarea) {
  const casilla = tarea.completada ? '[x]' : '[ ]';
  return `${casilla} #${tarea.id} ${tarea.titulo} (${tarea.prioridad})`;
}

/**
 * @param {object[]} tareas
 * @returns {string} Una tarea por línea, o 'No hay tareas.' si la lista está vacía.
 */
export function formatearLista(tareas) {
  if (tareas.length === 0) {
    return 'No hay tareas.';
  }
  return tareas.map(formatearTarea).join('\n');
}
