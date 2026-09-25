// Encadenamiento opcional (?.) y el operador ?? para datos que pueden faltar.
//   node 03-opcionales.js

const conAutor = { titulo: 'Leer', autor: { nombre: 'Ana' } };
const sinAutor = { titulo: 'Correr' };

// Sin ?., sinAutor.autor.nombre lanzaría TypeError: Cannot read properties of undefined.
console.log('1.', conAutor.autor?.nombre);
console.log('2.', sinAutor.autor?.nombre);

// ?. también sirve con métodos y posiciones de arreglos.
const etiquetas = undefined;
console.log('3.', etiquetas?.join(', '));
console.log('4.', etiquetas?.[0]);

// ?? da un valor por defecto solo si lo de la izquierda es undefined o null.
console.log('5.', sinAutor.autor?.nombre ?? 'anónimo');

// || lo da con cualquier valor "falso": también con 0 y ''. Aquí eso es un error.
const intentos = 0;
console.log('6.', intentos ?? 3, intentos || 3);
