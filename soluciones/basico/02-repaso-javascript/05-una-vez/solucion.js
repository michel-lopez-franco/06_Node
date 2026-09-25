/**
 * Envuelve una función para que solo se ejecute la primera vez.
 * @param {Function} fn La función a envolver.
 * @returns {Function} Una función que llama a fn una sola vez y después repite su resultado.
 */
export function unaVez(fn) {
  // Dos variables que la función devuelta recuerda (closure). Cada llamada a unaVez crea las
  // suyas, así que dos funciones envueltas no se estorban.
  let yaSeLlamo = false;
  let resultado;

  // Con rest (...args) juntamos todos los argumentos, sean cuantos sean, y con spread
  // (...args) se los pasamos a fn tal como llegaron.
  return (...args) => {
    // Caso borde: usamos una bandera aparte en lugar de preguntar `if (resultado)` o
    // `if (resultado === undefined)`. Si fn devuelve undefined, 0 o false, esas preguntas
    // dirían "todavía no se llama" y fn se ejecutaría otra vez.
    if (!yaSeLlamo) {
      resultado = fn(...args);
      yaSeLlamo = true;
    }
    return resultado;
  };

  // Para qué sirve: inicializar algo costoso (leer la configuración, abrir una conexión) solo
  // cuando se necesita por primera vez, sin importar cuántas partes del programa lo pidan.
}
