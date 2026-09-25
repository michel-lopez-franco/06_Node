import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { unaVez } from './solucion.js';

describe('unaVez', () => {
  test('devuelve una función', () => {
    assert.equal(typeof unaVez(() => 1), 'function');
  });

  test('la primera llamada devuelve el resultado de fn', () => {
    const obtener = unaVez(() => 'conectado');
    assert.equal(obtener(), 'conectado');
  });

  test('fn se ejecuta una sola vez aunque se llame tres veces', () => {
    let llamadas = 0;
    const obtener = unaVez(() => {
      llamadas++;
      return 'listo';
    });
    obtener();
    obtener();
    obtener();
    assert.equal(llamadas, 1, `fn se ejecutó ${llamadas} veces`);
  });

  test('las llamadas siguientes devuelven el mismo resultado de la primera', () => {
    let cuenta = 0;
    const obtener = unaVez(() => {
      cuenta++;
      return cuenta;
    });
    assert.deepEqual([obtener(), obtener(), obtener()], [1, 1, 1]);
  });

  test('pasa a fn los argumentos de la primera llamada', () => {
    const sumar = unaVez((a, b) => a + b);
    assert.equal(sumar(2, 3), 5);
  });

  test('ignora los argumentos de las llamadas siguientes', () => {
    const sumar = unaVez((a, b) => a + b);
    sumar(2, 3);
    assert.equal(sumar(10, 20), 5);
  });

  test('si fn devuelve undefined, tampoco se vuelve a ejecutar', () => {
    let llamadas = 0;
    const iniciar = unaVez(() => {
      llamadas++;
    });
    iniciar();
    iniciar();
    assert.equal(llamadas, 1, `fn se ejecutó ${llamadas} veces`);
  });

  test('si fn devuelve 0 o false, tampoco se vuelve a ejecutar', () => {
    let llamadas = 0;
    const cero = unaVez(() => {
      llamadas++;
      return 0;
    });
    const falso = unaVez(() => {
      llamadas++;
      return false;
    });
    assert.deepEqual([cero(), cero(), falso(), falso()], [0, 0, false, false]);
    assert.equal(llamadas, 2, `las funciones se ejecutaron ${llamadas} veces en total`);
  });

  test('dos funciones envueltas son independientes', () => {
    const a = unaVez(() => 'a');
    const b = unaVez(() => 'b');
    assert.equal(a(), 'a');
    assert.equal(b(), 'b');
  });
});
