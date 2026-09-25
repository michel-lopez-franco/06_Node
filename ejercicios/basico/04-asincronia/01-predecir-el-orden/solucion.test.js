import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { predecirOrden } from './solucion.js';
import { ejecutarPrograma } from './programa.js';

describe('predecirOrden', () => {
  test('tiene las seis letras de la A a la F, cada una una sola vez', () => {
    assert.deepEqual([...predecirOrden()].sort(), ['A', 'B', 'C', 'D', 'E', 'F']);
  });

  test('las tres primeras (la parte síncrona) están en el orden correcto', async () => {
    const real = await ejecutarPrograma();
    assert.deepEqual(predecirOrden().slice(0, 3), real.slice(0, 3));
  });

  test('las seis letras están en el orden en que el programa realmente las registra', async () => {
    assert.deepEqual(predecirOrden(), await ejecutarPrograma());
  });
});
