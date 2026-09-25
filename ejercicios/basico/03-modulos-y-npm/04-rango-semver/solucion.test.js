import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { cumpleRango } from './solucion.js';

describe('versión exacta: "1.2.3"', () => {
  test('1.2.3 cumple "1.2.3"', () => {
    assert.equal(cumpleRango('1.2.3', '1.2.3'), true);
  });

  test('1.2.4 NO cumple "1.2.3"', () => {
    assert.equal(cumpleRango('1.2.4', '1.2.3'), false);
  });
});

describe('tilde: "~1.2.3" (solo parches)', () => {
  test('1.2.3 y 1.2.9 cumplen "~1.2.3"', () => {
    assert.equal(cumpleRango('1.2.3', '~1.2.3'), true);
    assert.equal(cumpleRango('1.2.9', '~1.2.3'), true);
  });

  test('1.2.2 NO cumple "~1.2.3" (es más vieja)', () => {
    assert.equal(cumpleRango('1.2.2', '~1.2.3'), false);
  });

  test('1.3.0 NO cumple "~1.2.3" (cambió la versión menor)', () => {
    assert.equal(cumpleRango('1.3.0', '~1.2.3'), false);
  });
});

describe('circunflejo: "^1.2.3" (menores y parches)', () => {
  test('1.2.3, 1.2.10 y 1.9.0 cumplen "^1.2.3"', () => {
    assert.equal(cumpleRango('1.2.3', '^1.2.3'), true);
    assert.equal(cumpleRango('1.2.10', '^1.2.3'), true);
    assert.equal(cumpleRango('1.9.0', '^1.2.3'), true);
  });

  test('1.10.0 cumple "^1.2.3" (se comparan números, no textos: 10 > 2)', () => {
    assert.equal(cumpleRango('1.10.0', '^1.2.3'), true);
  });

  test('1.1.9 NO cumple "^1.2.3" (es más vieja)', () => {
    assert.equal(cumpleRango('1.1.9', '^1.2.3'), false);
  });

  test('2.0.0 NO cumple "^1.2.3" (cambió la versión mayor)', () => {
    assert.equal(cumpleRango('2.0.0', '^1.2.3'), false);
  });
});

describe('circunflejo con mayor 0 (más estricto)', () => {
  test('0.2.5 cumple "^0.2.3", pero 0.3.0 NO', () => {
    assert.equal(cumpleRango('0.2.5', '^0.2.3'), true);
    assert.equal(cumpleRango('0.3.0', '^0.2.3'), false);
  });

  test('"^0.0.3" solo acepta 0.0.3: 0.0.4 NO lo cumple', () => {
    assert.equal(cumpleRango('0.0.3', '^0.0.3'), true);
    assert.equal(cumpleRango('0.0.4', '^0.0.3'), false);
  });
});

describe('errores', () => {
  test('la versión "1.2" lanza el error: Versión inválida: "1.2"', () => {
    assert.throws(() => cumpleRango('1.2', '^1.0.0'), { message: 'Versión inválida: "1.2"' });
  });

  test('la versión "v1.2.3" lanza el error: Versión inválida: "v1.2.3"', () => {
    assert.throws(() => cumpleRango('v1.2.3', '^1.0.0'), { message: 'Versión inválida: "v1.2.3"' });
  });

  test('el rango ">=1.0.0" lanza el error: Rango no soportado: ">=1.0.0"', () => {
    assert.throws(() => cumpleRango('1.2.3', '>=1.0.0'), {
      message: 'Rango no soportado: ">=1.0.0"',
    });
  });

  test('el rango "^1.2" lanza el error: Rango no soportado: "^1.2"', () => {
    assert.throws(() => cumpleRango('1.2.3', '^1.2'), { message: 'Rango no soportado: "^1.2"' });
  });
});
