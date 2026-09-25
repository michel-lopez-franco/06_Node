// Un módulo "puerta de entrada" (en inglés se le suele llamar barrel): junta lo de varios
// archivos para que quien lo use haga un solo import.

// Reexportar: `export { ... } from` pasa las exportaciones de otro módulo sin crear
// variables en este archivo. Lo que se reexporta es el MISMO valor, no una copia; por eso
// los tests pueden comparar con === contra el original.
export { normalizarTitulo } from './titulos.js';
export { PRIORIDADES } from './prioridades.js';

// La reexportación de arriba NO crea variables locales: aquí no podríamos usar
// normalizarTitulo ni PRIORIDADES. Para usarlos dentro, también hay que importarlos.
// (Node carga cada módulo una sola vez, así que importarlo dos veces no cuesta nada.)
import { normalizarTitulo } from './titulos.js';
import { PRIORIDADES, PRIORIDAD_POR_DEFECTO } from './prioridades.js';

/**
 * Crea una tarea con el título normalizado y una prioridad válida.
 * @param {string} titulo
 * @param {string} [prioridad] 'baja', 'media' o 'alta'. Si no viene, usa la prioridad por defecto.
 * @returns {{ titulo: string, prioridad: string }}
 * @throws {Error} 'Prioridad inválida: <prioridad>' si no es una de PRIORIDADES.
 */
// El parámetro por defecto se aplica solo cuando prioridad es undefined, que es justo lo que
// pasa cuando no la mandan.
export function crearTarea(titulo, prioridad = PRIORIDAD_POR_DEFECTO) {
  // includes compara textos exactos, así que 'ALTA' no es 'alta'. Es a propósito: preferimos
  // avisar que aceptar variantes que luego habría que normalizar en todos lados.
  if (!PRIORIDADES.includes(prioridad)) {
    throw new Error(`Prioridad inválida: ${prioridad}`);
  }
  return { titulo: normalizarTitulo(titulo), prioridad };
}

// PRIORIDAD_POR_DEFECTO se importó pero no se reexporta: sigue siendo un detalle interno.
// Alternativa: import { normalizarTitulo } from ... y luego export { normalizarTitulo };
// hace lo mismo en dos pasos y sirve cuando además lo usas dentro del archivo.
