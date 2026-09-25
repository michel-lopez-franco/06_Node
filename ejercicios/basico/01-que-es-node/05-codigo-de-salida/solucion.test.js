import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { procesarDivision } from './solucion.js';

const USO = 'Uso: node dividir.js <dividendo> <divisor>';

describe('procesarDivision: todo bien (código 0)', () => {
  test('con ["10", "4"] devuelve código 0 y mensaje "2.5"', () => {
    assert.deepEqual(procesarDivision(['10', '4']), { codigo: 0, mensaje: '2.5' });
  });

  test('con ["-9", "3"] devuelve código 0 y mensaje "-3"', () => {
    assert.deepEqual(procesarDivision(['-9', '3']), { codigo: 0, mensaje: '-3' });
  });

  test('con ["0", "5"] devuelve código 0 y mensaje "0" (dividir cero sí se puede)', () => {
    assert.deepEqual(procesarDivision(['0', '5']), { codigo: 0, mensaje: '0' });
  });
});

describe('procesarDivision: mal uso (código 2)', () => {
  test('sin argumentos [] devuelve código 2 y el mensaje de uso', () => {
    assert.deepEqual(procesarDivision([]), { codigo: 2, mensaje: USO });
  });

  test('con un solo argumento ["10"] devuelve código 2 y el mensaje de uso', () => {
    assert.deepEqual(procesarDivision(['10']), { codigo: 2, mensaje: USO });
  });

  test('con tres argumentos ["1", "2", "3"] devuelve código 2 y el mensaje de uso', () => {
    assert.deepEqual(procesarDivision(['1', '2', '3']), { codigo: 2, mensaje: USO });
  });
});

describe('procesarDivision: dato inválido (código 1)', () => {
  test('con ["10", "abc"] devuelve código 1 y el mensaje: "abc" no es un número', () => {
    assert.deepEqual(procesarDivision(['10', 'abc']), {
      codigo: 1,
      mensaje: '"abc" no es un número',
    });
  });

  test('revisa también el primero: ["diez", "2"] da "diez" no es un número', () => {
    assert.deepEqual(procesarDivision(['diez', '2']), {
      codigo: 1,
      mensaje: '"diez" no es un número',
    });
  });

  test('con un texto vacío ["", "2"] devuelve código 1: "" no es un número', () => {
    assert.deepEqual(procesarDivision(['', '2']), { codigo: 1, mensaje: '"" no es un número' });
  });

  test('con ["10", "0"] devuelve código 1 y el mensaje "No se puede dividir entre cero"', () => {
    assert.deepEqual(procesarDivision(['10', '0']), {
      codigo: 1,
      mensaje: 'No se puede dividir entre cero',
    });
  });
});
