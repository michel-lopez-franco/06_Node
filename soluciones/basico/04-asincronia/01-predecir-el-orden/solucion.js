/**
 * Tu predicción del orden en que programa.js registra las letras.
 * @returns {string[]} Las seis letras en orden, por ejemplo ['A', 'B', 'C', 'D', 'E', 'F'].
 */
export function predecirOrden() {
  return [
    // 1. Primero, todo el código síncrono, de arriba a abajo:
    'A', //   anotar('A') se ejecuta de inmediato.
    'D', //   tarea() se llama y su cuerpo corre SÍNCRONO hasta el primer await: anota D.
    'F', //   anotar('F') se ejecuta de inmediato.

    // 2. Termina el código síncrono: se atienden las microtareas, en el orden en que se
    //    agendaron.
    'C', //   El then se agendó antes de llamar a tarea(), así que va primero.
    'E', //   `await null` agendó el resto de tarea() como microtarea, después de la de C.

    // 3. Ya sin microtareas, el event loop atiende los temporizadores.
    'B', //   Aunque sea de 0 ms, un setTimeout siempre espera a que se vacíen las microtareas.
  ];
  // Lo que más confunde: D sale antes que F. Una función async NO se ejecuta "después"; se
  // ejecuta en cuanto la llamas y solo se pausa al llegar a un await.
}
