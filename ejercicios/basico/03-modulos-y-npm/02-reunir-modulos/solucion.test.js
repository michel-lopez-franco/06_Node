import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { crearTarea, normalizarTitulo, PRIORIDADES } from './solucion.js';
import * as modulo from './solucion.js';
import * as titulos from './titulos.js';
import * as prioridades from './prioridades.js';

describe('reexportaciones', () => {
  test('exporta crearTarea, normalizarTitulo y PRIORIDADES, y nada más', () => {
    assert.deepEqual(Object.keys(modulo).sort(), ['PRIORIDADES', 'crearTarea', 'normalizarTitulo']);
  });

  test('normalizarTitulo es la misma función de titulos.js, no una copia', () => {
    assert.equal(normalizarTitulo, titulos.normalizarTitulo);
  });

  test('PRIORIDADES es el mismo arreglo de prioridades.js, no una copia', () => {
    assert.equal(PRIORIDADES, prioridades.PRIORIDADES);
  });
});

describe('crearTarea', () => {
  test('con ("Leer", "alta") devuelve { titulo: "Leer", prioridad: "alta" }', () => {
    assert.deepEqual(crearTarea('Leer', 'alta'), { titulo: 'Leer', prioridad: 'alta' });
  });

  test('normaliza el título: "  Leer   el  libro " queda "Leer el libro"', () => {
    assert.equal(crearTarea('  Leer   el  libro ', 'baja').titulo, 'Leer el libro');
  });

  test('sin prioridad usa la prioridad por defecto: "media"', () => {
    assert.deepEqual(crearTarea('Leer'), { titulo: 'Leer', prioridad: 'media' });
  });

  test('con la prioridad "urgente" lanza el error: Prioridad inválida: urgente', () => {
    assert.throws(() => crearTarea('Leer', 'urgente'), { message: 'Prioridad inválida: urgente' });
  });

  test('distingue mayúsculas: "ALTA" no es válida (Prioridad inválida: ALTA)', () => {
    assert.throws(() => crearTarea('Leer', 'ALTA'), { message: 'Prioridad inválida: ALTA' });
  });
});
