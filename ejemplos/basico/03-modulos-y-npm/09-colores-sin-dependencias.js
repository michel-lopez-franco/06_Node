// Antes de instalar una dependencia, revisa si Node ya lo trae.
// util.styleText colorea texto en la terminal. Ejecuta: node 09-colores-sin-dependencias.js
import { styleText } from 'node:util';

console.log(styleText('green', '✔ tarea completada'));
console.log(styleText(['red', 'bold'], '✖ tarea vencida'));

// Si la salida no es una terminal (p. ej., la rediriges a un archivo) o existe la variable
// NO_COLOR, styleText devuelve el texto sin colores.
