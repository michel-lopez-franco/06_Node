import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { describirTarea } from './solucion.js';

describe('describirTarea', () => {
  test('solo con título: { titulo: "Comprar pan" } da "Comprar pan [normal]"', () => {
    assert.equal(describirTarea({ titulo: 'Comprar pan' }), 'Comprar pan [normal]');
  });

  test('con prioridad "alta": "Estudiar [alta]"', () => {
    assert.equal(describirTarea({ titulo: 'Estudiar', prioridad: 'alta' }), 'Estudiar [alta]');
  });

  test('con etiquetas: "Pagar luz [alta] #casa #urgente"', () => {
    const tarea = { titulo: 'Pagar luz', prioridad: 'alta', etiquetas: ['casa', 'urgente'] };
    assert.equal(describirTarea(tarea), 'Pagar luz [alta] #casa #urgente');
  });

  test('con etiquetas pero sin prioridad: "Correr [normal] #salud"', () => {
    assert.equal(
      describirTarea({ titulo: 'Correr', etiquetas: ['salud'] }),
      'Correr [normal] #salud',
    );
  });

  test('con la lista de etiquetas vacía no deja un espacio al final: "Leer [baja]"', () => {
    const tarea = { titulo: 'Leer', prioridad: 'baja', etiquetas: [] };
    assert.equal(describirTarea(tarea), 'Leer [baja]');
  });

  test('con prioridad: undefined usa "normal"', () => {
    assert.equal(describirTarea({ titulo: 'Leer', prioridad: undefined }), 'Leer [normal]');
  });

  test('ignora otras propiedades como id o completada', () => {
    const tarea = { id: 3, titulo: 'Leer', completada: true };
    assert.equal(describirTarea(tarea), 'Leer [normal]');
  });
});
