/**
 * Obtiene las iniciales de un nombre completo, en mayúsculas.
 * @param {string} nombreCompleto Por ejemplo, "ana lópez franco".
 * @returns {string} Por ejemplo, "ALF". Texto vacío si no hay palabras.
 */
export function obtenerIniciales(nombreCompleto) {
  // split(' ') corta en cada espacio. Con espacios repetidos deja textos vacíos:
  // '  maría   josé '.split(' ') → ['', '', 'maría', '', '', 'josé', '']
  // Por eso filtramos los vacíos antes de tomar la primera letra; si no, palabra[0]
  // sería undefined y toUpperCase() lanzaría un error.
  const palabras = nombreCompleto.split(' ').filter((palabra) => palabra !== '');

  // Con la lista vacía, map() devuelve [] y join('') devuelve "": el caso borde
  // del texto vacío queda cubierto sin un `if` aparte.
  return palabras.map((palabra) => palabra[0].toUpperCase()).join('');

  // Alternativa: nombreCompleto.trim().split(/\s+/) usa una expresión regular para cortar
  // en uno o más espacios (también tabuladores). Es más corta, pero con "" devuelve ['']
  // y habría que cuidar ese caso por separado.
}
