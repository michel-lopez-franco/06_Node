# Opciones

Completa dos funciones que leen opciones de una lista de argumentos (lo que devuelve
`process.argv.slice(2)`):

- `leerOpcion(args, nombre)`: devuelve el valor de `--<nombre>`. Acepta las dos formas,
  `--nombre Ana` y `--nombre=Ana`. Devuelve `undefined` si la opción no está o no trae valor
  (por ejemplo, si después viene otra opción como `--verbose`).
- `tieneBandera(args, nombre)`: devuelve `true` si `--<nombre>` aparece en la lista y `false`
  si no.

Una opción con otro nombre que empieza igual (`--nombrecompleto`) no cuenta como `--nombre`.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/01-que-es-node/03-opciones
```
