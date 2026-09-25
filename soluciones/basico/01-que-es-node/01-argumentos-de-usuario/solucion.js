/**
 * Devuelve los argumentos que escribió el usuario, sin la ruta de node ni la del script.
 * @param {string[]} argv Un arreglo con la forma de process.argv.
 * @returns {string[]} Por ejemplo, ['hola', '42'].
 */
export function obtenerArgumentos(argv) {
  // process.argv siempre trae dos elementos fijos al inicio: [0] es la ruta del ejecutable
  // de node y [1] la del script. slice(2) copia desde la posición 2 hasta el final.
  //
  // slice() devuelve un arreglo NUEVO y no toca el original. La alternativa splice(0, 2)
  // también "quita" los dos primeros, pero modifica el arreglo que recibiste: si alguien más
  // lo usa después (por ejemplo, process.argv), se llevaría una sorpresa.
  //
  // Si argv solo tiene dos elementos, slice(2) devuelve [] sin necesidad de un `if`.
  return argv.slice(2);
}
