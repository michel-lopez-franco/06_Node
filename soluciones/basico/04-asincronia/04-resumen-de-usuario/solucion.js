import { obtenerTareas, obtenerUsuario } from './api.js';

/**
 * Resume las tareas de un usuario.
 * @param {number} id
 * @returns {Promise<{ nombre: string, total: number, pendientes: number }>}
 */
export async function resumenDeUsuario(id) {
  let usuario;
  try {
    // `await` dentro del try: si la promesa se rechaza, el error se lanza AQUÍ y el catch lo
    // atrapa. Sin await, la promesa rechazada escaparía del try.
    usuario = await obtenerUsuario(id);
  } catch (error) {
    // Envolvemos el error con un mensaje que explica qué intentábamos hacer, y guardamos el
    // original en cause para no perder el detalle.
    throw new Error(`No se pudo cargar el resumen del usuario ${id}`, { cause: error });
  }

  // Las tareas dependen del usuario (necesitamos su id), así que van después, en secuencia.
  // Además, si el usuario no existe, ni siquiera pedimos sus tareas.
  const tareas = await obtenerTareas(usuario.id);
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;

  // En una función async, `return` cumple la promesa con este valor.
  return { nombre: usuario.nombre, total: tareas.length, pendientes };
}

// Alternativa: como obtenerTareas solo necesita el id, que ya tenemos, se podrían pedir las
// dos cosas en paralelo con Promise.all([obtenerUsuario(id), obtenerTareas(id)]). Sería más
// rápido, pero pediríamos las tareas aunque el usuario no existiera. Las dos son válidas.
