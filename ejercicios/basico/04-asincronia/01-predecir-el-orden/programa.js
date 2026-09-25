// El programa cuyo orden tienes que predecir. No lo edites.
// Cada llamada a anotar('X') agrega una letra al registro, en el orden en que se ejecuta.

export function ejecutarPrograma() {
  const registro = [];
  const anotar = (letra) => registro.push(letra);

  return new Promise((terminar) => {
    // ---------------------------- el programa ----------------------------
    anotar('A');

    setTimeout(() => anotar('B'), 0);

    Promise.resolve().then(() => anotar('C'));

    async function tarea() {
      anotar('D');
      await null;
      anotar('E');
    }
    tarea();

    anotar('F');
    // ---------------------------------------------------------------------

    // Espera a que todo termine y entrega el registro.
    setTimeout(() => terminar(registro), 20);
  });
}
