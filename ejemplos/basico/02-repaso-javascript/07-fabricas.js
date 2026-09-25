// Fábricas: funciones que crean funciones ya configuradas.
//   node 07-fabricas.js

function crearMultiplicador(factor) {
  // La función devuelta recuerda `factor` sin tener que recibirlo cada vez.
  return (numero) => numero * factor;
}

const doble = crearMultiplicador(2);
const triple = crearMultiplicador(3);
console.log('1.', doble(5), triple(5), [1, 2, 3].map(doble));

// Un closure también puede recordar un objeto con varias funciones que comparten estado.
function crearRegistro(prefijo) {
  const mensajes = [];
  return {
    agregar(texto) {
      mensajes.push(`[${prefijo}] ${texto}`);
    },
    todos() {
      return [...mensajes]; // Devolvemos una copia para que nadie modifique la original.
    },
  };
}

const registro = crearRegistro('tareas');
registro.agregar('se creó "Leer"');
registro.agregar('se completó "Leer"');
console.log('2.', registro.todos());
console.log('3.', registro.mensajes); // No existe: el arreglo solo vive dentro del closure.
