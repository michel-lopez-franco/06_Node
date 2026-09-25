// Suma los números que recibe por la terminal.
//   node 04-sumar-argumentos.js 10 20 12.5
// @verificar args: 10 20 12.5

const argumentos = process.argv.slice(2);

// Error típico: los argumentos son texto, así que + los concatena.
console.log('Sin convertir:', argumentos[0] + argumentos[1]);

// Convertimos cada texto a número antes de sumar.
let total = 0;
for (const texto of argumentos) {
  total += Number(texto);
}
console.log('Convirtiendo con Number():', total);
