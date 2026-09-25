# Interpretar argumentos

Escribe `interpretarArgumentos(args)` con `parseArgs` de `node:util`. Recibe los argumentos
del usuario (lo que devuelve `process.argv.slice(2)`) de una CLI de tareas, como
`agregar Comprar pan --prioridad alta`, y devuelve:

```js
{
  comando: 'agregar',             // el primer argumento sin guiones, o undefined si no hay
  argumentos: ['Comprar', 'pan'], // el resto de los argumentos sin guiones
  opciones: { prioridad: 'alta', pendientes: false, ayuda: false },
}
```

Opciones que acepta:

| Opción         | Corta | Tipo      | Por defecto |
| -------------- | ----- | --------- | ----------- |
| `--prioridad`  | `-p`  | con valor | `'media'`   |
| `--pendientes` |       | bandera   | `false`     |
| `--ayuda`      | `-h`  | bandera   | `false`     |

- Si la prioridad no es `baja`, `media` o `alta`, lanza el error
  `Prioridad inválida: "urgente". Usa baja, media o alta`.
- Si llega una opción desconocida o `--prioridad` sin valor, deja que `parseArgs` lance su
  propio error (los tests revisan su `code`).
- `opciones` debe ser un objeto normal: copia los valores de `values` en un objeto nuevo.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/03-modulos-y-npm/05-interpretar-argumentos
```
