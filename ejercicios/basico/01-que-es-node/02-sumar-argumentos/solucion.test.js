import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { sumarArgumentos } from './solucion.js';

describe('sumarArgumentos', () => {
  test('suma ["2", "3.5"] y devuelve el número 5.5 (no el texto "23.5")', () => {
    assert.equal(sumarArgumentos(['2', '3.5']), 5.5);
  });

  test('suma negativos: ["-4", "10"] devuelve 6', () => {
    assert.equal(sumarArgumentos(['-4', '10']), 6);
  });

  test('con un solo número, ["7"], devuelve 7', () => {
    assert.equal(sumarArgumentos(['7']), 7);
  });

  test('con la lista vacía [] devuelve 0', () => {
    assert.equal(sumarArgumentos([]), 0);
  });

  test('con ["2", "abc"] lanza el error: "abc" no es un número', () => {
    assert.throws(() => sumarArgumentos(['2', 'abc']), { message: '"abc" no es un número' });
  });

  test('con un texto vacío [""] lanza el error: "" no es un número', () => {
    assert.throws(() => sumarArgumentos(['']), { message: '"" no es un número' });
  });

  test('con puros espacios ["  "] lanza el error: "  " no es un número', () => {
    assert.throws(() => sumarArgumentos(['  ']), { message: '"  " no es un número' });
  });
});
