// process.exit() termina en ese mismo instante, aunque quede trabajo pendiente.
//   node 08-exit-inmediato.js

setTimeout(() => {
  console.log('Esto NUNCA se imprime: el proceso ya terminó.');
}, 100);

console.log('Voy a llamar a process.exit(0)...');
process.exit(0);
