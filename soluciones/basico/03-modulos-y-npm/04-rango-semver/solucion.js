// Tres números separados por puntos, y nada más (^ y $ amarran el inicio y el final).
const FORMATO_VERSION = /^(\d+)\.(\d+)\.(\d+)$/;

/**
 * Convierte '1.2.3' en [1, 2, 3], o devuelve undefined si no tiene el formato.
 * @param {string} texto
 * @returns {number[] | undefined}
 */
function leerVersion(texto) {
  const partes = FORMATO_VERSION.exec(texto);
  if (partes === null) {
    return undefined;
  }
  // Convertimos a número porque como texto '10' < '2' (se compara letra por letra).
  return [Number(partes[1]), Number(partes[2]), Number(partes[3])];
}

/**
 * Compara dos versiones ya leídas.
 * @returns {number} Negativo si a < b, 0 si son iguales, positivo si a > b.
 */
function comparar(a, b) {
  // Se decide por la primera parte distinta: mayor, luego menor, luego parche.
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }
  return 0;
}

/**
 * Indica si una versión cumple un rango de npm: exacto ('1.2.3'), con ~ ('~1.2.3') o con ^ ('^1.2.3').
 * @param {string} version Por ejemplo, '1.4.2'.
 * @param {string} rango Por ejemplo, '^1.2.0'.
 * @returns {boolean}
 * @throws {Error} 'Versión inválida: "<version>"' o 'Rango no soportado: "<rango>"'.
 */
export function cumpleRango(version, rango) {
  const actual = leerVersion(version);
  if (actual === undefined) {
    throw new Error(`Versión inválida: "${version}"`);
  }

  // Separamos el operador (^, ~ o nada) de la versión base.
  const operador = rango.startsWith('^') || rango.startsWith('~') ? rango[0] : '';
  const base = leerVersion(rango.slice(operador.length));
  // Si lo que queda no es una versión completa (">=1.0.0", "^1.2"), no lo soportamos.
  if (base === undefined) {
    throw new Error(`Rango no soportado: "${rango}"`);
  }

  const [mayor, menor, parche] = base;

  // Todo rango es "desde base (incluida) hasta un tope (excluido)". Solo cambia el tope.
  let tope;
  if (operador === '') {
    tope = [mayor, menor, parche + 1]; // exacto: el tope es el parche siguiente
  } else if (operador === '~') {
    tope = [mayor, menor + 1, 0];
  } else if (mayor > 0) {
    tope = [mayor + 1, 0, 0];
  } else if (menor > 0) {
    tope = [0, menor + 1, 0]; // ^0.2.3: la versión menor actúa como mayor
  } else {
    tope = [0, 0, parche + 1]; // ^0.0.3: solo esa versión
  }

  return comparar(actual, base) >= 0 && comparar(actual, tope) < 0;
}

// Alternativa: un if por cada caso comparando mayor, menor y parche a mano. Funciona, pero
// se vuelve difícil de leer; pensar en "desde / hasta" reduce todo a una sola comparación.
//
// En un proyecto real no escribirías esto: npm usa el paquete `semver`, que además soporta
// >=, <, ||, rangos con x (1.2.x) y versiones previas (1.0.0-beta.1).
