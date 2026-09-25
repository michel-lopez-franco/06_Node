// Crear una promesa y usarla con then, catch y finally. Ejecuta: node 07-promesas.js

function lanzarMoneda() {
  // new Promise recibe una función con dos "botones": resolve (éxito) y reject (fallo).
  // Solo cuenta el primero que se presione.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('águila');
      } else {
        reject(new Error('salió sol'));
      }
    }, 100);
  });
}

const promesa = lanzarMoneda();
console.log('1. La promesa recién creada:', promesa);

promesa
  .then((resultado) => console.log('2. Ganaste:', resultado))
  .catch((error) => console.log('2. Perdiste:', error.message))
  .finally(() => console.log('3. Fin del volado (se ejecuta siempre)'));
