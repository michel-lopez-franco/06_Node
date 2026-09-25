/**
 * Arma un saludo para una persona.
 * @param {string} [nombre] Nombre de la persona; puede traer espacios de más o venir vacío.
 * @returns {string} Por ejemplo, "¡Hola, Ana!" o "¡Hola, mundo!" si no hay nombre.
 */
export function saludar(nombre = '') {
  // El valor por defecto `nombre = ''` cubre la llamada saludar() sin argumentos: sin él,
  // `nombre` sería undefined y undefined.trim() lanzaría un TypeError.

  // Limpiamos una sola vez y reutilizamos el resultado, en lugar de llamar a trim() dos veces.
  const limpio = nombre.trim();

  // Un texto vacío cuenta como "falso", así que `!limpio` cubre "" y "   " (ya recortado).
  if (!limpio) {
    return '¡Hola, mundo!';
  }
  return `¡Hola, ${limpio}!`;

  // Alternativa en una línea: return `¡Hola, ${nombre.trim() || 'mundo'}!`;
  // Es más corta, pero depende de entender bien cómo funciona `||` con textos vacíos.
}
