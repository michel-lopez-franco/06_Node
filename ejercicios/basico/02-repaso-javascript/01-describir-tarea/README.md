# Describir tarea

Completa `describirTarea(tarea)`. Recibe un objeto con `titulo` y, de forma opcional,
`prioridad` y `etiquetas`, y devuelve un texto de una línea:

- `{ titulo: 'Comprar pan' }` → `'Comprar pan [normal]'`
- `{ titulo: 'Pagar luz', prioridad: 'alta', etiquetas: ['casa', 'urgente'] }` →
  `'Pagar luz [alta] #casa #urgente'`

Si no hay `prioridad`, usa `'normal'`. Si no hay etiquetas (o la lista está vacía), el texto
termina después de los corchetes, sin espacio extra. Usa desestructuración en el parámetro.

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/02-repaso-javascript/01-describir-tarea
```
