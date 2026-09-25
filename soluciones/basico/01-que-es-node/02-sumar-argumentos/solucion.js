/**
 * Suma una lista de números escritos como texto.
 * @param {string[]} args Por ejemplo, ['2', '3.5'].
 * @returns {number} La suma; 0 si la lista está vacía.
 * @throws {Error} Si algún texto no es un número: '"abc" no es un número'.
 */
export function sumarArgumentos(args) {
  // Empezamos en 0: si la lista está vacía, el ciclo no se ejecuta y devolvemos 0.
  let total = 0;

  for (const texto of args) {
    // Todo lo que llega por la terminal es texto. Sin convertir, '2' + '3.5' sería '23.5'
    // (concatenación), no 5.5.
    const numero = Number(texto);

    // Caso borde: Number('') y Number('  ') devuelven 0, no NaN. Por eso revisamos aparte
    // que el texto no esté vacío; si no, un argumento vacío se sumaría como 0 sin avisar.
    if (texto.trim() === '' || Number.isNaN(numero)) {
      throw new Error(`"${texto}" no es un número`);
    }
    total += numero;
  }
  return total;

  // Alternativa: parseFloat(texto) en lugar de Number(texto). parseFloat('12abc') devuelve 12
  // porque lee "hasta donde puede"; Number('12abc') devuelve NaN. Para validar entrada del
  // usuario conviene Number: rechaza textos a medias en lugar de aceptarlos en silencio.
}
