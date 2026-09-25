# Una vez

Completa `unaVez(fn)`. Devuelve una función nueva que llama a `fn` **solo la primera vez** y
recuerda su resultado. Las llamadas siguientes devuelven ese mismo resultado sin volver a
llamar a `fn`:

```js
const iniciar = unaVez(() => {
  console.log('Conectando...');
  return 'conectado';
});
iniciar(); // imprime "Conectando..." y devuelve 'conectado'
iniciar(); // no imprime nada y devuelve 'conectado'
```

- Los argumentos de la primera llamada se pasan a `fn`.
- Debe funcionar aunque `fn` devuelva `undefined`, `0` o `false`.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/02-repaso-javascript/05-una-vez
```
