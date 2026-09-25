# Node.js desde cero — CUCEI

Curso de Node.js para Ingeniería en Computación: de cero a nivel profesional, en modo
autoestudio. Las lecciones están en el sitio; este repositorio tiene los ejemplos, los
ejercicios y el proyecto.

## Requisitos

- Node.js 24 o superior (`node -v`). Con fnm o nvm: `fnm use` / `nvm use`.
- Git.
- Docker, solo a partir del módulo 11.

## Empezar

```sh
npm install
npm run dev        # abre el sitio del curso en http://localhost:4321
npm test           # corre los tests de tus ejercicios
```

Para probar solo un ejercicio o un módulo:

```sh
npm test -- ejercicios/basico/04-asincronia
```

## Qué hay en cada carpeta

| Carpeta       | Contenido                                                          |
| ------------- | ------------------------------------------------------------------ |
| `sitio/`      | El sitio del curso (Astro Starlight)                               |
| `ejemplos/`   | El código de las lecciones; puedes ejecutarlo con `node`           |
| `ejercicios/` | Lo que tú resuelves: edita `solucion.js` hasta que pasen los tests |
| `soluciones/` | Soluciones de referencia. Úsalas solo después de intentarlo        |
| `proyecto/`   | La API de tareas, una carpeta completa por etapa                   |
