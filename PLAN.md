# PLAN — Curso de Node.js (CUCEI)

Estados: `pendiente` · `en progreso` · `revisado` (solo el profesor marca `revisado`).

## Infraestructura

| Tarea                                                 | Estado                            |
| ----------------------------------------------------- | --------------------------------- |
| Paso 1: esqueleto, Starlight, CLAUDE.md, PLAN.md y CI | en progreso — listo para revisión |
| Paso 2: piloto (módulos 0 y 1 completos)              | pendiente                         |
| Paso 3: resto del básico + etapas E1–E3               | pendiente                         |
| Paso 4: nivel intermedio + etapas E4–E9               | pendiente                         |
| Paso 5: nivel pro + etapas E10–E17                    | pendiente                         |
| Hosting del sitio y forma de entrega de ejercicios    | pendiente (por decidir)           |

## Temario

### Nivel básico — Node sin frameworks

| #   | Módulo                          | Contenido clave                                                                                                                                                   | Proyecto                                        | Estado    |
| --- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------- |
| 0   | Preparación                     | Terminal, Node con fnm/nvm, VS Code, git, cómo usar el curso. `npm test` como **caja negra** hasta el módulo 6 (verde = bien, rojo = falta)                       | —                                               | pendiente |
| 1   | ¿Qué es Node?                   | V8, libuv, REPL, `node archivo.js`, `process.argv`, `process.env`, códigos de salida                                                                              | —                                               | pendiente |
| 2   | Repaso de JavaScript (opcional) | Repaso **corto y opcional**: desestructuración, spread, clases, closures, errores, `structuredClone`. Enfocado en lo que se usa en Node; los alumnos ya vieron JS | —                                               | pendiente |
| 3   | Módulos y npm                   | ESM vs CommonJS, `package.json`, scripts, semver, `npx`, lockfile                                                                                                 | E1: CLI de tareas en memoria (`util.parseArgs`) | pendiente |
| 4   | Asincronía                      | Event loop, callbacks → promesas → `async`/`await`, `Promise.all`, timers, errores asíncronos                                                                     | —                                               | pendiente |
| 5   | Archivos y rutas                | `node:fs/promises`, `node:path`, JSON, `node:url`, `import.meta.dirname`                                                                                          | E2: persistencia en `tareas.json`               | pendiente |
| 6   | Pruebas con `node:test`         | `test`, `describe`, `assert`, `--watch`, TDD básico. Aquí se "abre la caja negra" de `npm test`                                                                   | E3: suite de tests de la CLI                    | pendiente |

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
