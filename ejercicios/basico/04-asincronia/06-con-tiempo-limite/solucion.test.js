import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { setTimeout as esperar } from 'node:timers/promises';
import { conTiempoLimite } from './solucion.js';

async function fallarEn(ms, mensaje) {
  await esperar(ms);
  throw new Error(mensaje);
}

// Cuántos temporizadores (setTimeout/setInterval) hay pendientes en este momento.
const temporizadoresPendientes = () =>
  process.getActiveResourcesInfo().filter((recurso) => recurso === 'Timeout').length;

describe('conTiempoLimite', () => {
  test('si la promesa termina a tiempo, se cumple con su valor', async () => {
    assert.equal(await conTiempoLimite(esperar(10, 'a tiempo'), 200), 'a tiempo');
  });

  test('si la promesa se rechaza a tiempo, se rechaza con ESE error', async () => {
    await assert.rejects(conTiempoLimite(fallarEn(10, 'falló la consulta'), 200), {
      message: 'falló la consulta',
    });
  });

  test('si tarda más de 30 ms, se rechaza con: Se agotó el tiempo de espera (30 ms)', async () => {
    await assert.rejects(conTiempoLimite(esperar(300, 'tarde'), 30), {
      message: 'Se agotó el tiempo de espera (30 ms)',
    });
  });

  test('no espera de más: con límite de 30 ms se rechaza mucho antes de 300 ms', async () => {
    const inicio = performance.now();
    await assert.rejects(conTiempoLimite(esperar(300), 30));
    assert.ok(performance.now() - inicio < 200, 'esperó a que terminara la promesa lenta');
  });

  test('funciona con una promesa que ya estaba cumplida', async () => {
    assert.equal(await conTiempoLimite(Promise.resolve(42), 50), 42);
  });

  test('si la promesa termina a tiempo, cancela el temporizador del límite', async () => {
    const antes = temporizadoresPendientes();
    await conTiempoLimite(Promise.resolve('rápida'), 5000);
    assert.equal(temporizadoresPendientes(), antes, 'quedó un temporizador pendiente');
  });

  test('también lo cancela si la promesa se rechaza a tiempo', async () => {
    const antes = temporizadoresPendientes();
    await assert.rejects(conTiempoLimite(Promise.reject(new Error('x')), 5000));
    assert.equal(temporizadoresPendientes(), antes, 'quedó un temporizador pendiente');
  });
});
