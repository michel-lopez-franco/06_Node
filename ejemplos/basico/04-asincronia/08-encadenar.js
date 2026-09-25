// Encadenar promesas: lo que devuelve un then le llega al siguiente. Ejecuta: node 08-encadenar.js
import { buscarTarea, buscarUsuario } from './modulos/tareas-promesas.js';

// El mismo flujo que 06-callbacks-anidados.js, pero plano: un then por paso.
let tarea;
buscarTarea(1)
  .then((encontrada) => {
    tarea = encontrada;
    // Si un then devuelve una promesa, el siguiente then espera a que se cumpla.
    return buscarUsuario(tarea.usuarioId);
  })
  .then((usuario) => {
    console.log(`1. ${usuario.nombre} tiene: "${tarea.titulo}"`);
    return buscarTarea(99); // esta falla...
  })
  .then(() => {
    console.log('Esto no se ejecuta: la promesa anterior se rechazó');
  })
  // ...y un solo catch al final atrapa el error de cualquier paso anterior.
  .catch((error) => console.log('2. Error:', error.message));
