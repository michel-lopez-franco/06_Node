import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { leerConfiguracion } from './solucion.js';

describe('leerConfiguracion: valores por defecto', () => {
  test('sin variables ({}) devuelve { puerto: 3000, modo: "desarrollo", depurar: false }', () => {
    assert.deepEqual(leerConfiguracion({}), { puerto: 3000, modo: 'desarrollo', depurar: false });
  });

  test('con variables vacías ("") también usa los valores por defecto', () => {
    const env = { PUERTO: '', MODO: '', DEPURAR: '' };
    assert.deepEqual(leerConfiguracion(env), { puerto: 3000, modo: 'desarrollo', depurar: false });
  });

  test('ignora variables que no le interesan (como PATH)', () => {
    const env = { PATH: '/usr/bin', HOME: '/home/ana' };
    assert.deepEqual(leerConfiguracion(env), { puerto: 3000, modo: 'desarrollo', depurar: false });
  });
});

describe('leerConfiguracion: PUERTO', () => {
  test('con PUERTO "8080" devuelve puerto 8080 como número (no como texto)', () => {
    assert.equal(leerConfiguracion({ PUERTO: '8080' }).puerto, 8080);
  });

  test('acepta los límites: "1" y "65535"', () => {
    assert.equal(leerConfiguracion({ PUERTO: '1' }).puerto, 1);
    assert.equal(leerConfiguracion({ PUERTO: '65535' }).puerto, 65535);
  });

  test('con PUERTO "abc" lanza un error', () => {
    assert.throws(() => leerConfiguracion({ PUERTO: 'abc' }), {
      message: 'PUERTO debe ser un entero entre 1 y 65535 (recibí "abc")',
    });
  });

  test('con PUERTO "3000.5" (con decimales) lanza un error', () => {
    assert.throws(() => leerConfiguracion({ PUERTO: '3000.5' }), {
      message: 'PUERTO debe ser un entero entre 1 y 65535 (recibí "3000.5")',
    });
  });

  test('con PUERTO "0" (muy chico) lanza un error', () => {
    assert.throws(() => leerConfiguracion({ PUERTO: '0' }), {
      message: 'PUERTO debe ser un entero entre 1 y 65535 (recibí "0")',
    });
  });

  test('con PUERTO "70000" (muy grande) lanza un error', () => {
    assert.throws(() => leerConfiguracion({ PUERTO: '70000' }), {
      message: 'PUERTO debe ser un entero entre 1 y 65535 (recibí "70000")',
    });
  });
});

describe('leerConfiguracion: MODO', () => {
  test('acepta "produccion" y "pruebas"', () => {
    assert.equal(leerConfiguracion({ MODO: 'produccion' }).modo, 'produccion');
    assert.equal(leerConfiguracion({ MODO: 'pruebas' }).modo, 'pruebas');
  });

  test('con MODO "staging" lanza un error', () => {
    assert.throws(() => leerConfiguracion({ MODO: 'staging' }), {
      message: 'MODO debe ser desarrollo, produccion o pruebas (recibí "staging")',
    });
  });
});

describe('leerConfiguracion: DEPURAR', () => {
  test('con DEPURAR "true" o "1" devuelve depurar true', () => {
    assert.equal(leerConfiguracion({ DEPURAR: 'true' }).depurar, true);
    assert.equal(leerConfiguracion({ DEPURAR: '1' }).depurar, true);
  });

  test('no importan las mayúsculas: "TRUE" también es true', () => {
    assert.equal(leerConfiguracion({ DEPURAR: 'TRUE' }).depurar, true);
  });

  test('con DEPURAR "false", "0" o "no" devuelve depurar false', () => {
    assert.equal(leerConfiguracion({ DEPURAR: 'false' }).depurar, false);
    assert.equal(leerConfiguracion({ DEPURAR: '0' }).depurar, false);
    assert.equal(leerConfiguracion({ DEPURAR: 'no' }).depurar, false);
  });
});
