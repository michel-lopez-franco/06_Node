// Una "base de datos" de mentira con una API al estilo antiguo de Node: callbacks.
// setTimeout simula que la respuesta tarda, como una consulta real a un disco o a la red.

const TAREAS = [
  { id: 1, titulo: 'Leer el módulo 4', usuarioId: 1 },
  { id: 2, titulo: 'Resolver los ejercicios', usuarioId: 1 },
];
const USUARIOS = [{ id: 1, nombre: 'Ana' }];

// Convención error primero (error-first): el callback recibe (error, resultado).
// Si todo sale bien, error es null; si algo falla, resultado no se manda.
export function buscarTarea(id, callback) {
  setTimeout(() => {
    const tarea = TAREAS.find((t) => t.id === id);
    if (tarea === undefined) {
      callback(new Error(`No existe la tarea ${id}`));
    } else {
      callback(null, tarea);
    }
  }, 50);
}

export function buscarUsuario(id, callback) {
  setTimeout(() => {
    const usuario = USUARIOS.find((u) => u.id === id);
    if (usuario === undefined) {
      callback(new Error(`No existe el usuario ${id}`));
    } else {
      callback(null, usuario);
    }
  }, 50);
}
