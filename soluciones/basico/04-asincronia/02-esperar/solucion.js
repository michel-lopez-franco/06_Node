/**
 * Devuelve una promesa que se cumple con `valor` después de `ms` milisegundos.
 * @param {number} ms
 * @param {unknown} [valor]
 * @returns {Promise<unknown>}
 */
export function esperar(ms, valor) {
  // La validación va DENTRO de la promesa. Si hiciéramos `throw` antes del return, quien
  // llame a esperar('100') recibiría un error inmediato en lugar de una promesa rechazada,
  // y un .catch() encadenado nunca lo vería. Una función que devuelve promesas debe
  // reportar todos sus errores del mismo modo: rechazando.
  return new Promise((resolve, reject) => {
    // typeof NaN es 'number', por eso revisamos NaN aparte (con !(ms >= 0) también sale,
    // porque NaN >= 0 es false, pero así se entiende mejor).
    if (typeof ms !== 'number' || Number.isNaN(ms) || ms < 0) {
      reject(new TypeError('ms debe ser un número mayor o igual a 0'));
      return; // sin este return, también se agendaría el setTimeout
    }
    // resolve se "presiona" cuando pasa el tiempo. setTimeout le pasa `valor` como argumento.
    setTimeout(resolve, ms, valor);
  });
}

// Alternativa: `export async function esperar(ms, valor)` con un `throw` para la validación.
// En una función async, un throw se convierte automáticamente en una promesa rechazada.
// Pero igual necesitarías `await new Promise(...)` para el setTimeout.
//
// En código real usa `setTimeout` de node:timers/promises, que ya hace esto.
