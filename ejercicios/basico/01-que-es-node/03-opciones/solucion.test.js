import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { leerOpcion, tieneBandera } from './solucion.js';

describe('leerOpcion', () => {
  test('con ["--nombre", "Ana"] el valor de "nombre" es "Ana"', () => {
    assert.equal(leerOpcion(['--nombre', 'Ana'], 'nombre'), 'Ana');
  });

  test('con ["--nombre=Ana"] el valor de "nombre" es "Ana"', () => {
    assert.equal(leerOpcion(['--nombre=Ana'], 'nombre'), 'Ana');
  });

  test('encuentra la opción aunque no sea la primera: ["--edad", "20", "--nombre", "Luis"]', () => {
    assert.equal(leerOpcion(['--edad', '20', '--nombre', 'Luis'], 'nombre'), 'Luis');
  });

  test('conserva los "=" del valor: ["--filtro=a=b"] devuelve "a=b"', () => {
    assert.equal(leerOpcion(['--filtro=a=b'], 'filtro'), 'a=b');
  });

  test('si la opción no está, devuelve undefined', () => {
    assert.equal(leerOpcion(['--edad', '20'], 'nombre'), undefined);
  });

  test('con la lista vacía [], devuelve undefined', () => {
    assert.equal(leerOpcion([], 'nombre'), undefined);
  });

  test('si "--nombre" es lo último y no trae valor, devuelve undefined', () => {
    assert.equal(leerOpcion(['--nombre'], 'nombre'), undefined);
  });

  test('si después de "--nombre" viene otra opción ("--verbose"), devuelve undefined', () => {
    assert.equal(leerOpcion(['--nombre', '--verbose'], 'nombre'), undefined);
  });

  test('"--nombrecompleto=Ana" no cuenta como la opción "nombre"', () => {
    assert.equal(leerOpcion(['--nombrecompleto=Ana'], 'nombre'), undefined);
  });
});

describe('tieneBandera', () => {
  test('con ["--verbose"] la bandera "verbose" está: true', () => {
    assert.equal(tieneBandera(['--verbose'], 'verbose'), true);
  });

  test('la encuentra entre otros argumentos: ["hola", "--verbose", "42"]', () => {
    assert.equal(tieneBandera(['hola', '--verbose', '42'], 'verbose'), true);
  });

  test('si no está, devuelve false', () => {
    assert.equal(tieneBandera(['hola'], 'verbose'), false);
  });

  test('"verbose" sin guiones no cuenta como la bandera: false', () => {
    assert.equal(tieneBandera(['verbose'], 'verbose'), false);
  });

  test('"--verbosidad" no cuenta como la bandera "verbose": false', () => {
    assert.equal(tieneBandera(['--verbosidad'], 'verbose'), false);
  });
});
