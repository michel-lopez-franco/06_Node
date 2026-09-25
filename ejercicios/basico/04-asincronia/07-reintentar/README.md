# Reintentar

Una petición por la red a veces falla por algo pasajero, y basta con volver a intentarlo.
Escribe la función **async** `reintentar(fn, opciones)`:

- Llama a `fn(intento)` (el número de intento, empezando en 1) y espera su resultado. `fn`
  normalmente es async, pero también puede lanzar un error de forma síncrona: cuenta igual
  como fallo.
- Si se cumple, `reintentar` se cumple con ese valor y ya no vuelve a llamar a `fn`.
- Si falla, espera `opciones.esperaMs` milisegundos y lo intenta otra vez, hasta
  `opciones.intentos` veces en total.
- Si falla todas las veces, se rechaza con el error del **último** intento.

Valores por defecto: `intentos: 3` y `esperaMs: 0`. Si `intentos` es menor que 1, se rechaza
con un `RangeError` con el mensaje `intentos debe ser al menos 1`.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/04-asincronia/07-reintentar
```
