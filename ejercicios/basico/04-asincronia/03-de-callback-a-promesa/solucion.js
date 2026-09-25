import { buscarLibro } from './api-vieja.js';

/**
 * Versión con promesa de buscarLibro.
 * @param {string} isbn
 * @returns {Promise<{ titulo: string, autor: string }>}
 */
export function buscarLibroPromesa(isbn) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}

/**
 * Convierte una función error-first en una que devuelve una promesa.
 * @param {Function} fn Función cuyo último parámetro es un callback (error, resultado).
 * @returns {(...args: unknown[]) => Promise<unknown>}
 */
export function promisificar(fn) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}
