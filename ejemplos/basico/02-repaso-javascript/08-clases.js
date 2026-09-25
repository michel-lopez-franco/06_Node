// Clases: constructor, campos privados (#), getters y métodos estáticos.
//   node 08-clases.js

class Temporizador {
  // Campo privado: solo los métodos de la clase pueden leerlo o cambiarlo.
  #vueltas = [];

  // Campo estático: pertenece a la clase, no a cada objeto.
  static creados = 0;

  constructor(nombre) {
    this.nombre = nombre; // Campo público.
    Temporizador.creados++;
  }

  registrar(segundos) {
    if (segundos <= 0) {
      throw new Error('Los segundos deben ser positivos');
    }
    this.#vueltas.push(segundos);
    return this; // Devolver this permite encadenar llamadas.
  }

  // Getter: se lee como propiedad (t.total), pero se calcula cada vez.
  get total() {
    let suma = 0;
    for (const vuelta of this.#vueltas) suma += vuelta;
    return suma;
  }

  // Método estático: se llama sobre la clase, no sobre un objeto.
  static desdeLista(nombre, lista) {
    const temporizador = new Temporizador(nombre);
    for (const segundos of lista) temporizador.registrar(segundos);
    return temporizador;
  }
}

const carrera = new Temporizador('carrera').registrar(62).registrar(58);
console.log('1.', carrera.nombre, carrera.total);

const nado = Temporizador.desdeLista('nado', [40, 45, 41]);
console.log('2.', nado.total, Temporizador.creados);

// Desde fuera, el campo privado no se ve (y carrera.#vueltas sería un SyntaxError).
console.log('3.', carrera);
console.log('4.', carrera instanceof Temporizador);
