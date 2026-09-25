// Una promesa rechazada que nadie atiende detiene el programa con código 1.
// Ejecuta: node 13-rechazo-sin-manejar.js
// @verificar falla
import { buscarTarea } from './modulos/tareas-promesas.js';

// Sin await, sin catch: nadie se entera del error... hasta que Node termina el programa.
buscarTarea(99);

setTimeout(() => console.log('Esta línea no se alcanza a ejecutar.'), 500);
