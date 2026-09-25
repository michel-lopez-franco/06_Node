// Por ahora escribe solo dentro de la clase; `export` lo veremos en el módulo 3.

/**
 * Una lista de tareas en memoria.
 * Cada tarea tiene la forma { id: number, titulo: string, completada: boolean }.
 */
export class ListaDeTareas {
  // Declara aquí tus campos privados, por ejemplo: #tareas = [];

  /**
   * Agrega una tarea nueva.
   * @param {string} titulo
   * @returns {{ id: number, titulo: string, completada: boolean }} Una copia de la tarea creada.
   * @throws {Error} 'El título es obligatorio' si el título está vacío o no es texto.
   */
  agregar(titulo) {
    throw new Error('Ejercicio sin resolver: completa este método');
  }

  /**
   * Marca una tarea como completada.
   * @param {number} id
   * @throws {Error} 'No existe la tarea con id <id>' si no la encuentra.
   */
  completar(id) {
    throw new Error('Ejercicio sin resolver: completa este método');
  }

  /**
   * @returns {{ id: number, titulo: string, completada: boolean }[]} Copias de las pendientes.
   */
  pendientes() {
    throw new Error('Ejercicio sin resolver: completa este método');
  }

  /** @returns {number} Cuántas tareas hay en total. */
  get total() {
    throw new Error('Ejercicio sin resolver: completa este getter');
  }
}
