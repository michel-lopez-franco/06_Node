// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
          items: [{ autogenerate: { directory: 'basico' } }],
        },
        {
          label: 'Nivel intermedio',
          items: [{ autogenerate: { directory: 'intermedio' } }],
        },
        {
          label: 'Nivel pro',
          items: [{ autogenerate: { directory: 'pro' } }],
        },
        {
          label: 'Proyecto: API de tareas',
          items: [{ autogenerate: { directory: 'proyecto' } }],
        },
      ],
    }),
  ],
});
