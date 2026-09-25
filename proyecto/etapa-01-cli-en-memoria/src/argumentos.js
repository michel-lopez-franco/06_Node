// Convierte lo que escribió el usuario en la terminal en { comando, argumentos, opciones }.
import { parseArgs } from 'node:util';
import { PRIORIDADES } from './lista-de-tareas.js';

const OPCIONES = {
  prioridad: { type: 'string', short: 'p', default: 'media' },
  pendientes: { type: 'boolean', default: false },
  ayuda: { type: 'boolean', short: 'h', default: false },
  version: { type: 'boolean', short: 'v', default: false },
};

/**
 * @param {string[]} args Argumentos del usuario (process.argv.slice(2)).
 * @returns {{ comando: string | undefined, argumentos: string[], opciones: object }}
 * @throws {Error} Con un mensaje en español si una opción no existe, no trae valor o no es válida.
 */
export function interpretarArgumentos(args) {
  let resultado;
  try {
    resultado = parseArgs({ args, options: OPCIONES, allowPositionals: true });
  } catch (error) {
    throw traducirError(error);
  }

  const { prioridad } = resultado.values;
  if (!PRIORIDADES.includes(prioridad)) {
    throw new Error(`Prioridad inválida: "${prioridad}". Usa baja, media o alta`);
  }

  const [comando, ...argumentos] = resultado.positionals;
  return { comando, argumentos, opciones: { ...resultado.values } };
}

// Los errores de parseArgs vienen en inglés. Los distinguimos por su `code` y armamos un
// mensaje en español. El nombre de la opción lo sacamos del texto original: preferimos la forma
// larga (--prioridad) y, si no hay, la corta (-x).
function traducirError(error) {
  const opcion = error.message.match(/--[\w-]+/)?.[0] ?? error.message.match(/'(-\w)/)?.[1];
  if (error.code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION') {
    return new Error(`Opción desconocida: ${opcion}`, { cause: error });
  }
  if (error.code === 'ERR_PARSE_ARGS_INVALID_OPTION_VALUE') {
    return new Error(`Falta el valor de la opción ${opcion}`, { cause: error });
  }
  return error;
}
