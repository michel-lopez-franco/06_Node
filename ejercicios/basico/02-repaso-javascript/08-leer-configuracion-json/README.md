# Leer configuración JSON

Completa `leerConfiguracionJson(texto)`. Recibe el contenido de un archivo de configuración
en formato JSON y devuelve un objeto con los valores por defecto `puerto: 3000` y
`host: 'localhost'`, reemplazados por los que traiga el texto:

```js
leerConfiguracionJson('{"puerto": 8080}'); // → { puerto: 8080, host: 'localhost' }
```

- Si el texto no es JSON válido, lanza un `Error` con el mensaje
  `La configuración no es JSON válido` y, en su propiedad `cause`, el error original de
  `JSON.parse` (un `SyntaxError`).
- Si el JSON es válido pero no es un objeto (un arreglo, `null`, un número o un texto), lanza
  el error `La configuración debe ser un objeto`.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/02-repaso-javascript/08-leer-configuracion-json
```
