// setInterval repite una función cada cierto tiempo hasta que lo detienes.
// Ejecuta: node 04-intervalos.js

let vueltas = 0;

const intervalo = setInterval(() => {
  vueltas++;
  console.log(`Vuelta ${vueltas}`);
  if (vueltas === 3) {
    // Sin clearInterval, el programa nunca terminaría: un intervalo activo mantiene vivo
    // el event loop.
    clearInterval(intervalo);
    console.log('Intervalo detenido');
  }
}, 100);

// clearTimeout cancela un temporizador que todavía no se ejecuta.
const aviso = setTimeout(() => console.log('Esto nunca se imprime'), 1000);
clearTimeout(aviso);
