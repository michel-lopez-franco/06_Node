import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { leerConfiguracionJson } from './solucion.js';

describe('leerConfiguracionJson', () => {
  test('con \'{"puerto": 8080}\' devuelve { puerto: 8080, host: "localhost" }', () => {
    assert.deepEqual(leerConfiguracionJson('{"puerto": 8080}'), {
      puerto: 8080,
      host: 'localhost',
    });
  });

  test('con un objeto vacío "{}" devuelve los valores por defecto', () => {
    assert.deepEqual(leerConfiguracionJson('{}'), { puerto: 3000, host: 'localhost' });
  });

  test('conserva las propiedades extra del JSON', () => {
    assert.deepEqual(leerConfiguracionJson('{"host": "0.0.0.0", "depurar": true}'), {
      puerto: 3000,
      host: '0.0.0.0',
      depurar: true,
    });
  });

  test('con texto que no es JSON lanza: La configuración no es JSON válido', () => {
    assert.throws(() => leerConfiguracionJson('{ puerto: 8080 }'), {
      message: 'La configuración no es JSON válido',
    });
  });

  test('con texto vacío ("") lanza: La configuración no es JSON válido', () => {
    assert.throws(() => leerConfiguracionJson(''), {
      message: 'La configuración no es JSON válido',
    });
  });

  test('el error trae en `cause` el SyntaxError original de JSON.parse', () => {
    let atrapado;
    try {
      leerConfiguracionJson('esto no es JSON');
    } catch (error) {
      atrapado = error;
    }
    assert.ok(atrapado, 'no se lanzó ningún error');
    assert.ok(atrapado.cause instanceof SyntaxError, 'error.cause no es un SyntaxError');
  });

  test('con un arreglo "[1, 2]" lanza: La configuración debe ser un objeto', () => {
    assert.throws(() => leerConfiguracionJson('[1, 2]'), {
      message: 'La configuración debe ser un objeto',
    });
  });

  test('con "null" lanza: La configuración debe ser un objeto', () => {
    assert.throws(() => leerConfiguracionJson('null'), {
      message: 'La configuración debe ser un objeto',
    });
  });

  test('con un número "42" o un texto \'"hola"\' lanza: La configuración debe ser un objeto', () => {
    assert.throws(() => leerConfiguracionJson('42'), {
      message: 'La configuración debe ser un objeto',
    });
    assert.throws(() => leerConfiguracionJson('"hola"'), {
      message: 'La configuración debe ser un objeto',
    });
  });
});
