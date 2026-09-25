# De CommonJS a ESM

`solucion.js` es un módulo que alguien escribió en **CommonJS** (`require` y
`module.exports`). Funciona bien, pero en este repositorio el `package.json` dice
`"type": "module"`, así que Node lo trata como ESM y truena con:

```txt
ReferenceError: require is not defined in ES module scope, you can use import instead
```

**Conviértelo a ESM** sin cambiar lo que hace:

- Cambia el `require` por un `import`.
- Exporta `recortarTitulo`, `resumir` y `LIMITE_TITULO` como **exportaciones con nombre**.
  Nada más: sin exportación por defecto.

No cambies la lógica de las funciones; solo la forma de importar y exportar.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/03-modulos-y-npm/03-de-commonjs-a-esm
```
