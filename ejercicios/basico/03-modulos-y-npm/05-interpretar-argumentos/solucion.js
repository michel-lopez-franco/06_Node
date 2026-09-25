// Importa parseArgs de node:util para resolverlo.

/**
 * Interpreta los argumentos de la CLI de tareas.
 * @param {string[]} args Argumentos del usuario, por ejemplo ['agregar', 'Leer', '-p', 'alta'].
 * @returns {{
 *   comando: string | undefined,
 *   argumentos: string[],
 *   opciones: { prioridad: string, pendientes: boolean, ayuda: boolean },
 * }}
 * @throws {Error} 'Prioridad inválida: "<valor>". Usa baja, media o alta' si la prioridad no existe.
 */
export function interpretarArgumentos(args) {
  throw new Error('Ejercicio sin resolver: completa esta función');
}
