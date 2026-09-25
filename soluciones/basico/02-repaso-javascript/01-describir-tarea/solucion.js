/**
 * Describe una tarea en una línea de texto.
 * @param {{ titulo: string, prioridad?: string, etiquetas?: string[] }} tarea
 * @returns {string} Por ejemplo, 'Pagar luz [alta] #casa #urgente'.
 */
export function describirTarea({ titulo, prioridad = 'normal', etiquetas = [] }) {
  // Desestructurar en el parámetro deja claro, desde la firma, qué propiedades usa la función
  // y cuáles son opcionales. Los valores por defecto se aplican cuando la propiedad no existe
  // o vale undefined; las demás propiedades del objeto (id, completada) se ignoran solas.
  const texto = `${titulo} [${prioridad}]`;

  // Caso borde: sin etiquetas no queremos un espacio al final ("Leer [baja] "). Por eso solo
  // agregamos el espacio cuando hay al menos una.
  if (etiquetas.length === 0) {
    return texto;
  }

  // map convierte cada etiqueta en '#etiqueta' y join las une con un espacio.
  const conGato = etiquetas.map((etiqueta) => `#${etiqueta}`).join(' ');
  return `${texto} ${conGato}`;

  // Alternativa: armar un arreglo con todas las piezas y unirlo al final:
  //   [`${titulo} [${prioridad}]`, ...etiquetas.map((e) => `#${e}`)].join(' ')
  // Es más corta y evita el if, pero cuesta un poco más leerla la primera vez.
}
