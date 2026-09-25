# Validar tarea

Este ejercicio tiene dos partes.

1. Completa la clase `ErrorDeValidacion`, que extiende a `Error`. Su constructor recibe
   `(mensaje, campo)`; el error debe tener `message`, `name` igual a `'ErrorDeValidacion'` y
   `campo`.
2. Completa `validarTarea(datos)`. Recibe `{ titulo, prioridad }` y devuelve una tarea limpia
   `{ titulo, prioridad }`: el título sin espacios en las orillas y la prioridad `'normal'` si
   no viene. Si algo está mal, lanza un `ErrorDeValidacion`:

   | Problema                                        | `message`                                    | `campo`       |
   | ----------------------------------------------- | -------------------------------------------- | ------------- |
   | Falta el título, no es texto o está vacío       | `El título es obligatorio`                   | `'titulo'`    |
   | El título (sin espacios) pasa de 100 caracteres | `El título no puede pasar de 100 caracteres` | `'titulo'`    |
   | La prioridad no es `baja`, `normal` ni `alta`   | `La prioridad debe ser baja, normal o alta`  | `'prioridad'` |

Edita `solucion.js` y comprueba tu avance con:

```sh
npm test -- ejercicios/basico/02-repaso-javascript/07-validar-tarea
```
