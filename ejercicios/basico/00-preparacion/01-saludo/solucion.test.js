import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { saludar } from './solucion.js';

describe('saludar', () => {
  test('con "Ana" devuelve "¡Hola, Ana!"', () => {
    assert.equal(saludar('Ana'), '¡Hola, Ana!');
  });

  test('con "Luis" devuelve "¡Hola, Luis!"', () => {
    assert.equal(saludar('Luis'), '¡Hola, Luis!');
  });

  test('quita los espacios de más: con "  Sofía  " devuelve "¡Hola, Sofía!"', () => {
    assert.equal(saludar('  Sofía  '), '¡Hola, Sofía!');
  });

  test('con texto vacío ("") devuelve "¡Hola, mundo!"', () => {
    assert.equal(saludar(''), '¡Hola, mundo!');
  });

  test('con puros espacios ("   ") devuelve "¡Hola, mundo!"', () => {
    assert.equal(saludar('   '), '¡Hola, mundo!');
  });

  test('sin nombre, saludar() devuelve "¡Hola, mundo!"', () => {
    assert.equal(saludar(), '¡Hola, mundo!');
  });
});
