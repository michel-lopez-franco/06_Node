// Esperar una cosa tras otra o todas a la vez. Ejecuta: node 11-secuencial-vs-paralelo.js
import { setTimeout as esperar } from 'node:timers/promises';

// Simula una consulta que tarda 100 ms.
async function consultar(nombre) {
  await esperar(100);
  return nombre.toUpperCase();
}

let inicio = Date.now();
const a = await consultar('a');
const b = await consultar('b');
const c = await consultar('c');
console.log('Secuencial:', [a, b, c], `~${redondear(Date.now() - inicio)} ms`);

// Promise.all arranca todas al mismo tiempo y espera a que terminen. Devuelve los
// resultados en el mismo orden del arreglo, sin importar cuál terminó primero.
inicio = Date.now();
const resultados = await Promise.all([consultar('a'), consultar('b'), consultar('c')]);
console.log('Paralelo:  ', resultados, `~${redondear(Date.now() - inicio)} ms`);

// Redondea a centenas para que la salida no cambie por unos milisegundos.
function redondear(ms) {
  return Math.round(ms / 100) * 100;
}
