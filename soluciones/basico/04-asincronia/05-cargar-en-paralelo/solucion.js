import { obtenerTarea } from './api.js';

/**
 * Carga varias tareas en paralelo.
 * @param {number[]} ids
 * @returns {Promise<{ id: number, titulo: string }[]>} En el mismo orden que ids.
 */
export async function cargarTodas(ids) {
  // ids.map(obtenerTarea) llama a obtenerTarea para cada id EN ESTE MOMENTO: todas las
  // peticiones arrancan juntas y obtenemos un arreglo de promesas. Promise.all espera a todas
  // y entrega los resultados en el orden del arreglo, no en el orden en que terminaron.
  return Promise.all(ids.map((id) => obtenerTarea(id)));

  // El error clásico: un for con await adentro.
  //   for (const id of ids) tareas.push(await obtenerTarea(id));
  // Funciona, pero espera a cada una antes de pedir la siguiente: 5 veces más lento aquí.
}

/**
 * Carga varias tareas en paralelo sin fallar por las que no existan.
 * @param {number[]} ids
 * @returns {Promise<{ tareas: { id: number, titulo: string }[], errores: string[] }>}
 */
export async function cargarLasQueSePuedan(ids) {
  // allSettled nunca se rechaza: espera a todas y describe cómo terminó cada una con
  // { status: 'fulfilled', value } o { status: 'rejected', reason }, en el orden de ids.
  const resultados = await Promise.allSettled(ids.map((id) => obtenerTarea(id)));

  const tareas = [];
  const errores = [];
  for (const resultado of resultados) {
    if (resultado.status === 'fulfilled') {
      tareas.push(resultado.value);
    } else {
      errores.push(resultado.reason.message);
    }
  }
  return { tareas, errores };
}

// Nota: usamos (id) => obtenerTarea(id) y no ids.map(obtenerTarea) a secas, porque map
// también le pasaría el índice y el arreglo como argumentos extra. Aquí no pasaría nada, pero
// con funciones que aceptan parámetros opcionales es una trampa conocida.
