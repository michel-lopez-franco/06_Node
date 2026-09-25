# De callback a promesa

`api-vieja.js` tiene `buscarLibro(isbn, callback)`, una función con _callback_ error-first.
Escribe dos formas de usarla con promesas, **sin** `util.promisify`:

- `buscarLibroPromesa(isbn)`: devuelve una promesa que se cumple con el libro o se rechaza
  con el **mismo** error que manda la API vieja.
- `promisificar(fn)`: recibe **cualquier** función error-first (su último parámetro es el
  callback) y devuelve una función nueva que acepta los mismos argumentos, sin el callback, y
  devuelve una promesa. Es tu propio `util.promisify`.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/04-asincronia/03-de-callback-a-promesa
```
