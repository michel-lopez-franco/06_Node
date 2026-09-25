# Con tiempo límite

Escribe `conTiempoLimite(promesa, ms)`, que devuelve una promesa nueva que:

- Se cumple o se rechaza **igual que `promesa`**, si esta termina antes de `ms` milisegundos.
- Se rechaza con el error `Se agotó el tiempo de espera (<ms> ms)`, por ejemplo
  `Se agotó el tiempo de espera (50 ms)`, si `promesa` tarda más.

Además, **no dejes temporizadores pendientes**: cuando la promesa termine a tiempo, cancela el
temporizador del límite. Si no lo haces, un programa que ya acabó se queda esperando a que ese
temporizador se cumpla.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/04-asincronia/06-con-tiempo-limite
```
