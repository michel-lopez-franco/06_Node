// Desestructuración: sacar valores de objetos y arreglos en una sola línea.
//   node 01-desestructuracion.js

const tarea = {
  id: 7,
  titulo: 'Entregar práctica',
  completada: false,
  autor: { nombre: 'Ana', correo: 'ana@ejemplo.mx' },
};

// De un objeto: las variables se llaman igual que las propiedades.
const { titulo, completada } = tarea;
console.log('1.', titulo, completada);

// Renombrar (id → numero), anidar (autor.nombre) y dar un valor por defecto (prioridad).
const {
  id: numero,
  autor: { nombre },
  prioridad = 'normal',
} = tarea;
console.log('2.', numero, nombre, prioridad);

// De un arreglo: importa la posición, no el nombre. Una coma sin nombre salta un elemento.
const [primero, , tercero] = ['node', 'archivo.js', 'hola'];
console.log('3.', primero, tercero);

// En los parámetros: la función declara qué propiedades usa y sus valores por defecto.
function describir({ titulo, prioridad = 'normal' }) {
  return `${titulo} (${prioridad})`;
}
console.log('4.', describir(tarea));
console.log('5.', describir({ titulo: 'Leer capítulo 3', prioridad: 'alta' }));

// Intercambiar dos variables sin una auxiliar.
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log('6.', a, b);
