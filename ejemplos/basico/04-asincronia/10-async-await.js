// async/await: código asíncrono que se lee como síncrono. Ejecuta: node 10-async-await.js
import { buscarTarea, buscarUsuario } from './modulos/tareas-promesas.js';

// Una función async siempre devuelve una promesa. Dentro, await pausa ESTA función (no el
// programa) hasta que la promesa se cumpla, y entrega su valor.
async function describirTarea(id) {
  const tarea = await buscarTarea(id);
  const usuario = await buscarUsuario(tarea.usuarioId);
  return `${usuario.nombre} tiene: "${tarea.titulo}"`;
}

// Los errores se atrapan con try/catch, como en el código síncrono.
async function describirConCuidado(id) {
  try {
    return await describirTarea(id);
  } catch (error) {
    return `No se pudo: ${error.message}`;
  }
}

// En un módulo ESM puedes usar await en el nivel superior, fuera de cualquier función.
console.log('1.', await describirTarea(1));
console.log('2.', await describirConCuidado(99));
console.log('3.', describirTarea(2)); // sin await: una promesa pendiente
