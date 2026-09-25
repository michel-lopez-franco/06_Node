# Predecir el orden

Abre `programa.js` y lee la parte marcada como "el programa". Cada `anotar('X')` registra una
letra en el momento en que se ejecuta.

**Sin ejecutarlo**, predice en qué orden se registran las seis letras (`A` a `F`) y escribe tu
predicción en `predecirOrden()`, como un arreglo: `['A', 'B', ...]`.

Luego comprueba. Si fallas, antes de ver la solución vuelve a la lección del event loop y
revisa qué es síncrono, qué es una microtarea y qué es un temporizador. Pista: el cuerpo de una
función `async` se ejecuta de forma síncrona **hasta el primer `await`**.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/04-asincronia/01-predecir-el-orden
```
