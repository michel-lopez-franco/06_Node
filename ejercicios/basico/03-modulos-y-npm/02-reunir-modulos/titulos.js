// Módulo ya hecho: no necesitas editarlo.

/**
 * Quita los espacios de las orillas y junta los espacios repetidos del medio.
 * @param {string} titulo
 * @returns {string}
 */
export function normalizarTitulo(titulo) {
  return titulo.trim().replace(/\s+/g, ' ');
}
