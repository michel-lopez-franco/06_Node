# PLAN — Curso de Node.js (CUCEI)

Estados: `pendiente` · `en progreso` · `revisado` (solo el profesor marca `revisado`).

## Infraestructura

| Tarea                                                 | Estado                  |
| ----------------------------------------------------- | ----------------------- |
| Paso 1: esqueleto, Starlight, CLAUDE.md, PLAN.md y CI | revisado                |
| Desplegable "Ver solución" en `<Ejercicio>`           | revisado                |
| Paso 2: piloto (módulos 0 y 1 completos)              | revisado                |
| Paso 3: resto del básico + etapas E1–E3               | en progreso             |
| Paso 4: nivel intermedio + etapas E4–E9               | pendiente               |
| Paso 5: nivel pro + etapas E10–E17                    | pendiente               |
| Hosting del sitio y forma de entrega de ejercicios    | pendiente (por decidir) |

## Temario

### Nivel básico — Node sin frameworks

| #   | Módulo                          | Contenido clave                                                                                                                                                   | Proyecto                                        | Estado                            |
| --- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------- |
| 0   | Preparación                     | Terminal, Node con fnm/nvm, VS Code, git, cómo usar el curso. `npm test` como **caja negra** hasta el módulo 6 (verde = bien, rojo = falta)                       | —                                               | en progreso — listo para revisión |
| 1   | ¿Qué es Node?                   | V8, libuv, REPL, `node archivo.js`, `process.argv`, `process.env`, códigos de salida                                                                              | —                                               | en progreso — listo para revisión |
| 2   | Repaso de JavaScript (opcional) | Repaso **corto y opcional**: desestructuración, spread, clases, closures, errores, `structuredClone`. Enfocado en lo que se usa en Node; los alumnos ya vieron JS | —                                               | en progreso — listo para revisión |
| 3   | Módulos y npm                   | ESM vs CommonJS, `package.json`, scripts, semver, `npx`, lockfile                                                                                                 | E1: CLI de tareas en memoria (`util.parseArgs`) | en progreso — listo para revisión |
| 4   | Asincronía                      | Event loop, callbacks → promesas → `async`/`await`, `Promise.all`, timers, errores asíncronos                                                                     | —                                               | pendiente                         |
| 5   | Archivos y rutas                | `node:fs/promises`, `node:path`, JSON, `node:url`, `import.meta.dirname`                                                                                          | E2: persistencia en `tareas.json`               | pendiente                         |
| 6   | Pruebas con `node:test`         | `test`, `describe`, `assert`, `--watch`, TDD básico. Aquí se "abre la caja negra" de `npm test`                                                                   | E3: suite de tests de la CLI                    | pendiente                         |

### Nivel intermedio — De script a API

| #   | Módulo                   | Contenido clave                                                                                | Proyecto                              | Estado    |
| --- | ------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------- | --------- |
| 7   | Eventos y streams        | `EventEmitter`, streams readable/writable/transform, `pipeline`, `readline`                    | E4: importar/exportar CSV con streams | pendiente |
| 8   | HTTP nativo              | `node:http`, request/response, ruteo a mano, cuerpo JSON, `fetch` como cliente                 | E5: servidor HTTP sin framework       | pendiente |
| 9   | Fastify                  | Rutas, plugins, hooks, validación con JSON Schema, manejo de errores, `inject` para tests      | E6: migración a Fastify               | pendiente |
| 10  | Diseño de APIs REST      | Recursos, verbos, códigos de estado, paginación, filtros, OpenAPI (`@fastify/swagger`)         | E7: proyectos + tareas, documentación | pendiente |
| 11  | PostgreSQL               | SQL esencial, Docker Compose, `pg`, pool, consultas parametrizadas, migraciones, transacciones | E8: repositorio sobre Postgres        | pendiente |
| 12  | Configuración y entornos | `--env-file`, validación de configuración, dev/test/prod, logging con pino                     | E9: configuración por entorno         | pendiente |

### Nivel pro — Listo para producción

| #   | Módulo                       | Contenido clave                                                                              | Proyecto                    | Estado    |
| --- | ---------------------------- | -------------------------------------------------------------------------------------------- | --------------------------- | --------- |
| 13  | Autenticación y autorización | `node:crypto` (scrypt), JWT, cookies, roles, dueño del recurso                               | E10: usuarios y login       | pendiente |
| 14  | Testing profesional          | Integración con BD de pruebas, `mock` de `node:test`, fixtures, cobertura                    | E11: cobertura ≥ 80 %       | pendiente |
| 15  | Arquitectura                 | Capas (rutas/servicios/repos), inyección de dependencias, errores de dominio, SOLID aplicado | E12: refactor por capas     | pendiente |
| 16  | TypeScript en Node           | Type stripping nativo, `tsc --noEmit`, tipado de Fastify                                     | E13: migración a TS         | pendiente |
| 17  | Tiempo real                  | SSE y WebSockets (`@fastify/websocket`)                                                      | E14: notificaciones en vivo | pendiente |
| 18  | Rendimiento y concurrencia   | `--cpu-prof`, `worker_threads`, cluster, caché, autocannon                                   | E15: reportes en un worker  | pendiente |
| 19  | Seguridad                    | OWASP API Top 10, rate limiting, CORS, helmet, `npm audit`, secretos                         | E16: endurecimiento         | pendiente |
| 20  | Despliegue y operación       | Dockerfile multi-stage, GitHub Actions, health checks, apagado ordenado, observabilidad      | E17: API desplegada         | pendiente |

Cierre: proyecto final libre con rúbrica — `pendiente`.

## Registro de avances

- **2026-09-24 — Paso 1 (esqueleto).** Workspace npm (raíz + `sitio/`), Astro 7 + Starlight 0.42 en
  español con sidebar por nivel, páginas de temario e introducción de cada nivel, componentes
  `<Ejemplo>` y `<Ejercicio>`, scripts (`probar`, `probar-soluciones`, `verificar-ejemplos`,
  `nuevo-ejercicio`), ESLint + Prettier, `docker-compose.yml` (Postgres 17), CI de GitHub
  Actions, `CLAUDE.md` y este `PLAN.md`. Listo para revisión.
- **2026-09-25 — Desplegable "Ver solución".** `<Ejercicio>` muestra, debajo de la tarjeta, el aviso
  "Intenta resolverlo antes de ver la solución" y un `<details>` cerrado por defecto con todos los
  archivos de `soluciones/<ruta>/` (`solucion.js` primero). El build falla si falta la solución.
  Probado con contenido temporal (ya eliminado). Listo para revisión.
- **2026-09-25 — Paso 2 (piloto: módulos 0 y 1).** Módulo 0 (Preparación): 4 lecciones (terminal,
  instalar Node con fnm, editor y git con `clone`, cómo usar el curso), 2 ejemplos y 2 ejercicios
  (`saludo`, `iniciales`). Módulo 1 (¿Qué es Node?): 5 lecciones (Node por dentro, REPL y scripts,
  argumentos, variables de entorno, códigos de salida), 9 ejemplos y 5 ejercicios
  (`argumentos-de-usuario`, `sumar-argumentos`, `opciones`, `configuracion-desde-env`,
  `codigo-de-salida` con un `dividir.js` ejecutable). Instrucciones independientes del sistema
  operativo con pestañas macOS/Linux/Windows sincronizadas (`syncKey="so"`). El sidebar ahora
  arma un grupo por módulo con el título de su `index.mdx`. Listo para revisión.
- **2026-09-25 — Módulo 2 (Repaso de JavaScript, opcional).** 5 lecciones cortas
  (desestructuración/spread/rest con `?.` y `??`, referencias y copias con `structuredClone`,
  closures, clases, errores con `extends Error`, `cause`, `finally` y `error.code`), 12 ejemplos
  y 8 ejercicios (`describir-tarea`, `combinar-opciones`, `marcar-completada`,
  `generador-de-ids`, `una-vez`, `lista-de-tareas`, `validar-tarea`,
  `leer-configuracion-json`). El `index.mdx` propone resolver los ejercicios primero para decidir
  si saltarse el módulo. `ListaDeTareas` anticipa la E1. Listo para revisión.
- **2026-09-25 — Módulo 3 (Módulos y npm) y etapa E1.** 5 lecciones (módulos ES con enlaces vivos,
  reexportaciones e importación de JSON; CommonJS y su convivencia con ESM; `package.json` y
  scripts con `npm run`/`node --run`; dependencias, semver, lockfile y `npx`; `util.parseArgs`),
  12 ejemplos (más 4 módulos auxiliares y un `package.json` propio en la carpeta del módulo) y 5
  ejercicios (`exportar-formato`, `reunir-modulos`, `de-commonjs-a-esm`, `rango-semver`,
  `interpretar-argumentos`). En los ejercicios 1–3 el alumno escribe los `export`, así que con
  el stub los tests fallan al importar (el README lo avisa). La práctica de `npm install` se hace
  en una carpeta propia fuera del repo, para mantener el nivel básico sin dependencias.
  Etapa E1 en `proyecto/etapa-01-cli-en-memoria/` (comandos agregar/listar/completar/eliminar,
  códigos de salida 0/1/2, `bin` para `npm link`, 24 tests) y su página en el sitio.
  Infraestructura: `verificar` y `<Ejemplo>` aceptan `.cjs`; nuevo componente
  `<ArchivoDelProyecto>`; nuevo `npm run test:proyecto` (también en CI); CLAUDE.md actualizado.
  Listo para revisión.
