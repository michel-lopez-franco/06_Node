// Una API asíncrona de mentira. No la edites.
// Cada tarea tarda distinto (entre 10 y 40 ms), así que terminan en otro orden que el pedido.
import { setTimeout as esperar } from 'node:timers/promises';

const TAREAS = new Map([
  [1, 'Leer'],
  [2, 'Correr'],
  [3, 'Programar'],
  [4, 'Cocinar'],
  [5, 'Dormir'],
]);

/** @returns {Promise<{ id: number, titulo: string }>} Se rechaza si la tarea no existe. */
export async function obtenerTarea(id) {
  await esperar(10 + (id % 4) * 10);
  if (!TAREAS.has(id)) {
    throw new Error(`No existe la tarea ${id}`);
  }
  return { id, titulo: TAREAS.get(id) };
}
