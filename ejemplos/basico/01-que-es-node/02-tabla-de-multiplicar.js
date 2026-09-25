// Un script normal: Node lo lee de arriba abajo, lo ejecuta y termina.
//   node 02-tabla-de-multiplicar.js
// Pruébalo también con --watch: edita el número, guarda y mira cómo se vuelve a ejecutar.
//   node --watch 02-tabla-de-multiplicar.js
const numero = 7;

console.log(`Tabla del ${numero}`);
for (let i = 1; i <= 10; i++) {
  console.log(`${numero} x ${i} = ${numero * i}`);
}
