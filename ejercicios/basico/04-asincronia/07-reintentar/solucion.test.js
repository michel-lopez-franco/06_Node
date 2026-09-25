import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { reintentar } from './solucion.js';

// Crea una función que falla las primeras `fallos` veces y luego se cumple con 'ok'.
// Guarda en `llamadas` los números de intento con que la llamaron.
function fallaVeces(fallos) {
  const llamadas = [];
  const fn = async (intento) => {
    llamadas.push(intento);
    if (llamadas.length <= fallos) {
      throw new Error(`fallo ${llamadas.length}`);
    }
    return 'ok';
  };
  return { fn, llamadas };
}

describe('reintentar', () => {
  test('si funciona a la primera, se cumple con su valor y llama a fn una sola vez', async () => {
    const { fn, llamadas } = fallaVeces(0);
    assert.equal(await reintentar(fn), 'ok');
    assert.deepEqual(llamadas, [1]);
  });

  test('si falla 2 veces y luego funciona, se cumple con "ok" en el intento 3', async () => {
    const { fn, llamadas } = fallaVeces(2);
    assert.equal(await reintentar(fn, { intentos: 5 }), 'ok');
    assert.deepEqual(llamadas, [1, 2, 3]);
  });

  test('si falla siempre, se rechaza con el error del ÚLTIMO intento', async () => {
    const { fn, llamadas } = fallaVeces(10);
    await assert.rejects(reintentar(fn, { intentos: 4 }), { message: 'fallo 4' });
    assert.deepEqual(llamadas, [1, 2, 3, 4]);
  });

  test('sin opciones, hace 3 intentos', async () => {
    const { fn, llamadas } = fallaVeces(10);
    await assert.rejects(reintentar(fn));
    assert.equal(llamadas.length, 3);
  });

  test('con intentos: 1 no reintenta', async () => {
    const { fn, llamadas } = fallaVeces(10);
    await assert.rejects(reintentar(fn, { intentos: 1 }), { message: 'fallo 1' });
    assert.equal(llamadas.length, 1);
  });

  test('espera esperaMs entre intentos: 3 intentos con 30 ms tardan al menos 60 ms', async () => {
    const { fn } = fallaVeces(10);
    const inicio = performance.now();
    await assert.rejects(reintentar(fn, { intentos: 3, esperaMs: 30 }));
    assert.ok(performance.now() - inicio >= 58, 'no esperó entre intentos');
  });

  test('no espera después del último intento: 2 intentos con 100 ms tardan menos de 180 ms', async () => {
    const { fn } = fallaVeces(10);
    const inicio = performance.now();
    await assert.rejects(reintentar(fn, { intentos: 2, esperaMs: 100 }));
    assert.ok(performance.now() - inicio < 180, 'esperó de más al final');
  });

  test('un error síncrono de fn también cuenta como fallo y se reintenta', async () => {
    let llamadas = 0;
    const fn = () => {
      llamadas++;
      if (llamadas < 2) throw new Error('síncrono');
      return 'ok';
    };
    assert.equal(await reintentar(fn), 'ok');
    assert.equal(llamadas, 2);
  });

  test('con intentos: 0 se rechaza con RangeError: intentos debe ser al menos 1', async () => {
    const { fn, llamadas } = fallaVeces(0);
    await assert.rejects(reintentar(fn, { intentos: 0 }), {
      name: 'RangeError',
      message: 'intentos debe ser al menos 1',
    });
    assert.equal(llamadas.length, 0);
  });
});
