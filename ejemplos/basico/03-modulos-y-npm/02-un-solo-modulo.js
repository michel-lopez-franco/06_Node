// Un módulo se evalúa una vez y todos los que lo importan comparten la misma copia.
// Ejecuta: node 02-un-solo-modulo.js
import { visitas, registrarVisita } from './modulos/contador.js';
import { mostrarPagina } from './modulos/pagina.js';

console.log('1. visitas al inicio:', visitas);

registrarVisita();
console.log(mostrarPagina('inicio'));
console.log(mostrarPagina('contacto'));

// `visitas` es un enlace vivo (live binding): ve el valor actual dentro de contador.js,
// aunque lo hayan cambiado otros módulos.
console.log('2. visitas al final:', visitas);

// Pero desde fuera es de solo lectura: visitas = 100 lanzaría
// TypeError: Assignment to constant variable.
