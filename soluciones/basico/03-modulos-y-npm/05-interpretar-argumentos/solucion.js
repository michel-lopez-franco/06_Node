import { parseArgs } from 'node:util';

const PRIORIDADES = ['baja', 'media', 'alta'];

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
  // Pasamos `args` en lugar de dejar que parseArgs lea process.argv por su cuenta: así la
  // función se puede probar con cualquier arreglo, sin ejecutar el programa.
  const { values, positionals } = parseArgs({
    args,
    // Sin esto, "agregar" y "Leer" provocarían un error: por defecto parseArgs solo acepta
    // opciones con guiones.
    allowPositionals: true,
    // strict es true por defecto: una opción que no está aquí lanza un error. Lo dejamos así
    // para que un error de dedo (--pendiente) no se ignore en silencio.
    options: {
      prioridad: { type: 'string', short: 'p', default: 'media' },
      pendientes: { type: 'boolean', default: false },
      ayuda: { type: 'boolean', short: 'h', default: false },
    },
  });

  // parseArgs solo sabe que prioridad es un texto; validar QUÉ texto es trabajo nuestro.
  if (!PRIORIDADES.includes(values.prioridad)) {
    throw new Error(`Prioridad inválida: "${values.prioridad}". Usa baja, media o alta`);
  }

  // Desestructuración con rest: el primero es el comando y el resto, sus argumentos.
  // Si positionals está vacío, comando queda undefined y argumentos [].
  const [comando, ...argumentos] = positionals;

  // values es un objeto sin prototipo (Object.create(null)), para que una opción llamada
  // "toString" no choque con nada. Lo copiamos con spread a un objeto normal, que es lo que
  // esperaría cualquiera que use la función.
  return { comando, argumentos, opciones: { ...values } };
}
