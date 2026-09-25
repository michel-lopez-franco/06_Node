---
title: Temario
description: Módulos del curso por nivel y cómo avanza el proyecto de la API de tareas.
---

El curso es de **autoestudio**: avanza a tu ritmo, en orden. Cada módulo tiene lecciones,
ejemplos que puedes ejecutar, ejercicios con tests y, en muchos casos, una etapa nueva del
proyecto.

## Nivel básico: Node sin frameworks

| #   | Módulo                          | Qué aprendes                                                                            | Proyecto                         |
| --- | ------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------- |
| 0   | Preparación                     | Terminal, instalar Node, VS Code, git y cómo trabajar con el curso y `npm test`         | —                                |
| 1   | ¿Qué es Node?                   | V8, libuv, REPL, ejecutar scripts, `process.argv`, `process.env`, códigos de salida     | —                                |
| 2   | Repaso de JavaScript (opcional) | Repaso corto de lo que más se usa en Node: desestructuración, clases, closures, errores | —                                |
| 3   | Módulos y npm                   | ESM y CommonJS, `package.json`, scripts, versiones, `npx`                               | E1: CLI de tareas en memoria     |
| 4   | Asincronía                      | Event loop, callbacks, promesas, `async`/`await`, errores asíncronos                    | —                                |
| 5   | Archivos y rutas                | `node:fs/promises`, `node:path`, JSON                                                   | E2: guardar tareas en un archivo |
| 6   | Pruebas con `node:test`         | `test`, `describe`, `assert`, modo `--watch`, TDD básico                                | E3: tests de la CLI              |

## Nivel intermedio: de script a API

| #   | Módulo                   | Qué aprendes                                                          | Proyecto                              |
| --- | ------------------------ | --------------------------------------------------------------------- | ------------------------------------- |
| 7   | Eventos y streams        | `EventEmitter`, streams, `pipeline`, `readline`                       | E4: importar y exportar CSV           |
| 8   | HTTP nativo              | `node:http`, peticiones y respuestas, ruteo a mano, JSON, `fetch`     | E5: servidor HTTP sin framework       |
| 9   | Fastify                  | Rutas, plugins, hooks, validación con JSON Schema, errores            | E6: migración a Fastify               |
| 10  | Diseño de APIs REST      | Recursos, verbos, códigos de estado, paginación, OpenAPI              | E7: proyectos y tareas, documentación |
| 11  | PostgreSQL               | SQL esencial, Docker Compose, driver `pg`, migraciones, transacciones | E8: datos en PostgreSQL               |
| 12  | Configuración y entornos | Variables de entorno, desarrollo/pruebas/producción, logs con pino    | E9: configuración por entorno         |

## Nivel pro: listo para producción

| #   | Módulo                       | Qué aprendes                                                              | Proyecto                    |
| --- | ---------------------------- | ------------------------------------------------------------------------- | --------------------------- |
| 13  | Autenticación y autorización | Contraseñas con `node:crypto`, JWT, cookies, roles                        | E10: usuarios y login       |
| 14  | Testing profesional          | Pruebas de integración, mocks, fixtures, cobertura                        | E11: cobertura ≥ 80 %       |
| 15  | Arquitectura                 | Capas, inyección de dependencias, errores de dominio                      | E12: refactor por capas     |
| 16  | TypeScript en Node           | Type stripping nativo, `tsc --noEmit`, tipado de Fastify                  | E13: migración a TypeScript |
| 17  | Tiempo real                  | Server-Sent Events y WebSockets                                           | E14: notificaciones en vivo |
| 18  | Rendimiento y concurrencia   | Profiling, `worker_threads`, cluster, caché, pruebas de carga             | E15: reportes en un worker  |
| 19  | Seguridad                    | OWASP API Top 10, rate limiting, CORS, cabeceras, dependencias y secretos | E16: endurecimiento         |
| 20  | Despliegue y operación       | Docker, CI con GitHub Actions, health checks, apagado ordenado            | E17: API desplegada         |

Al final, un **proyecto libre**: extiendes la API con una funcionalidad propia, evaluada con rúbrica.
