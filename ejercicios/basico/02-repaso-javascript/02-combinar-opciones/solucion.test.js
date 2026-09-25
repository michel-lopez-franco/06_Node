import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { combinarOpciones } from './solucion.js';

const porDefecto = { puerto: 3000, host: 'localhost', depurar: false };

describe('combinarOpciones', () => {
  test('la opción reemplaza al valor por defecto: puerto 8080', () => {
    assert.deepEqual(combinarOpciones(porDefecto, { puerto: 8080 }), {
      puerto: 8080,
      host: 'localhost',
      depurar: false,
    });
  });

  test('agrega opciones que no estaban en los valores por defecto', () => {
    assert.deepEqual(combinarOpciones({ puerto: 3000 }, { modo: 'pruebas' }), {
      puerto: 3000,
      modo: 'pruebas',
    });
  });

  test('una opción con valor undefined se ignora y se conserva el valor por defecto', () => {
    assert.deepEqual(combinarOpciones(porDefecto, { puerto: undefined, host: '0.0.0.0' }), {
      puerto: 3000,
      host: '0.0.0.0',
      depurar: false,
    });
  });

  test('null, 0, "" y true sí cuentan como valores y reemplazan al valor por defecto', () => {
    const resultado = combinarOpciones(
      { a: 1, b: 1, c: 1, d: false },
      { a: null, b: 0, c: '', d: true },
    );
    assert.deepEqual(resultado, { a: null, b: 0, c: '', d: true });
  });

  test('sin opciones devuelve una copia con los valores por defecto', () => {
    assert.deepEqual(combinarOpciones(porDefecto), porDefecto);
  });

  test('devuelve un objeto nuevo, no el mismo objeto de los valores por defecto', () => {
    assert.notEqual(combinarOpciones(porDefecto), porDefecto);
    assert.notEqual(combinarOpciones(porDefecto, {}), porDefecto);
  });

  test('no modifica los objetos que recibe', () => {
    const base = { puerto: 3000, host: 'localhost' };
    const opciones = { puerto: 8080, host: undefined };
    combinarOpciones(base, opciones);
    assert.deepEqual(base, { puerto: 3000, host: 'localhost' }, 'porDefecto cambió');
    assert.deepEqual(opciones, { puerto: 8080, host: undefined }, 'opciones cambió');
  });
});
