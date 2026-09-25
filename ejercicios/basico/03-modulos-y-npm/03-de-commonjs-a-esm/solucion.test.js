import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { LIMITE_TITULO, recortarTitulo, resumir } from './solucion.js';
import * as modulo from './solucion.js';

describe('el módulo ya es ESM', () => {
  test('exporta con nombre LIMITE_TITULO, recortarTitulo y resumir, y nada más', () => {
    assert.deepEqual(Object.keys(modulo).sort(), ['LIMITE_TITULO', 'recortarTitulo', 'resumir']);
  });

  test('LIMITE_TITULO sigue valiendo 30', () => {
    assert.equal(LIMITE_TITULO, 30);
  });
});

describe('recortarTitulo (la lógica no cambió)', () => {
  test('un título corto queda igual', () => {
    assert.equal(recortarTitulo('Leer'), 'Leer');
  });

  test('un título de exactamente 30 caracteres queda igual', () => {
    const titulo = 'a'.repeat(30);
    assert.equal(recortarTitulo(titulo), titulo);
  });

  test('un título de 31 caracteres se recorta a 30, terminando en "…"', () => {
    assert.equal(recortarTitulo('a'.repeat(31)), 'a'.repeat(29) + '…');
  });
});

describe('resumir (la lógica no cambió)', () => {
  test('con 1 de 3 completadas devuelve "1 de 3 tareas completadas"', () => {
    const tareas = [{ completada: true }, { completada: false }, { completada: false }];
    assert.equal(resumir(tareas), '1 de 3 tareas completadas');
  });

  test('con la lista vacía [] devuelve "0 de 0 tareas completadas"', () => {
    assert.equal(resumir([]), '0 de 0 tareas completadas');
  });
});
