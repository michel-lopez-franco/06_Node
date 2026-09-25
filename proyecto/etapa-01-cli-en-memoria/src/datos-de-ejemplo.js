// En esta etapa las tareas viven en memoria: cada vez que ejecutas la CLI, la lista empieza
// con estas tareas de ejemplo y los cambios se pierden al terminar.
// En la etapa 2 la lista se carga de un archivo tareas.json y se guarda ahí.
import { ListaDeTareas } from './lista-de-tareas.js';

/** @returns {ListaDeTareas} Una lista nueva con tres tareas de ejemplo. */
export function crearListaDeEjemplo() {
  const lista = new ListaDeTareas();
  lista.agregar('Instalar Node 24');
  lista.agregar('Leer el módulo 3', { prioridad: 'alta' });
  lista.agregar('Probar npm link', { prioridad: 'baja' });
  lista.completar(1);
  return lista;
}
