// structuredClone hace una copia profunda: nada queda compartido.
//   node 05-structured-clone.js

const original = {
  titulo: 'Leer',
  etiquetas: ['escuela'],
  creada: new Date('2026-09-01T10:00:00Z'),
};

const copia = structuredClone(original);
copia.etiquetas.push('urgente');
console.log('1.', original.etiquetas, copia.etiquetas);

// Las fechas siguen siendo fechas (con JSON.parse(JSON.stringify(...)) serían texto).
console.log('2.', copia.creada instanceof Date);

// Lo que NO puede copiar: las funciones.
try {
  structuredClone({ saludar() {} });
} catch (error) {
  console.log('3.', error.name, '-', error.message);
}

// Y las instancias de clase pierden su clase: quedan como objetos simples.
class Tarea {
  constructor(titulo) {
    this.titulo = titulo;
  }
}
const clon = structuredClone(new Tarea('Correr'));
console.log('4.', clon, clon instanceof Tarea);
