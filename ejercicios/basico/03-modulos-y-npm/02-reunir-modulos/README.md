# Reunir módulos

En esta carpeta ya hay dos módulos terminados: `titulos.js` y `prioridades.js`. Haz que
`solucion.js` sea la **puerta de entrada** que los reúne, para que quien lo use importe todo de
un solo lugar:

1. **Reexporta** `normalizarTitulo` (de `titulos.js`) y `PRIORIDADES` (de `prioridades.js`)
   sin copiarlos: tienen que ser exactamente los mismos.
2. Exporta una función nueva, `crearTarea(titulo, prioridad)`, que devuelva
   `{ titulo, prioridad }` con el título normalizado. Si no recibe prioridad, usa
   `PRIORIDAD_POR_DEFECTO`. Si la prioridad no está en `PRIORIDADES`, lanza el error
   `Prioridad inválida: <prioridad>`, por ejemplo `Prioridad inválida: urgente`.

`PRIORIDAD_POR_DEFECTO` se usa por dentro, pero **no** se reexporta.

No edites `titulos.js` ni `prioridades.js`. Mientras falten las exportaciones, todos los tests
fallan con un `SyntaxError` que dice qué exportación no encuentran.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/03-modulos-y-npm/02-reunir-modulos
```
