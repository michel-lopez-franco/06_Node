import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { crearGeneradorDeIds } from './solucion.js';

describe('crearGeneradorDeIds', () => {
  test('devuelve una función', () => {
    assert.equal(typeof crearGeneradorDeIds('tarea'), 'function');
  });

  test('la primera llamada devuelve "tarea-1"', () => {
    const siguienteId = crearGeneradorDeIds('tarea');
    assert.equal(siguienteId(), 'tarea-1');
  });

  test('cada llamada devuelve el siguiente: "tarea-1", "tarea-2", "tarea-3"', () => {
    const siguienteId = crearGeneradorDeIds('tarea');
    assert.deepEqual(
      [siguienteId(), siguienteId(), siguienteId()],
      ['tarea-1', 'tarea-2', 'tarea-3'],
    );
  });

  test('con inicio 10 empieza en "p-10" y sigue con "p-11"', () => {
    const siguienteId = crearGeneradorDeIds('p', 10);
    assert.deepEqual([siguienteId(), siguienteId()], ['p-10', 'p-11']);
  });

  test('con inicio 0 empieza en "x-0" (0 es un inicio válido)', () => {
    const siguienteId = crearGeneradorDeIds('x', 0);
    assert.equal(siguienteId(), 'x-0');
  });

  test('cada generador lleva su propia cuenta', () => {
    const tareas = crearGeneradorDeIds('tarea');
    const proyectos = crearGeneradorDeIds('proyecto');
    tareas();
    tareas();
    assert.equal(proyectos(), 'proyecto-1');
    assert.equal(tareas(), 'tarea-3');
  });

  test('crear un generador nuevo no reinicia a los que ya existían', () => {
    const primero = crearGeneradorDeIds('a');
    primero();
    crearGeneradorDeIds('a');
    assert.equal(primero(), 'a-2');
  });
});
