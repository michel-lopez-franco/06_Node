/**
 * Combina opciones con sus valores por defecto, sin modificar ninguno de los dos objetos.
 * @param {object} porDefecto Por ejemplo, { puerto: 3000, host: 'localhost' }.
 * @param {object} [opciones] Por ejemplo, { puerto: 8080 }. Las que valen undefined se ignoran.
 * @returns {object} Un objeto nuevo: { puerto: 8080, host: 'localhost' }.
 */
export function combinarOpciones(porDefecto, opciones = {}) {
  // El valor por defecto `= {}` cubre la llamada sin segundo argumento: así el ciclo de abajo
  // recorre un objeto vacío en lugar de fallar con undefined.

  // Empezamos con una copia (spread) para no modificar porDefecto.
  const resultado = { ...porDefecto };

  // Caso borde: { ...porDefecto, ...opciones } sería lo más corto, pero una opción que vale
  // undefined también se copia y "borra" el valor por defecto. Por eso copiamos una por una
  // y saltamos las que valen undefined. Object.entries da pares [nombre, valor].
  for (const [nombre, valor] of Object.entries(opciones)) {
    // Comparamos con undefined y no con `if (valor)`: 0, '' y false son valores válidos
    // (depurar: false es una decisión, no una opción que falta).
    if (valor !== undefined) {
      resultado[nombre] = valor;
    }
  }

  return resultado;

  // Alternativa: filtrar primero y luego usar spread:
  //   const definidas = Object.fromEntries(
  //     Object.entries(opciones).filter(([, valor]) => valor !== undefined),
  //   );
  //   return { ...porDefecto, ...definidas };
  // Hace lo mismo sin variables que cambian; es cuestión de gusto.
}
