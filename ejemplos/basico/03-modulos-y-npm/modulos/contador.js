// Este archivo se evalúa UNA sola vez, aunque lo importen muchos módulos.
console.log('(evaluando contador.js)');

export let visitas = 0;

export function registrarVisita() {
  visitas++;
}
