# Etapa 1: CLI de tareas en memoria

Primera versión del proyecto del curso: una herramienta de línea de comandos para manejar
tareas. Corresponde al **módulo 3 (Módulos y npm)**.

En esta etapa las tareas viven **en memoria**: cada ejecución empieza con tres tareas de
ejemplo y los cambios se pierden al terminar. En la etapa 2 se guardan en `tareas.json`.

## Uso

Desde esta carpeta (no necesita `npm install`: no tiene dependencias):

```sh
node src/cli.js ayuda
node src/cli.js listar
node src/cli.js listar --pendientes
node src/cli.js agregar Comprar pan --prioridad alta
node src/cli.js completar 2
node src/cli.js eliminar 3
node src/cli.js --version
npm start -- listar          # lo mismo, con el script "start"
```

Opcional: `npm link` instala el comando `tareas` en tu sistema (apunta a esta carpeta), y
`npm unlink -g tareas-cli` lo quita.

Códigos de salida: `0` todo bien, `1` no se pudo hacer (p. ej., el id no existe), `2` mal uso.

## Estructura

```txt
src/
  cli.js                 punto de entrada: lee process.argv, imprime y pone el código de salida
  argumentos.js          interpreta los argumentos con util.parseArgs
  comandos.js            ejecuta cada comando y decide mensaje y código
  formato.js             cómo se ve una tarea en la terminal
  lista-de-tareas.js     la clase ListaDeTareas y sus reglas
  datos-de-ejemplo.js    la lista inicial
test/                    tests (npm test)
```

## Tests

```sh
npm test
```
