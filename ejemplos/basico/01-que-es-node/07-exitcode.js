// process.exitCode fija el código de salida, pero deja que Node termine lo pendiente.
//   node 07-exitcode.js
// @verificar falla

setTimeout(() => {
  console.log('2. Esto sí se imprime: Node esperó al temporizador antes de salir.');
}, 100);

process.exitCode = 1;
console.log('1. Ya pusimos exitCode = 1, pero el programa sigue hasta terminar su trabajo.');
