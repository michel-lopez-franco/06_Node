// Herencia con extends y super.
//   node 09-herencia.js

class Tarea {
  constructor(titulo) {
    this.titulo = titulo;
    this.completada = false;
  }

  describir() {
    const marca = this.completada ? '[x]' : '[ ]';
    return `${marca} ${this.titulo}`;
  }
}

class TareaConFecha extends Tarea {
  constructor(titulo, fechaLimite) {
    super(titulo); // Antes de usar this, hay que construir la parte de Tarea.
    this.fechaLimite = fechaLimite;
  }

  // Sobrescribe el método de Tarea y reutiliza el original con super.describir().
  describir() {
    return `${super.describir()} (antes del ${this.fechaLimite})`;
  }
}

const lista = [new Tarea('Leer'), new TareaConFecha('Entregar práctica', '2026-10-03')];
lista[0].completada = true;

for (const tarea of lista) {
  console.log(tarea.describir());
}
console.log(lista[1] instanceof TareaConFecha, lista[1] instanceof Tarea);
