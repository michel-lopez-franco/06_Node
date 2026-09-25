import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { marcarCompletada } from './solucion.js';

function crearTareas() {
  return [
    { id: 1, titulo: 'Leer', completada: false },
    { id: 2, titulo: 'Correr', completada: false },
    { id: 3, titulo: 'Estudiar', completada: true },
  ];
}

describe('marcarCompletada', () => {
  test('la tarea con id 2 queda con completada: true', () => {
    const resultado = marcarCompletada(crearTareas(), 2);
    assert.deepEqual(resultado[1], { id: 2, titulo: 'Correr', completada: true });
  });

  test('las demás tareas quedan igual', () => {
    const resultado = marcarCompletada(crearTareas(), 2);
    assert.deepEqual(resultado[0], { id: 1, titulo: 'Leer', completada: false });
    assert.deepEqual(resultado[2], { id: 3, titulo: 'Estudiar', completada: true });
  });

  test('conserva el orden y la cantidad de tareas', () => {
    const resultado = marcarCompletada(crearTareas(), 1);
    assert.deepEqual(
      resultado.map((tarea) => tarea.id),
      [1, 2, 3],
    );
  });

  test('devuelve un arreglo nuevo, no el mismo arreglo que recibió', () => {
    const tareas = crearTareas();
    assert.notEqual(marcarCompletada(tareas, 1), tareas);
  });

  test('no modifica la tarea original: tareas[0].completada sigue en false', () => {
    const tareas = crearTareas();
    marcarCompletada(tareas, 1);
    assert.equal(tareas[0].completada, false);
  });

  test('no modifica el arreglo original', () => {
    const tareas = crearTareas();
    marcarCompletada(tareas, 2);
    assert.deepEqual(tareas, crearTareas());
  });

  test('si el id no existe, devuelve un arreglo nuevo con las mismas tareas', () => {
    const tareas = crearTareas();
    const resultado = marcarCompletada(tareas, 99);
    assert.notEqual(resultado, tareas);
    assert.deepEqual(resultado, crearTareas());
  });

  test('con la lista vacía devuelve []', () => {
    assert.deepEqual(marcarCompletada([], 1), []);
  });
});
