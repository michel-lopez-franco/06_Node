// El código síncrono corre de arriba a abajo; lo asíncrono se ejecuta después.
// Ejecuta: node 01-sincrono-vs-asincrono.js

console.log('1. Inicio');

// setTimeout NO espera: agenda la función para dentro de 100 ms y sigue de largo.
setTimeout(() => {
  console.log('4. Pasaron 100 ms');
}, 100);

// Aunque el tiempo sea 0, la función espera a que termine todo el código síncrono.
setTimeout(() => {
  console.log('3. Temporizador de 0 ms');
}, 0);

console.log('2. Fin del código síncrono');
