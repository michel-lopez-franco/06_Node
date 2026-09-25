// La misma "base de datos" de mentira, ahora con funciones que devuelven promesas.
import { setTimeout as esperar } from 'node:timers/promises';

const TAREAS = [
  { id: 1, titulo: 'Leer el módulo 4', usuarioId: 1 },
  { id: 2, titulo: 'Resolver los ejercicios', usuarioId: 1 },
];
const USUARIOS = [{ id: 1, nombre: 'Ana' }];

export async function buscarTarea(id) {
  await esperar(50);
  const tarea = TAREAS.find((t) => t.id === id);
  if (tarea === undefined) {
    throw new Error(`No existe la tarea ${id}`);
  }
  return tarea;
}

export async function buscarUsuario(id) {
  await esperar(50);
  const usuario = USUARIOS.find((u) => u.id === id);
  if (usuario === undefined) {
    throw new Error(`No existe el usuario ${id}`);
  }
  return usuario;
}
