# Combinar opciones

Completa `combinarOpciones(porDefecto, opciones)`. Devuelve un **objeto nuevo** con todas las
propiedades de `porDefecto`, reemplazadas por las de `opciones` cuando vienen:

```js
combinarOpciones({ puerto: 3000, host: 'localhost' }, { puerto: 8080 });
// → { puerto: 8080, host: 'localhost' }
```

- Si una opción vale `undefined`, se ignora y se conserva el valor por defecto (`null`, `0`,
  `''` y `false` sí cuentan como valores).
- Si no se pasa `opciones`, devuelve una copia de `porDefecto`.
- No modifica ninguno de los dos objetos que recibe.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/02-repaso-javascript/02-combinar-opciones
```
