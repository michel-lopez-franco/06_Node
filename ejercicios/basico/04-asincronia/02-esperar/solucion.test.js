import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { esperar } from './solucion.js';

const MENSAJE = 'ms debe ser un número mayor o igual a 0';

describe('esperar', () => {
  test('devuelve una promesa', () => {
    assert.ok(esperar(1) instanceof Promise);
  });

  test('esperar(10, "listo") se cumple con "listo"', async () => {
    assert.equal(await esperar(10, 'listo'), 'listo');
  });

  test('sin valor, se cumple con undefined', async () => {
    assert.equal(await esperar(1), undefined);
  });

  test('esperar(60) tarda al menos 60 ms', async () => {
    const inicio = performance.now();
    await esperar(60);
    assert.ok(performance.now() - inicio >= 59, 'terminó antes de tiempo');
  });

  test('no detiene el programa: el código que sigue se ejecuta antes de que se cumpla', async () => {
    const orden = [];
    const promesa = esperar(10).then(() => orden.push('cumplida'));
    orden.push('siguiente línea');
    await promesa;
    assert.deepEqual(orden, ['siguiente línea', 'cumplida']);
  });

  test('esperar(0) también funciona', async () => {
    assert.equal(await esperar(0, 'ya'), 'ya');
  });

  test('con ms negativo (-5) se rechaza con TypeError: ms debe ser un número mayor o igual a 0', async () => {
    await assert.rejects(esperar(-5), { name: 'TypeError', message: MENSAJE });
  });

  test('con ms que no es número ("100") se rechaza con el mismo TypeError', async () => {
    await assert.rejects(esperar('100'), { name: 'TypeError', message: MENSAJE });
  });

  test('con ms NaN se rechaza con el mismo TypeError', async () => {
    await assert.rejects(esperar(NaN), { name: 'TypeError', message: MENSAJE });
  });
});
