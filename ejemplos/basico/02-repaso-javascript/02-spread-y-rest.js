// Los tres puntos (...) hacen dos cosas opuestas: esparcir (spread) y juntar (rest).
//   node 02-spread-y-rest.js

// Spread en arreglos: copia los elementos dentro de otro arreglo.
const basicos = ['node', 'npm'];
const herramientas = [...basicos, 'git'];
console.log('1.', herramientas);

// Spread en objetos: copia las propiedades. Si se repite una, gana la que va después.
const porDefecto = { puerto: 3000, host: 'localhost' };
const configuracion = { ...porDefecto, puerto: 8080 };
console.log('2.', configuracion);

// Cuidado: una propiedad con valor undefined también cuenta y "borra" el valor por defecto.
const conHueco = { ...porDefecto, puerto: undefined };
console.log('3.', conHueco);

// Spread en una llamada: pasa los elementos como argumentos separados.
const numeros = [4, 9, 2];
console.log('4.', Math.max(...numeros));

// Rest en parámetros: junta los argumentos que sobran en un arreglo.
function sumar(...valores) {
  let total = 0;
  for (const valor of valores) total += valor;
  return total;
}
console.log('5.', sumar(1, 2, 3, 4));

// Rest en desestructuración: separa lo que te interesa del resto.
const [comando, ...args] = ['agregar', 'Comprar', 'pan'];
console.log('6.', comando, args);

const { id, ...sinId } = { id: 1, titulo: 'Leer', completada: false };
console.log('7.', id, sinId);
