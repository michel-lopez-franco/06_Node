/**
 * Marca como completada una tarea sin modificar el arreglo original.
 * @param {{ id: number, titulo: string, completada: boolean }[]} tareas
 * @param {number} id El id de la tarea a completar.
 * @returns {{ id: number, titulo: string, completada: boolean }[]} Un arreglo nuevo.
 */
export function marcarCompletada(tareas, id) {
  // map siempre crea un arreglo nuevo del mismo tamaño y en el mismo orden, así que el
  // original no se toca. Si ningún id coincide, el resultado es una copia con las mismas
  // tareas, que es justo lo que pide el enunciado.
  return tareas.map((tarea) => {
    if (tarea.id !== id) {
      // Las tareas que no cambian se pueden reutilizar tal cual: nadie las modifica.
      return tarea;
    }
    // La que cambia es un objeto nuevo: copiamos sus propiedades con spread y
    // sobrescribimos completada. Hacer `tarea.completada = true` modificaría el objeto
    // original, que también está en el arreglo de quien nos llamó.
    return { ...tarea, completada: true };
  });

  // Alternativa: structuredClone(tareas) y luego modificar la copia. Funciona, pero copia
  // todas las tareas aunque solo cambie una; con map solo creamos el objeto que cambia.
}
