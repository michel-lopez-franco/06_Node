// Usar una API con callbacks al estilo error-first. Ejecuta: node 05-callbacks.js
import { buscarTarea } from './modulos/tareas-callback.js';

buscarTarea(1, (error, tarea) => {
  // Siempre revisa el error primero.
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('Encontrada:', tarea.titulo);
});

buscarTarea(99, (error, tarea) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('Encontrada:', tarea.titulo);
});

console.log('Buscando...');
