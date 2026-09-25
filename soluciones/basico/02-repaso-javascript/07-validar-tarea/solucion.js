/**
 * Error que indica que un dato no es válido. Además de `message`, dice qué `campo` falló.
 */
export class ErrorDeValidacion extends Error {
  /**
   * @param {string} mensaje Por ejemplo, 'El título es obligatorio'.
   * @param {string} campo Por ejemplo, 'titulo'.
   */
  constructor(mensaje, campo) {
    // super(mensaje) llama al constructor de Error, que guarda `message` y arma el stack
    // trace. En una clase que extiende a otra, hay que llamarlo antes de usar `this`.
    super(mensaje);
    // Sin esta línea, name sería 'Error' y en la consola no se distinguiría de un error
    // cualquiera.
    this.name = 'ErrorDeValidacion';
    this.campo = campo;
  }
}

const PRIORIDADES = ['baja', 'normal', 'alta'];
const MAXIMO_TITULO = 100;

/**
 * Valida los datos de una tarea y devuelve una versión limpia.
 * @param {{ titulo?: unknown, prioridad?: unknown }} datos
 * @returns {{ titulo: string, prioridad: string }}
 * @throws {ErrorDeValidacion} Si el título o la prioridad no son válidos.
 */
export function validarTarea({ titulo, prioridad = 'normal' }) {
  // Desestructurar en el parámetro deja fuera cualquier propiedad extra (id, completada):
  // al final armamos el resultado solo con lo que validamos.

  // Revisamos el tipo primero: si titulo fuera 42, titulo.trim() lanzaría un TypeError en
  // lugar de nuestro error, que es más claro.
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    throw new ErrorDeValidacion('El título es obligatorio', 'titulo');
  }

  // Caso borde: medimos el título ya recortado. Un título de 100 letras con espacios en las
  // orillas es válido, porque lo que guardamos no lleva esos espacios.
  const tituloLimpio = titulo.trim();
  if (tituloLimpio.length > MAXIMO_TITULO) {
    throw new ErrorDeValidacion(
      `El título no puede pasar de ${MAXIMO_TITULO} caracteres`,
      'titulo',
    );
  }

  if (!PRIORIDADES.includes(prioridad)) {
    throw new ErrorDeValidacion('La prioridad debe ser baja, normal o alta', 'prioridad');
  }

  return { titulo: tituloLimpio, prioridad };

  // Por qué una clase de error propia y no un Error simple: quien llame a validarTarea puede
  // preguntar `error instanceof ErrorDeValidacion` y responder "dato inválido en <campo>",
  // mientras deja pasar cualquier otro error. En el módulo 9 una API usará esta idea para
  // responder 400 (petición inválida) en lugar de 500 (error del servidor).
}
