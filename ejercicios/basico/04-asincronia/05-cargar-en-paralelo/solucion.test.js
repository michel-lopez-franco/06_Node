import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { cargarLasQueSePuedan, cargarTodas } from './solucion.js';

// Cargar las 5 tareas una tras otra tarda ~130 ms; en paralelo, lo que tarda la más lenta
// (~40 ms). Con 100 ms de margen distinguimos una forma de la otra.
const LIMITE_MS = 100;

describe('cargarTodas', () => {
  test('con [3, 1, 2] se cumple con las tareas en ese mismo orden', async () => {
    const tareas = await cargarTodas([3, 1, 2]);
    assert.deepEqual(
      tareas.map((tarea) => tarea.id),
      [3, 1, 2],
    );
    assert.deepEqual(tareas[0], { id: 3, titulo: 'Programar' });
  });

  test(`carga en paralelo: las 5 tareas tardan menos de ${LIMITE_MS} ms`, async () => {
    const inicio = performance.now();
    await cargarTodas([1, 2, 3, 4, 5]);
    assert.ok(performance.now() - inicio < LIMITE_MS, 'parece que las cargaste una tras otra');
  });

  test('si una falla (9), se rechaza con: No existe la tarea 9', async () => {
    await assert.rejects(cargarTodas([1, 9, 2]), { message: 'No existe la tarea 9' });
  });

  test('con [] se cumple con []', async () => {
    assert.deepEqual(await cargarTodas([]), []);
  });
});

describe('cargarLasQueSePuedan', () => {
  test('con [2, 9, 1, 8] carga 2 y 1 y reporta los errores de 9 y 8, en orden', async () => {
    assert.deepEqual(await cargarLasQueSePuedan([2, 9, 1, 8]), {
      tareas: [
        { id: 2, titulo: 'Correr' },
        { id: 1, titulo: 'Leer' },
      ],
      errores: ['No existe la tarea 9', 'No existe la tarea 8'],
    });
  });

  test('si todas existen, errores es []', async () => {
    const { tareas, errores } = await cargarLasQueSePuedan([1, 2]);
    assert.equal(tareas.length, 2);
    assert.deepEqual(errores, []);
  });

  test('si ninguna existe, no se rechaza: tareas es [] y hay un error por cada una', async () => {
    const { tareas, errores } = await cargarLasQueSePuedan([8, 9]);
    assert.deepEqual(tareas, []);
    assert.equal(errores.length, 2);
  });

  test(`carga en paralelo: las 5 tareas tardan menos de ${LIMITE_MS} ms`, async () => {
    const inicio = performance.now();
    await cargarLasQueSePuedan([1, 2, 3, 4, 5]);
    assert.ok(performance.now() - inicio < LIMITE_MS, 'parece que las cargaste una tras otra');
  });

  test('con [] se cumple con { tareas: [], errores: [] }', async () => {
    assert.deepEqual(await cargarLasQueSePuedan([]), { tareas: [], errores: [] });
  });
});
