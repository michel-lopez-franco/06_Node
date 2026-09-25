// Los objetos y arreglos se guardan por referencia: asignarlos no los copia.
//   node 04-referencias.js

const original = { titulo: 'Leer', etiquetas: ['escuela'] };

// Otra variable, el mismo objeto.
const mismo = original;
mismo.titulo = 'Leer capítulo 3';
console.log('1.', original.titulo);

// Una función que recibe un objeto puede modificar el del que la llamó.
function completar(tarea) {
  tarea.completada = true;
}
completar(original);
console.log('2.', original);

// El spread hace una copia superficial: el primer nivel es nuevo...
const copia = { ...original };
copia.titulo = 'Otro título';
console.log('3.', original.titulo);

// ...pero lo que está anidado se sigue compartiendo.
copia.etiquetas.push('urgente');
console.log('4.', original.etiquetas);

// === compara referencias, no contenido: dos objetos iguales por dentro son distintos.
const x = { a: 1 };
const y = { a: 1 };
console.log('5.', x === y, original === mismo, original === copia);
