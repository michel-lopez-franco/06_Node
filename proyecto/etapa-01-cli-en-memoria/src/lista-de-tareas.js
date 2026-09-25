// La lista de tareas: guarda las tareas y aplica sus reglas. No sabe nada de la terminal.

export const PRIORIDADES = ['baja', 'media', 'alta'];

/**
 * @typedef {{ id: number, titulo: string, prioridad: string, completada: boolean }} Tarea
 */

export class ListaDeTareas {
  #tareas = [];
  #siguienteId = 1;

  /**
   * Agrega una tarea nueva.
   * @param {string} titulo
   * @param {{ prioridad?: string }} [opciones]
   * @returns {Tarea} Una copia de la tarea creada.
   */
  agregar(titulo, { prioridad = 'media' } = {}) {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('El título es obligatorio');
    }
    if (!PRIORIDADES.includes(prioridad)) {
      throw new Error(`Prioridad inválida: "${prioridad}". Usa baja, media o alta`);
    }

    const tarea = { id: this.#siguienteId, titulo: titulo.trim(), prioridad, completada: false };
    this.#siguienteId++;
    this.#tareas.push(tarea);
    return { ...tarea };
  }

  /**
   * Marca una tarea como completada.
   * @param {number} id
   * @returns {Tarea} Una copia de la tarea ya completada.
   */
  completar(id) {
    const tarea = this.#buscar(id);
    tarea.completada = true;
    return { ...tarea };
  }

  /**
   * Elimina una tarea.
   * @param {number} id
   * @returns {Tarea} La tarea eliminada.
   */
  eliminar(id) {
    const tarea = this.#buscar(id);
    this.#tareas = this.#tareas.filter((t) => t !== tarea);
    return { ...tarea };
  }

  /** @returns {Tarea[]} Copias de todas las tareas, en el orden en que se agregaron. */
  todas() {
    return this.#tareas.map((tarea) => ({ ...tarea }));
  }

  /** @returns {Tarea[]} Copias de las tareas sin completar. */
  pendientes() {
    return this.todas().filter((tarea) => !tarea.completada);
  }

  /** @returns {number} Cuántas tareas hay en total. */
  get total() {
    return this.#tareas.length;
  }

  // Método privado: solo lo usan los métodos de la clase.
  #buscar(id) {
    const tarea = this.#tareas.find((t) => t.id === id);
    if (tarea === undefined) {
      throw new Error(`No existe la tarea con id ${id}`);
    }
    return tarea;
  }
}
