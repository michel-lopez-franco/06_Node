# Resumen de usuario

Con las funciones de `api.js` (`obtenerUsuario` y `obtenerTareas`, que devuelven promesas),
escribe la función **async** `resumenDeUsuario(id)`, que se cumple con:

```js
{ nombre: 'Ana', total: 3, pendientes: 2 }
```

- `total`: cuántas tareas tiene el usuario; `pendientes`: cuántas no están completadas.
- Un usuario sin tareas tiene `total: 0` y `pendientes: 0`.
- Si el usuario no existe, se rechaza con un error nuevo con el mensaje
  `No se pudo cargar el resumen del usuario <id>`, y con el error original de la API en su
  `cause` (lo viste en el módulo 2).

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/04-asincronia/04-resumen-de-usuario
```
