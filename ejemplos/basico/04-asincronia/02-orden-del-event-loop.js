// En qué orden atiende Node el trabajo pendiente. Ejecuta: node 02-orden-del-event-loop.js

console.log('1. síncrono');

// Un temporizador es una tarea para el event loop: espera a que se vacíe todo lo demás.
setTimeout(() => console.log('5. setTimeout de 0 ms'), 0);

// Las microtareas (los then de las promesas y queueMicrotask) se atienden en cuanto termina
// el código síncrono, antes que cualquier temporizador, y en el orden en que se agendaron.
Promise.resolve().then(() => console.log('3. then de una promesa (microtarea)'));
queueMicrotask(() => console.log('4. queueMicrotask (otra microtarea)'));

console.log('2. síncrono, al final del archivo');
