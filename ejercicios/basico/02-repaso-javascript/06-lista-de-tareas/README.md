# Lista de tareas

Completa la clase `ListaDeTareas`. Guarda las tareas en un **campo privado** (`#`) y ofrece:

- `agregar(titulo)`: crea la tarea `{ id, titulo, completada: false }` y devuelve una copia.
  Los ids empiezan en 1 y aumentan de uno en uno. Quita los espacios de las orillas del título;
  si queda vacío (o no es texto), lanza el error `El título es obligatorio`.
- `completar(id)`: marca la tarea como completada. Si no existe, lanza el error
  `No existe la tarea con id <id>`, por ejemplo `No existe la tarea con id 7`.
- `pendientes()`: devuelve un arreglo con **copias** de las tareas no completadas.
- `total` (un _getter_): cuántas tareas hay, completadas o no.

Quien use la lista no debe poder modificar las tareas guardadas desde fuera: cambiar una
copia no afecta a la lista.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/02-repaso-javascript/06-lista-de-tareas
```
