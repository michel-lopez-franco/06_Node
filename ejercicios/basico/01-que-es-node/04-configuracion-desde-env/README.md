# Configuración desde el entorno

Completa `leerConfiguracion(env)`. Recibe un objeto con la forma de `process.env` y devuelve
`{ puerto, modo, depurar }`:

| Variable  | Resultado | Si no viene o viene vacía | Reglas                                                             |
| --------- | --------- | ------------------------- | ------------------------------------------------------------------ |
| `PUERTO`  | `puerto`  | `3000`                    | Número entero de 1 a 65535; si no, lanza un error                  |
| `MODO`    | `modo`    | `'desarrollo'`            | Solo `desarrollo`, `produccion` o `pruebas`; si no, lanza un error |
| `DEPURAR` | `depurar` | `false`                   | `true` solo con `'true'` o `'1'` (sin importar mayúsculas)         |

Mensajes de error:

- `PUERTO debe ser un entero entre 1 y 65535 (recibí "abc")`
- `MODO debe ser desarrollo, produccion o pruebas (recibí "staging")`

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/01-que-es-node/04-configuracion-desde-env
```
