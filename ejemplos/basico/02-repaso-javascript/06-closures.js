// Un closure es una función que recuerda las variables del lugar donde se creó.
//   node 06-closures.js

function crearContador() {
  let cuenta = 0; // Nadie de fuera puede tocar esta variable directamente.

  return function incrementar() {
    cuenta++;
    return cuenta;
  };
}

const contadorA = crearContador();
const contadorB = crearContador();

console.log('A:', contadorA(), contadorA(), contadorA());
// Cada llamada a crearContador crea su propia variable `cuenta`.
console.log('B:', contadorB());
