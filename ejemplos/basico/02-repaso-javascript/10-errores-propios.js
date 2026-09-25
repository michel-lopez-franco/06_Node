// Clases de error propias para distinguir un tipo de error de otro.
//   node 10-errores-propios.js

class ErrorDeValidacion extends Error {
  constructor(mensaje, campo) {
    super(mensaje);
    this.name = 'ErrorDeValidacion'; // Así aparece en la consola y en el stack trace.
    this.campo = campo; // Información extra para quien atrape el error.
  }
}

function crearTarea(titulo) {
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    throw new ErrorDeValidacion('El título es obligatorio', 'titulo');
  }
  return { titulo: titulo.trim(), completada: false };
}

for (const entrada of ['  Leer  ', '', 42]) {
  try {
    console.log('Creada:', crearTarea(entrada));
  } catch (error) {
    // instanceof permite reaccionar distinto según el tipo de error.
    if (error instanceof ErrorDeValidacion) {
      console.log(`Dato inválido en "${error.campo}": ${error.message}`);
    } else {
      throw error; // Un error que no sabemos manejar se deja pasar.
    }
  }
}
