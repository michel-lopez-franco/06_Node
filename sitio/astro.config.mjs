// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const DOCS = new URL('./src/content/docs/', import.meta.url);

/**
 * Sidebar de un nivel: su introducción y un grupo por módulo (carpeta `NN-modulo/`).
 * Starlight nombra los grupos autogenerados con el nombre de la carpeta ("00-preparacion"),
 * así que armamos cada grupo aquí con la etiqueta "0. <title del index.mdx del módulo>".
 */
function sidebarDeNivel(nivel) {
  const modulos = readdirSync(new URL(`${nivel}/`, DOCS), { withFileTypes: true })
    .filter((entrada) => entrada.isDirectory() && /^\d{2}-/.test(entrada.name))
    .map((entrada) => entrada.name)
    .sort();

  return [
    { label: 'Introducción', slug: nivel },
    ...modulos.map((carpeta) => {
      const indice = new URL(`${nivel}/${carpeta}/index.mdx`, DOCS);
      if (!existsSync(indice)) {
        throw new Error(`Falta ${nivel}/${carpeta}/index.mdx (define el título del módulo)`);
      }
      const titulo = readFileSync(indice, 'utf8')
        .match(/^title:\s*(.+)$/m)?.[1]
        .trim()
        .replace(/^(['"])(.*)\1$/, '$2');
      return {
        label: `${Number(carpeta.slice(0, 2))}. ${titulo ?? carpeta}`,
        collapsed: true,
        items: [{ autogenerate: { directory: `${nivel}/${carpeta}` } }],
      };
    }),
  ];
}

// Cuando se decida el hosting, configurar aquí `site` (y `base` si aplica, p. ej. GitHub Pages).
export default defineConfig({
  integrations: [
    starlight({
      title: 'Node.js desde cero',
      description:
        'Curso de Node.js para Ingeniería en Computación (CUCEI): de cero a nivel profesional.',
      locales: {
        root: { label: 'Español', lang: 'es' },
      },
      lastUpdated: true,
      sidebar: [
        {
          label: 'El curso',
          items: [{ label: 'Temario', slug: 'temario' }],
        },
        {
          label: 'Nivel básico',
          items: sidebarDeNivel('basico'),
        },
        {
          label: 'Nivel intermedio',
          items: sidebarDeNivel('intermedio'),
        },
        {
          label: 'Nivel pro',
          items: sidebarDeNivel('pro'),
        },
        {
          label: 'Proyecto: API de tareas',
          items: [{ autogenerate: { directory: 'proyecto' } }],
        },
      ],
    }),
  ],
});
