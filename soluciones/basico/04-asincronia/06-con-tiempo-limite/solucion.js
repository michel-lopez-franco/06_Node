/**
 * Pone un tiempo límite a una promesa.
 * @param {Promise<unknown>} promesa
 * @param {number} ms
 * @returns {Promise<unknown>} Termina como `promesa`, o se rechaza si tarda más de `ms`.
 */
export function conTiempoLimite(promesa, ms) {
  // Guardamos el identificador del temporizador para poder cancelarlo después.
  let temporizador;

  // Una promesa que solo sabe rechazarse cuando se acaba el tiempo.
  const limite = new Promise((_resolve, reject) => {
    temporizador = setTimeout(() => {
      reject(new Error(`Se agotó el tiempo de espera (${ms} ms)`));
    }, ms);
  });

  // race termina con la primera de las dos que termine, sea con éxito o con error:
  // si gana `promesa`, obtenemos su valor o su error; si gana `limite`, el error de tiempo.
  // finally se ejecuta en ambos casos y cancela el temporizador. Si el límite ya se cumplió,
  // clearTimeout no hace nada, así que no hace falta revisarlo.
  return Promise.race([promesa, limite]).finally(() => clearTimeout(temporizador));
}

// Ojo: el límite no DETIENE la operación original; solo dejamos de esperarla. Para cancelar
// de verdad (una petición HTTP, por ejemplo) se usa AbortController, que verás con fetch en el
// módulo 8. Node incluso trae AbortSignal.timeout(ms) para ese caso.
