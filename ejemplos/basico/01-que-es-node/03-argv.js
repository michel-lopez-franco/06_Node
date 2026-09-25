// Muestra qué trae process.argv. Pruébalo con distintos argumentos:
//   node 03-argv.js hola 42 --rapido
//   node 03-argv.js "dos palabras"
// @verificar args: hola 42 --rapido

console.log('process.argv completo:');
process.argv.forEach((valor, posicion) => {
  console.log(`  [${posicion}] ${valor}`);
});

// Las dos primeras posiciones siempre son la ruta de node y la del script.
const argumentos = process.argv.slice(2);
console.log('Lo que escribió el usuario:', argumentos);
console.log('¿De qué tipo es "42"?', typeof argumentos[1]);
