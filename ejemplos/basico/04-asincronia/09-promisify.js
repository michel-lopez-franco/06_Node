// Convertir APIs de callbacks en promesas. Ejecuta: node 09-promisify.js
import { promisify } from 'node:util';
import { setTimeout as esperar } from 'node:timers/promises';
import { buscarTarea } from './modulos/tareas-callback.js';

// promisify envuelve una función error-first y devuelve una versión que regresa una promesa.
const buscarTareaPromesa = promisify(buscarTarea);

buscarTareaPromesa(2).then((tarea) => console.log('1.', tarea.titulo));

// Muchos módulos de Node ya traen su versión con promesas. node:timers/promises tiene un
// setTimeout que devuelve una promesa que se cumple después del tiempo indicado.
esperar(200, 'valor al terminar').then((valor) => console.log('2.', valor));
