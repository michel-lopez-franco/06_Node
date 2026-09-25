// Ejecuta un comando sobre la lista y dice qué mostrar y con qué código terminar.
// No imprime nada ni termina el programa: eso lo hace cli.js. Así se puede probar fácilmente.
import { formatearLista, formatearTarea } from './formato.js';

// Códigos de salida (módulo 1): 0 = todo bien, 1 = error al ejecutar, 2 = mal uso.
export const CODIGOS = { OK: 0, ERROR: 1, MAL_USO: 2 };

export const AYUDA = `Uso: tareas <comando> [argumentos] [opciones]

Comandos:
  agregar <título>     Agrega una tarea (--prioridad baja|media|alta, -p)
  listar               Muestra las tareas (--pendientes para ver solo las pendientes)
  completar <id>       Marca una tarea como completada
  eliminar <id>        Elimina una tarea
  ayuda                Muestra esta ayuda

Opciones generales:
  -h, --ayuda          Muestra esta ayuda
  -v, --version        Muestra la versión`;

// Un error de uso: el usuario escribió mal el comando. Se distingue de los demás errores
// por su clase (módulo 2) para terminar con el código 2 en lugar del 1.
export class ErrorDeUso extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = 'ErrorDeUso';
  }
}

/**
 * @param {import('./lista-de-tareas.js').ListaDeTareas} lista
 * @param {{ comando?: string, argumentos: string[], opciones: object }} entrada
 * @returns {{ codigo: number, mensaje: string }}
 */
export function ejecutar(lista, { comando, argumentos, opciones }) {
  if (opciones.ayuda || comando === 'ayuda') {
    return { codigo: CODIGOS.OK, mensaje: AYUDA };
  }
  if (comando === undefined) {
    return { codigo: CODIGOS.MAL_USO, mensaje: `Falta el comando.\n\n${AYUDA}` };
  }

  const comandos = { agregar, listar, completar, eliminar };
  // Object.hasOwn evita que 'toString' o 'constructor' cuenten como comandos.
  if (!Object.hasOwn(comandos, comando)) {
    return {
      codigo: CODIGOS.MAL_USO,
      mensaje: `Comando desconocido: "${comando}". Usa "tareas ayuda" para ver los comandos.`,
    };
  }

  try {
    return { codigo: CODIGOS.OK, mensaje: comandos[comando](lista, argumentos, opciones) };
  } catch (error) {
    if (error instanceof ErrorDeUso) {
      return { codigo: CODIGOS.MAL_USO, mensaje: error.message };
    }
    // Errores de la lista (título vacío, id que no existe...): el uso fue correcto, pero no se
    // pudo hacer lo que se pidió.
    return { codigo: CODIGOS.ERROR, mensaje: error.message };
  }
}

// Cada comando devuelve el texto a mostrar o lanza un error.

function agregar(lista, argumentos, opciones) {
  // Así funciona tanto `agregar "Comprar pan"` como `agregar Comprar pan`.
  const titulo = argumentos.join(' ');
  if (titulo === '') {
    throw new ErrorDeUso('Uso: tareas agregar <título>');
  }
  const tarea = lista.agregar(titulo, { prioridad: opciones.prioridad });
  return `Agregada: ${formatearTarea(tarea)}`;
}

function listar(lista, _argumentos, opciones) {
  return formatearLista(opciones.pendientes ? lista.pendientes() : lista.todas());
}

function completar(lista, argumentos) {
  const tarea = lista.completar(leerId(argumentos, 'completar'));
  return `Completada: ${formatearTarea(tarea)}`;
}

function eliminar(lista, argumentos) {
  const tarea = lista.eliminar(leerId(argumentos, 'eliminar'));
  return `Eliminada: ${formatearTarea(tarea)}`;
}

function leerId(argumentos, comando) {
  const id = Number(argumentos[0]);
  // Number.isInteger descarta NaN ('x'), decimales ('1.5') e Infinity.
  if (argumentos.length !== 1 || !Number.isInteger(id) || id < 1) {
    throw new ErrorDeUso(`Uso: tareas ${comando} <id> (un número entero positivo)`);
  }
  return id;
}
