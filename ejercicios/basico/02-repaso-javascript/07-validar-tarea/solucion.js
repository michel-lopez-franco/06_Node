// Por ahora escribe solo dentro de la clase y de la función; `export` lo veremos en el módulo 3.

/**
 * Error que indica que un dato no es válido. Además de `message`, dice qué `campo` falló.
 */
export class ErrorDeValidacion extends Error {
  /**
   * @param {string} mensaje Por ejemplo, 'El título es obligatorio'.
   * @param {string} campo Por ejemplo, 'titulo'.
   */
  constructor(mensaje, campo) {
    throw new Error('Ejercicio sin resolver: completa este constructor');
  }
}

/**
 * Valida los datos de una tarea y devuelve una versión limpia.
 * @param {{ titulo?: unknown, prioridad?: unknown }} datos
 * @returns {{ titulo: string, prioridad: string }}
 * @throws {ErrorDeValidacion} Si el título o la prioridad no son válidos.
 */
export function validarTarea(datos) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}
