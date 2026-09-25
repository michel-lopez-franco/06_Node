import { obtenerTarea } from './api.js';

/**
 * Carga varias tareas en paralelo.
 * @param {number[]} ids
 * @returns {Promise<{ id: number, titulo: string }[]>} En el mismo orden que ids.
 */
export async function cargarTodas(ids) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}

/**
 * Carga varias tareas en paralelo sin fallar por las que no existan.
 * @param {number[]} ids
 * @returns {Promise<{ tareas: { id: number, titulo: string }[], errores: string[] }>}
 */
export async function cargarLasQueSePuedan(ids) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}
