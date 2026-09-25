# Generador de ids

Completa `crearGeneradorDeIds(prefijo, inicio)`. Devuelve una **función** que, cada vez que
se llama, entrega el siguiente id:

```js
const siguienteId = crearGeneradorDeIds('tarea');
siguienteId(); // 'tarea-1'
siguienteId(); // 'tarea-2'
```

- `inicio` es opcional (por defecto `1`): `crearGeneradorDeIds('p', 10)` empieza en `'p-10'`.
- Cada generador lleva su propia cuenta: crear uno nuevo no afecta a los demás.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/02-repaso-javascript/04-generador-de-ids
```
