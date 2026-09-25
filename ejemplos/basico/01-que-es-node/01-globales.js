// ¿Qué hay en Node y qué no, comparado con el navegador?
//   node 01-globales.js

// Lo que NO existe en Node: no hay página web, así que no hay ventana ni documento.
console.log('¿Existe window?', typeof window !== 'undefined');
console.log('¿Existe document?', typeof document !== 'undefined');

// Lo que SÍ existe en Node: process describe al programa que se está ejecutando.
console.log('¿Existe process?', typeof process !== 'undefined');

// Lo que existe en los dos lados.
console.log('¿Existen console, setTimeout, fetch y URL?', [
  typeof console,
  typeof setTimeout,
  typeof fetch,
  typeof URL,
]);

// globalThis es el objeto global en cualquier entorno (en el navegador es igual a window).
console.log('¿globalThis.process es process?', globalThis.process === process);

// Las piezas que forman Node, con su versión.
console.log('Node:', process.versions.node);
console.log('V8 (el motor de JavaScript):', process.versions.v8);
console.log('libuv (archivos, red y temporizadores):', process.versions.uv);
