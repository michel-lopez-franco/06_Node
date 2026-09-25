# Rango semver

npm decide qué versión de una dependencia instalar comparándola con el rango de tu
`package.json`. Escribe `cumpleRango(version, rango)`, que devuelve `true` si la versión cae
dentro del rango y `false` si no.

Las versiones tienen la forma `MAYOR.MENOR.PARCHE` (tres números, como `1.4.2`). Los rangos
pueden ser:

| Rango    | Acepta                           |
| -------- | -------------------------------- |
| `1.2.3`  | solo `1.2.3`                     |
| `~1.2.3` | desde `1.2.3` y antes de `1.3.0` |
| `^1.2.3` | desde `1.2.3` y antes de `2.0.0` |
| `^0.2.3` | desde `0.2.3` y antes de `0.3.0` |
| `^0.0.3` | solo `0.0.3`                     |

Con mayor `0`, el `^` es más estricto: en la etapa `0.x` cualquier cambio de versión menor puede
romper cosas.

Errores:

- Si `version` no tiene la forma `MAYOR.MENOR.PARCHE`: `Versión inválida: "1.2"`.
- Si `rango` no es de los de la tabla (por ejemplo `>=1.0.0` o `^1.2`):
  `Rango no soportado: ">=1.0.0"`.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/03-modulos-y-npm/04-rango-semver
```
