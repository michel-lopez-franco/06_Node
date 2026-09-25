// Desde Node 22.12, CommonJS también puede hacer require() de un módulo ESM
// (siempre que ese módulo no use await en el nivel superior).
// Ejecuta: node 05-cjs-requiere-esm.cjs
const matematicas = require('./modulos/matematicas.js');

// Recibes el objeto con todas las exportaciones; la de por defecto está en .default.
console.log('1.', matematicas.sumar(2, 3));
console.log('2.', matematicas.default(1));
