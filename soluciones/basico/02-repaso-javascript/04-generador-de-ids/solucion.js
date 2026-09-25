/**
 * Crea una función que genera ids consecutivos con un prefijo.
 * @param {string} prefijo Por ejemplo, 'tarea'.
 * @param {number} [inicio] El primer número; 1 si no se indica.
 * @returns {() => string} Una función que devuelve 'tarea-1', 'tarea-2', ...
 */
export function crearGeneradorDeIds(prefijo, inicio = 1) {
  // Caso borde: el valor por defecto `= 1` solo se usa cuando inicio es undefined. Si
  // hubiéramos escrito `inicio || 1`, un inicio de 0 se convertiría en 1.

  // `siguiente` vive dentro de esta llamada a crearGeneradorDeIds. Cada llamada crea su propia
  // variable, y por eso cada generador lleva su propia cuenta.
  let siguiente = inicio;

  // La función que devolvemos es un closure: recuerda `prefijo` y `siguiente` aunque
  // crearGeneradorDeIds ya haya terminado. Nadie más puede modificar la cuenta.
  return () => {
    const id = `${prefijo}-${siguiente}`;
    siguiente++;
    return id;
  };

  // Alternativa: una clase con un campo privado #siguiente y un método siguienteId().
  // Funciona igual; el closure es más corto cuando solo necesitas una operación.
}
