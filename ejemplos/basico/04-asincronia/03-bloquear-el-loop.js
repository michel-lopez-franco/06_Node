// Mientras tu código síncrono trabaja, Node no puede atender nada más.
// Ejecuta: node 03-bloquear-el-loop.js

const inicio = Date.now();

setTimeout(() => {
  const retraso = Date.now() - inicio;
  console.log(`El temporizador de 10 ms se ejecutó a los ${retraso} ms`);
  console.log('¿Llegó tarde?', retraso >= 300 ? 'sí' : 'no');
}, 10);

// Un ciclo que ocupa el procesador 300 ms. Durante ese tiempo el event loop está detenido:
// ni temporizadores, ni peticiones HTTP, ni nada. En un servidor, nadie recibe respuesta.
while (Date.now() - inicio < 300) {
  // ocupado
}
console.log('Terminó el ciclo pesado');
