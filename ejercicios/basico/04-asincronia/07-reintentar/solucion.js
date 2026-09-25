/**
 * Llama a fn hasta que funcione o se acaben los intentos.
 * @param {(intento: number) => Promise<unknown>} fn
 * @param {{ intentos?: number, esperaMs?: number }} [opciones]
 * @returns {Promise<unknown>} El valor del primer intento que funcione.
 */
export async function reintentar(fn, opciones) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}
