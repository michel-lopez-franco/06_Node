import { setTimeout as esperar } from 'node:timers/promises';

/**
 * Llama a fn hasta que funcione o se acaben los intentos.
 * @param {(intento: number) => Promise<unknown>} fn
 * @param {{ intentos?: number, esperaMs?: number }} [opciones]
 * @returns {Promise<unknown>} El valor del primer intento que funcione.
 */
// Desestructuración con valores por defecto (módulo 2); el `= {}` final permite llamar a
// reintentar(fn) sin opciones.
export async function reintentar(fn, { intentos = 3, esperaMs = 0 } = {}) {
  // Como la función es async, este throw se convierte en una promesa rechazada.
  if (intentos < 1) {
    throw new RangeError('intentos debe ser al menos 1');
  }

  let ultimoError;
  for (let intento = 1; intento <= intentos; intento++) {
    try {
      // `return await` y no solo `return`: así, si fn se rechaza, el error se lanza DENTRO del
      // try y lo atrapamos. Un error síncrono de fn también cae en el catch.
      return await fn(intento);
    } catch (error) {
      ultimoError = error;
    }
    // Esperamos solo si queda otro intento: esperar después del último es tiempo perdido.
    if (intento < intentos) {
      await esperar(esperaMs);
    }
  }

  throw ultimoError;
}

// Aquí el await dentro del for SÍ es lo correcto: cada intento depende de que el anterior
// haya fallado, así que no pueden ir en paralelo.
//
// Mejora común en producción: "espera exponencial" (esperaMs, luego el doble, luego el
// doble...) para no saturar a un servidor que ya tiene problemas.
