// Una API asíncrona de mentira. No la edites.
import { setTimeout as esperar } from 'node:timers/promises';

const USUARIOS = [
  { id: 1, nombre: 'Ana' },
  { id: 2, nombre: 'Luis' },
];

const TAREAS = [
  { id: 1, usuarioId: 1, titulo: 'Leer', completada: true },
  { id: 2, usuarioId: 1, titulo: 'Correr', completada: false },
  { id: 3, usuarioId: 1, titulo: 'Programar', completada: false },
];

/** @returns {Promise<{ id: number, nombre: string }>} Se rechaza si el usuario no existe. */
export async function obtenerUsuario(id) {
  await esperar(5);
  const usuario = USUARIOS.find((u) => u.id === id);
  if (usuario === undefined) {
    throw new Error(`No existe el usuario ${id}`);
  }
  return { ...usuario };
}

/** @returns {Promise<{ id: number, usuarioId: number, titulo: string, completada: boolean }[]>} */
export async function obtenerTareas(usuarioId) {
  await esperar(5);
  return TAREAS.filter((t) => t.usuarioId === usuarioId).map((t) => ({ ...t }));
}
