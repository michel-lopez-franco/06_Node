import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import formatearLista, { formatearTarea } from './solucion.js';
import * as modulo from './solucion.js';

describe('exportaciones', () => {
  test('exporta formatearTarea con nombre y formatearLista por defecto, y nada más', () => {
    assert.deepEqual(Object.keys(modulo).sort(), ['default', 'formatearTarea']);
  });
});

describe('formatearTarea', () => {
  test('una tarea pendiente se ve como "[ ] #1 Leer"', () => {
    assert.equal(formatearTarea({ id: 1, titulo: 'Leer', completada: false }), '[ ] #1 Leer');
  });

  test('una tarea completada se ve como "[x] #7 Correr"', () => {
    assert.equal(formatearTarea({ id: 7, titulo: 'Correr', completada: true }), '[x] #7 Correr');
  });
});

describe('formatearLista (exportación por defecto)', () => {
  test('pone una tarea por línea, en el mismo orden', () => {
    const tareas = [
      { id: 1, titulo: 'Leer', completada: true },
      { id: 2, titulo: 'Correr', completada: false },
    ];
    assert.equal(formatearLista(tareas), '[x] #1 Leer\n[ ] #2 Correr');
  });

  test('con una sola tarea no agrega saltos de línea de más', () => {
    assert.equal(formatearLista([{ id: 3, titulo: 'Leer', completada: false }]), '[ ] #3 Leer');
  });

  test('con la lista vacía [] devuelve "No hay tareas."', () => {
    assert.equal(formatearLista([]), 'No hay tareas.');
  });
});
