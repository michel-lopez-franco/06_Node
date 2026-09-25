/**
 * Una lista de tareas en memoria.
 * Cada tarea tiene la forma { id: number, titulo: string, completada: boolean }.
 */
export class ListaDeTareas {
  // Campos privados: solo los métodos de esta clase pueden leerlos o cambiarlos. Así nadie
  // puede hacer lista.tareas.push(...) y saltarse las validaciones de agregar().
  #tareas = [];
  #siguienteId = 1;

  /**
   * Agrega una tarea nueva.
   * @param {string} titulo
   * @returns {{ id: number, titulo: string, completada: boolean }} Una copia de la tarea creada.
   * @throws {Error} 'El título es obligatorio' si el título está vacío o no es texto.
   */
  agregar(titulo) {
    // Revisamos el tipo antes de llamar a trim(): 42.trim() lanzaría un TypeError confuso.
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('El título es obligatorio');
    }

    // Caso borde: validamos ANTES de tocar #siguienteId. Si incrementáramos primero, un título
    // inválido "gastaría" un id y la siguiente tarea saltaría del 1 al 2.
    const tarea = { id: this.#siguienteId, titulo: titulo.trim(), completada: false };
    this.#siguienteId++;
    this.#tareas.push(tarea);

    // Devolvemos una copia: si devolviéramos `tarea`, quien la reciba podría cambiar
    // tarea.completada y estaría modificando el objeto guardado en la lista.
    return { ...tarea };
  }

  /**
   * Marca una tarea como completada.
   * @param {number} id
   * @throws {Error} 'No existe la tarea con id <id>' si no la encuentra.
   */
  completar(id) {
    // find devuelve el primer elemento que cumple la condición, o undefined si ninguno.
    const tarea = this.#tareas.find((t) => t.id === id);
    if (tarea === undefined) {
      throw new Error(`No existe la tarea con id ${id}`);
    }
    // Aquí sí modificamos el objeto: es nuestro y vive dentro del campo privado.
    tarea.completada = true;
  }

  /**
   * @returns {{ id: number, titulo: string, completada: boolean }[]} Copias de las pendientes.
   */
  pendientes() {
    // filter crea un arreglo nuevo, pero con los MISMOS objetos. El map con spread crea una
    // copia de cada tarea para que cambiar una desde fuera no afecte a la lista.
    return this.#tareas.filter((tarea) => !tarea.completada).map((tarea) => ({ ...tarea }));
  }

  /** @returns {number} Cuántas tareas hay en total. */
  get total() {
    // Un getter se calcula cada vez que se lee. Así nunca queda desactualizado, como pasaría
    // con una propiedad `total` que tuviéramos que acordarnos de actualizar.
    return this.#tareas.length;
  }

  // Alternativa: una función fábrica con closures (crearListaDeTareas()) que devuelva un
  // objeto con estos métodos. También protege los datos; la clase es más común cuando hay
  // varios métodos y quieres usar instanceof.
}
