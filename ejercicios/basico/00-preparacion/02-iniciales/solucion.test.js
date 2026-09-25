import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { obtenerIniciales } from './solucion.js';

describe('obtenerIniciales', () => {
  test('con "ana lópez franco" devuelve "ALF"', () => {
    assert.equal(obtenerIniciales('ana lópez franco'), 'ALF');
  });

  test('con un solo nombre, "Carlos", devuelve "C"', () => {
    assert.equal(obtenerIniciales('Carlos'), 'C');
  });

  test('respeta acentos: con "ángel úrsula" devuelve "ÁÚ"', () => {
    assert.equal(obtenerIniciales('ángel úrsula'), 'ÁÚ');
  });

  test('ignora espacios de más: con "  maría   josé  " devuelve "MJ"', () => {
    assert.equal(obtenerIniciales('  maría   josé  '), 'MJ');
  });

  test('con texto vacío ("") devuelve ""', () => {
    assert.equal(obtenerIniciales(''), '');
  });

  test('con puros espacios ("   ") devuelve ""', () => {
    assert.equal(obtenerIniciales('   '), '');
  });
});
