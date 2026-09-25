import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { ListaDeTareas } from './solucion.js';

describe('ListaDeTareas', () => {
  describe('agregar', () => {
    test('devuelve la tarea creada: { id: 1, titulo: "Leer", completada: false }', () => {
      const lista = new ListaDeTareas();
      assert.deepEqual(lista.agregar('Leer'), { id: 1, titulo: 'Leer', completada: false });
    });

    test('los ids aumentan de uno en uno: 1, 2, 3', () => {
      const lista = new ListaDeTareas();
      const ids = [lista.agregar('a').id, lista.agregar('b').id, lista.agregar('c').id];
      assert.deepEqual(ids, [1, 2, 3]);
    });

    test('quita los espacios de las orillas: "  Correr  " se guarda como "Correr"', () => {
      const lista = new ListaDeTareas();
      assert.equal(lista.agregar('  Correr  ').titulo, 'Correr');
    });

    test('con título vacío ("") lanza el error: El título es obligatorio', () => {
      const lista = new ListaDeTareas();
      assert.throws(() => lista.agregar(''), { message: 'El título es obligatorio' });
    });

    test('con puros espacios ("   ") lanza el error: El título es obligatorio', () => {
      const lista = new ListaDeTareas();
      assert.throws(() => lista.agregar('   '), { message: 'El título es obligatorio' });
    });

    test('sin título o con un número lanza el error: El título es obligatorio', () => {
      const lista = new ListaDeTareas();
      assert.throws(() => lista.agregar(), { message: 'El título es obligatorio' });
      assert.throws(() => lista.agregar(42), { message: 'El título es obligatorio' });
    });

    test('un título inválido no se agrega ni gasta un id', () => {
      const lista = new ListaDeTareas();
      assert.throws(() => lista.agregar(''));
      assert.equal(lista.total, 0);
      assert.equal(lista.agregar('Leer').id, 1);
    });

    test('cambiar la tarea devuelta no cambia la que está guardada', () => {
      const lista = new ListaDeTareas();
      const tarea = lista.agregar('Leer');
      tarea.completada = true;
      assert.equal(lista.pendientes().length, 1);
    });
  });

  describe('completar', () => {
    test('la tarea completada ya no aparece en pendientes()', () => {
      const lista = new ListaDeTareas();
      lista.agregar('Leer');
      lista.agregar('Correr');
      lista.completar(1);
      assert.deepEqual(lista.pendientes(), [{ id: 2, titulo: 'Correr', completada: false }]);
    });

    test('con un id que no existe lanza el error: No existe la tarea con id 7', () => {
      const lista = new ListaDeTareas();
      lista.agregar('Leer');
      assert.throws(() => lista.completar(7), { message: 'No existe la tarea con id 7' });
    });
  });

  describe('pendientes', () => {
    test('una lista nueva no tiene pendientes: []', () => {
      assert.deepEqual(new ListaDeTareas().pendientes(), []);
    });

    test('devuelve las pendientes en el orden en que se agregaron', () => {
      const lista = new ListaDeTareas();
      lista.agregar('a');
      lista.agregar('b');
      lista.agregar('c');
      lista.completar(2);
      assert.deepEqual(
        lista.pendientes().map((tarea) => tarea.titulo),
        ['a', 'c'],
      );
    });

    test('cambiar una tarea de pendientes() no cambia la que está guardada', () => {
      const lista = new ListaDeTareas();
      lista.agregar('Leer');
      lista.pendientes()[0].titulo = 'Otro';
      assert.equal(lista.pendientes()[0].titulo, 'Leer');
    });

    test('vaciar el arreglo de pendientes() no borra tareas de la lista', () => {
      const lista = new ListaDeTareas();
      lista.agregar('Leer');
      lista.pendientes().length = 0;
      assert.equal(lista.total, 1);
    });
  });

  describe('total', () => {
    test('cuenta todas las tareas, completadas o no', () => {
      const lista = new ListaDeTareas();
      lista.agregar('a');
      lista.agregar('b');
      lista.completar(1);
      assert.equal(lista.total, 2);
    });

    test('es un getter: se lee como lista.total, sin paréntesis', () => {
      const lista = new ListaDeTareas();
      assert.equal(lista.total, 0);
    });
  });

  test('guarda las tareas en un campo privado: la lista no tiene propiedades públicas', () => {
    const lista = new ListaDeTareas();
    lista.agregar('Leer');
    assert.deepEqual(Object.keys(lista), []);
  });

  test('dos listas son independientes', () => {
    const casa = new ListaDeTareas();
    const escuela = new ListaDeTareas();
    casa.agregar('Barrer');
    assert.equal(escuela.total, 0);
    assert.equal(escuela.agregar('Estudiar').id, 1);
  });
});
