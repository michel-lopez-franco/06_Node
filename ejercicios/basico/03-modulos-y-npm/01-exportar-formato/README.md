# Exportar formato

Completa dos funciones que convierten tareas en texto y **expórtalas**:

- `formatearTarea(tarea)`, como **exportación con nombre**: recibe
  `{ id, titulo, completada }` y devuelve `[x] #1 Leer` si está completada o `[ ] #1 Leer` si no.
- `formatearLista(tareas)`, como **exportación por defecto**: devuelve una línea por tarea
  (usando `formatearTarea`), unidas con saltos de línea (`'\n'`). Si el arreglo está vacío,
  devuelve `No hay tareas.`

El módulo no debe exportar nada más.

Mientras no exportes las funciones, **todos** los tests fallan con un error como
`SyntaxError: The requested module './solucion.js' does not provide an export named ...`:
los tests no encuentran lo que buscan.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/03-modulos-y-npm/01-exportar-formato
```
