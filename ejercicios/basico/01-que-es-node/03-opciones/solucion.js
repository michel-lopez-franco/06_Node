// Por ahora escribe solo dentro de las funciones; `export` lo veremos en el módulo 3.

/**
 * Lee el valor de una opción `--<nombre>` en la forma `--nombre valor` o `--nombre=valor`.
 * @param {string[]} args Argumentos del usuario, por ejemplo ['--nombre', 'Ana'].
 * @param {string} nombre Nombre de la opción, sin los guiones: 'nombre'.
 * @returns {string | undefined} El valor, o undefined si la opción no está o no trae valor.
 */
export function leerOpcion(args, nombre) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}

/**
 * Indica si una bandera `--<nombre>` aparece en los argumentos.
 * @param {string[]} args Argumentos del usuario, por ejemplo ['--verbose'].
 * @param {string} nombre Nombre de la bandera, sin los guiones: 'verbose'.
 * @returns {boolean}
 */
export function tieneBandera(args, nombre) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}
