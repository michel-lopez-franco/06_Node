import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { ListaDeTareas } from '../src/lista-de-tareas.js';

describe('ListaDeTareas', () => {
  test('agregar devuelve la tarea con id, prioridad "media" por defecto y sin completar', () => {
    const lista = new ListaDeTareas();
    assert.deepEqual(lista.agregar('  Leer  '), {
      id: 1,
      titulo: 'Leer',
      prioridad: 'media',
      completada: false,
    });
  });

  test('agregar acepta una prioridad válida', () => {
    const lista = new ListaDeTareas();
    assert.equal(lista.agregar('Leer', { prioridad: 'alta' }).prioridad, 'alta');
  });

  test('agregar rechaza un título vacío y una prioridad inválida sin gastar ids', () => {
    const lista = new ListaDeTareas();
    assert.throws(() => lista.agregar('  '), { message: 'El título es obligatorio' });
    assert.throws(() => lista.agregar('Leer', { prioridad: 'urgente' }), {
      message: 'Prioridad inválida: "urgente". Usa baja, media o alta',
    });
    assert.equal(lista.agregar('Leer').id, 1);
  });

  test('completar marca la tarea y la quita de pendientes()', () => {
    const lista = new ListaDeTareas();
    lista.agregar('a');
    lista.agregar('b');
    assert.equal(lista.completar(1).completada, true);
    assert.deepEqual(
      lista.pendientes().map((tarea) => tarea.id),
      [2],
    );
  });

  test('eliminar quita la tarea; los ids no se reutilizan', () => {
    const lista = new ListaDeTareas();
    lista.agregar('a');
    lista.agregar('b');
    assert.equal(lista.eliminar(2).titulo, 'b');
    assert.equal(lista.total, 1);
    assert.equal(lista.agregar('c').id, 3);
  });

  test('completar y eliminar con un id que no existe lanzan: No existe la tarea con id 9', () => {
    const lista = new ListaDeTareas();
    assert.throws(() => lista.completar(9), { message: 'No existe la tarea con id 9' });
    assert.throws(() => lista.eliminar(9), { message: 'No existe la tarea con id 9' });
  });

  test('todas() devuelve copias: modificarlas no cambia la lista', () => {
    const lista = new ListaDeTareas();
    lista.agregar('Leer');
    lista.todas()[0].titulo = 'Otro';
    assert.equal(lista.todas()[0].titulo, 'Leer');
  });
});
