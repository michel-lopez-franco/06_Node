# Esperar

Escribe `esperar(ms, valor)`, que devuelve una **promesa** que se cumple con `valor` después de
`ms` milisegundos. Hazlo tú con `new Promise` y `setTimeout` (sin `node:timers/promises`).

- `await esperar(100, 'listo')` tarda al menos 100 ms y da `'listo'`.
- Si no mandas `valor`, la promesa se cumple con `undefined`.
- Si `ms` no es un número o es negativo, la promesa se **rechaza** con un `TypeError` con el
  mensaje `ms debe ser un número mayor o igual a 0`. Ojo: tiene que ser una promesa rechazada,
  no un error lanzado en el momento.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/04-asincronia/02-esperar
```
