import { buscarLibro } from './api-vieja.js';

/**
 * Versión con promesa de buscarLibro.
 * @param {string} isbn
 * @returns {Promise<{ titulo: string, autor: string }>}
 */
export function buscarLibroPromesa(isbn) {
  // El patrón de siempre: dentro de new Promise llamamos a la API vieja y, en su callback,
  // decidimos qué botón presionar.
  return new Promise((resolve, reject) => {
    buscarLibro(isbn, (error, libro) => {
      if (error) {
        // Rechazamos con el mismo objeto de error: quien use la promesa conserva el mensaje,
        // el stack y cualquier propiedad extra (como error.code).
        reject(error);
      } else {
        resolve(libro);
      }
    });
  });
}

/**
 * Convierte una función error-first en una que devuelve una promesa.
 * @param {Function} fn Función cuyo último parámetro es un callback (error, resultado).
 * @returns {(...args: unknown[]) => Promise<unknown>}
 */
export function promisificar(fn) {
  // Devolvemos una función nueva. Con rest (...args) juntamos los argumentos que reciba,
  // sean cuantos sean, y con spread se los pasamos a fn seguidos del callback.
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (error, resultado) => {
        if (error) {
          reject(error);
        } else {
          resolve(resultado);
        }
      });
    });
  // Esta función "recuerda" fn gracias a un closure (módulo 2).
}

// Con promisificar, la primera función se podría escribir en una línea:
//   export const buscarLibroPromesa = promisificar(buscarLibro);
// En código real usa util.promisify, que además maneja casos especiales (funciones con
// varios resultados en el callback, como dns.lookup, o métodos que dependen de `this`).
