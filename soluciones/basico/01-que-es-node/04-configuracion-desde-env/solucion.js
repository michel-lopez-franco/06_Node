const MODOS_VALIDOS = ['desarrollo', 'produccion', 'pruebas'];

/**
 * Lee la configuración de la aplicación a partir de variables de entorno.
 * @param {Record<string, string | undefined>} env Un objeto con la forma de process.env.
 * @returns {{ puerto: number, modo: string, depurar: boolean }}
 * @throws {Error} Si PUERTO o MODO traen un valor no válido.
 */
export function leerConfiguracion(env) {
  // Recibir `env` como parámetro, en lugar de leer process.env aquí dentro, hace que la
  // función sea fácil de probar: el test le pasa el objeto que quiera. En el programa real
  // se llama así: leerConfiguracion(process.env).

  // Usamos `||` y no `??` a propósito: `??` solo reemplaza undefined y null, pero una variable
  // definida como vacía (PUERTO=) llega como '' y también queremos el valor por defecto.
  const textoPuerto = env.PUERTO || '3000';
  const puerto = Number(textoPuerto);
  // Number.isInteger rechaza NaN ('abc') y decimales ('3000.5') de una vez.
  if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
    throw new Error(`PUERTO debe ser un entero entre 1 y 65535 (recibí "${textoPuerto}")`);
  }

  const modo = env.MODO || 'desarrollo';
  if (!MODOS_VALIDOS.includes(modo)) {
    throw new Error(`MODO debe ser desarrollo, produccion o pruebas (recibí "${modo}")`);
  }

  // Las variables de entorno siempre son texto: 'false' es un texto no vacío y, en un `if`,
  // contaría como verdadero. Por eso comparamos contra los valores que sí significan "sí".
  // El `?? ''` evita llamar toLowerCase() sobre undefined cuando DEPURAR no existe.
  const textoDepurar = (env.DEPURAR ?? '').toLowerCase();
  const depurar = textoDepurar === 'true' || textoDepurar === '1';

  return { puerto, modo, depurar };

  // Validar al arrancar es una buena práctica: si la configuración está mal, el programa
  // falla de inmediato con un mensaje claro, en vez de fallar más tarde en otro lado.
  // En el módulo 12 lo haremos con --env-file y validación más completa.
}
