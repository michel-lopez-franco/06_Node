// Lee variables de entorno con valores por defecto.
//   macOS / Linux:  NOMBRE=Ana PUERTO=8080 node 05-variables-de-entorno.js
//   PowerShell:     $env:NOMBRE="Ana"; $env:PUERTO="8080"; node 05-variables-de-entorno.js

// Si la variable no existe, process.env.NOMBRE es undefined y usamos el valor por defecto.
const nombre = process.env.NOMBRE ?? 'desconocido';
console.log(`Hola, ${nombre}`);

// Todas las variables de entorno llegan como texto: hay que convertirlas.
const textoPuerto = process.env.PUERTO ?? '3000';
const puerto = Number(textoPuerto);
console.log(`Puerto: ${puerto} (process.env.PUERTO es de tipo ${typeof process.env.PUERTO})`);

// Las variables del sistema también están ahí. La carpeta personal se llama distinto
// según el sistema: HOME en macOS y Linux, USERPROFILE en Windows.
console.log('Tu carpeta personal:', process.env.HOME ?? process.env.USERPROFILE);
