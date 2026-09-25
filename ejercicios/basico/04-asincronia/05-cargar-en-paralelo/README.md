# Cargar en paralelo

Con `obtenerTarea(id)` de `api.js`, escribe dos funciones **async** que cargan varias tareas
**al mismo tiempo** (no una tras otra):

- `cargarTodas(ids)`: se cumple con el arreglo de tareas **en el mismo orden que `ids`**. Si
  alguna falla, se rechaza con ese error.
- `cargarLasQueSePuedan(ids)`: nunca se rechaza por una tarea que falle. Se cumple con
  `{ tareas, errores }`: las tareas que sí se cargaron (en el orden de `ids`) y los mensajes
  de las que fallaron, por ejemplo `['No existe la tarea 9']`.

Con un arreglo vacío, `cargarTodas([])` da `[]` y `cargarLasQueSePuedan([])` da
`{ tareas: [], errores: [] }`.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/04-asincronia/05-cargar-en-paralelo
```
