# Código de salida

Completa `procesarDivision(args)` para un programa que se usa así:
`node dividir.js <dividendo> <divisor>`. Recibe los argumentos del usuario y devuelve
`{ codigo, mensaje }`:

| Situación                              | `codigo` | `mensaje`                                    |
| -------------------------------------- | -------- | -------------------------------------------- |
| No vienen exactamente 2 argumentos     | `2`      | `Uso: node dividir.js <dividendo> <divisor>` |
| Alguno no es un número (incluido `""`) | `1`      | `"abc" no es un número`                      |
| El divisor es 0                        | `1`      | `No se puede dividir entre cero`             |
| Todo bien                              | `0`      | El resultado como texto, por ejemplo `"2.5"` |

Cuando tus tests pasen, prueba el programa completo desde esta carpeta y revisa el código de
salida (la lección explica cómo verlo en tu terminal):

```sh
node dividir.js 10 4
node dividir.js 10 0
node dividir.js
```

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/01-que-es-node/05-codigo-de-salida
```
