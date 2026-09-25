# Curso de Node.js — CUCEI

Curso de Node.js para Ingeniería en Computación (CUCEI), de cero a nivel profesional, en modo
**autoestudio** (sin calendario). Los alumnos ya cursaron HTML, CSS, JavaScript y Tailwind.
Entregable: sitio Astro Starlight en español, ejemplos ejecutables, ejercicios con `node:test` y
un proyecto hilo conductor (API de tareas y proyectos).

El temario y el estado de cada módulo están en `PLAN.md`. **Actualiza `PLAN.md` al terminar cada
tarea** (estado del módulo y registro de avances). Estados: `pendiente`, `en progreso`,
`revisado`. Solo el profesor marca un módulo como `revisado`; al terminar tú lo dejas en
`en progreso` con la nota "listo para revisión".

**No modifiques un módulo marcado como `revisado` sin preguntar primero**, aunque encuentres algo
que mejorar: propón el cambio y espera aprobación.

## Comandos

```sh
npm install                 # instala todo (workspace raíz + sitio/)
npm run dev                 # sitio en http://localhost:4321
npm run build               # build estático del sitio
npm test [-- ruta]          # tests de ejercicios/ (lo que corre el alumno; fallan con los stubs)
npm run test:soluciones     # soluciones pasan los tests y stubs los fallan (CI)
npm run test:proyecto       # npm test de cada proyecto/etapa-NN-*/ (CI)
npm run verificar           # ejecuta todos los ejemplos/ y exige código 0
npm run nuevo-ejercicio -- basico/04-asincronia/01-nombre   # crea ejercicio + solución espejo
npm run lint                # ESLint
npm run formato             # Prettier
docker compose up -d        # PostgreSQL 17 (módulos 11+). Usuario/clave/BD: curso/curso/tareas
```

**Antes de dar una tarea por terminada:** `npm run lint`, `npm run verificar`,
`npm run test:soluciones`, `npm run test:proyecto` y `npm run build` deben pasar.

## Mapa del repositorio

- `sitio/` — Astro Starlight. Lecciones en `sitio/src/content/docs/{basico,intermedio,pro}/NN-modulo/`,
  páginas del proyecto en `.../proyecto/`. El sidebar se autogenera por carpeta (`astro.config.mjs`):
  cada módulo es un grupo rotulado "N. <title de su index.mdx>", así que el `index.mdx` es obligatorio.
- `ejemplos/<nivel>/<NN-modulo>/<NN-nombre>.js` — todo el código que aparece en las lecciones.
- `ejercicios/<nivel>/<NN-modulo>/<NN-nombre>/` — `README.md` (enunciado corto), `solucion.js`
  (stub), `solucion.test.js`.
- `soluciones/` — **espejo exacto** de las rutas de `ejercicios/`; solo contiene los archivos que
  reemplazan al stub. Son públicas: los alumnos las consultan para comparar.
- `proyecto/etapa-NN-nombre/` — cada etapa completa y ejecutable, con su `package.json`, tests y README.
- `scripts/` — scripts del repo (Node puro, sin dependencias).

## Idioma y tono

- Español de México, trato de "tú", directo y amable. Sin relleno motivacional.
- Identificadores en español (`agregarTarea`, `rutaArchivo`), salvo APIs de Node/librerías y
  términos estándar (`request`, `middleware`, `handler`).
- La primera vez que aparece un término técnico en inglés, explícalo: "un _callback_ (función
  que se pasa para que otra la llame después)".
- Mensajes de error, `console.log` y nombres de tests en español.

## Código

- Node ≥ 24, **solo ESM** (`import`/`export`). CommonJS solo cuando el módulo 3 lo compara.
- Módulos nativos siempre con prefijo `node:` (`node:fs/promises`).
- Nivel básico: **cero dependencias externas**. Intermedio: Fastify, `pg`, pino. Pro: lo que
  el módulo justifique, preferentemente plugins oficiales `@fastify/*`.
- Estilo: Prettier (comillas simples, punto y coma, 100 columnas) + ESLint.
- **Progresión:** no uses un concepto antes del módulo que lo enseña (p. ej., nada de
  `async`/`await` antes del módulo 4 ni `node:test` explícito antes del 6). Si es inevitable,
  márcalo como "lo veremos en el módulo N".

## Lecciones (plantilla)

Una carpeta por módulo con `index.mdx` (introducción del módulo) y una página `.mdx` por lección.
Frontmatter: `title`, `description`, `sidebar.order`. Secciones, en este orden:

1. **Objetivos** — 3 a 5 viñetas, verbos observables.
2. **Explicación** — conceptos con ejemplos cortos.
3. **Ejemplos** — con `<Ejemplo archivo="…" />`; cada uno con la salida esperada y cómo ejecutarlo.
4. **Errores comunes** — mensajes de error reales y cómo resolverlos.
5. **Ejercicios** — con `<Ejercicio ruta="…" />`.
6. **Avance del proyecto** (si aplica) — enlace a la página de la etapa.
7. **Para saber más** — documentación oficial de Node primero.

Componentes propios (`sitio/src/components/`):

- `<Ejemplo archivo="basico/04-asincronia/01-callbacks.js" />` — muestra el archivo real de `ejemplos/`.
- `<Ejercicio ruta="basico/04-asincronia/01-nombre">texto opcional</Ejercicio>` — tarjeta con el
  comando de prueba y, debajo, un bloque desplegable **"Ver solución"** (cerrado por defecto) que
  muestra el archivo real de `soluciones/`, precedido del aviso "Intenta resolverlo antes de ver
  la solución".
- `<ArchivoDelProyecto archivo="etapa-01-cli-en-memoria/src/cli.js" />` — muestra un archivo real
  de `proyecto/` (para las páginas de cada etapa).
  Los tres rompen el build si la ruta no existe.

Enlaces internos **relativos** (`../temario/`), para que funcionen si luego se configura `base`.

## Ejemplos

- **Nunca pegues código a mano en una lección** si es más que un fragmento de 1–3 líneas: va en
  `ejemplos/` y se muestra con `<Ejemplo>`.
- Cada ejemplo corre con `node archivo.js` desde su carpeta y termina con código 0. `verificar`
  ejecuta todos los `.js`, `.mjs` y `.cjs` (también los módulos auxiliares en subcarpetas).
- Comentarios especiales: `// @verificar omitir` (servidores que no terminan),
  `// @verificar args: a b c`, `// @verificar falla` (ejemplos que muestran un error a propósito).

## Ejercicios

- Crea la estructura con `npm run nuevo-ejercicio`.
- Stub: funciones exportadas con JSDoc y cuerpo `throw new Error('Ejercicio sin resolver…')`.
- Tests: describen el comportamiento, nombres en español, `node:assert/strict`, incluyen casos
  borde. Deben fallar con el stub y pasar con la solución (`npm run test:soluciones` lo verifica).
- Hasta el módulo 6, los alumnos usan `npm test` como **caja negra** (verde = bien, rojo = falta).
  Los tests de esos módulos deben tener mensajes que se entiendan sin saber leer código de pruebas.

## Soluciones

- Las soluciones **son visibles para los alumnos**: en el repo (`soluciones/`) y en el sitio,
  dentro del desplegable "Ver solución" de `<Ejercicio>`. Nunca se muestran abiertas por defecto.
- Cada solución está **comentada para enseñar**: explica las decisiones importantes (por qué este
  enfoque, qué caso borde se cuida) y, cuando aplique, menciona una alternativa válida y su
  ventaja o desventaja.
- Las soluciones respetan las mismas reglas de progresión que las lecciones: solo usan lo que el
  alumno ya vio hasta ese módulo.

## Proyecto (API de tareas)

- Cada etapa parte de la anterior, es ejecutable por sí sola y tiene tests que pasan.
- Si modificas una etapa, revisa y propaga el cambio en las etapas siguientes.
- Cada etapa tiene su página en `sitio/src/content/docs/proyecto/` con: qué cambia, por qué, y
  pasos para llegar desde la etapa anterior.
