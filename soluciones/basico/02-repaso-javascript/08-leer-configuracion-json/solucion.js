const POR_DEFECTO = { puerto: 3000, host: 'localhost' };

/**
 * Lee una configuración en JSON y la combina con los valores por defecto.
 * @param {string} texto Por ejemplo, '{"puerto": 8080}'.
 * @returns {object} Por ejemplo, { puerto: 8080, host: 'localhost' }.
 * @throws {Error} 'La configuración no es JSON válido' (con `cause`) o
 *   'La configuración debe ser un objeto'.
 */
export function leerConfiguracionJson(texto) {
  // `let` fuera del try para poder usar el valor después. Dentro del try solo dejamos la
  // línea que puede fallar por JSON inválido: si metiéramos todo, el catch también atraparía
  // (y disfrazaría) errores que no tienen nada que ver con el JSON.
  let datos;
  try {
    datos = JSON.parse(texto);
  } catch (error) {
    // Envolvemos el error: el mensaje nuevo habla en términos de nuestro programa y `cause`
    // conserva el SyntaxError original, con la posición exacta del problema, para quien
    // necesite depurar.
    throw new Error('La configuración no es JSON válido', { cause: error });
  }

  // Caso borde: '[1, 2]', 'null', '42' y '"hola"' son JSON válido, pero no son una
  // configuración. typeof null es 'object' (una rareza histórica de JavaScript) y los
  // arreglos también son 'object', por eso los revisamos aparte.
  if (typeof datos !== 'object' || datos === null || Array.isArray(datos)) {
    throw new Error('La configuración debe ser un objeto');
  }

  // Spread: primero los valores por defecto y después los del archivo, que ganan. Como
  // creamos un objeto nuevo, POR_DEFECTO nunca se modifica entre llamadas.
  return { ...POR_DEFECTO, ...datos };

  // En el módulo 5 leerás este texto desde un archivo con node:fs/promises; esta función
  // no cambia, solo quién le pasa el texto.
}
