// Cuando un paso depende del anterior, los callbacks se anidan. Ejecuta: node 06-callbacks-anidados.js
import { buscarTarea, buscarUsuario } from './modulos/tareas-callback.js';

// Busca la tarea 1, luego su usuario, luego la tarea 2... Cada paso va un nivel más adentro
// y cada nivel repite el manejo del error. A esto se le llama "callback hell".
buscarTarea(1, (error, tarea) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  buscarUsuario(tarea.usuarioId, (error, usuario) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    buscarTarea(2, (error, otra) => {
      if (error) {
        console.error('Error:', error.message);
        return;
      }
      console.log(`${usuario.nombre} tiene: "${tarea.titulo}" y "${otra.titulo}"`);
    });
  });
});
