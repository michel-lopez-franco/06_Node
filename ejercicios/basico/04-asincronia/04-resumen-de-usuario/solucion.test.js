import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { resumenDeUsuario } from './solucion.js';

describe('resumenDeUsuario', () => {
  test('para el usuario 1 se cumple con { nombre: "Ana", total: 3, pendientes: 2 }', async () => {
    assert.deepEqual(await resumenDeUsuario(1), { nombre: 'Ana', total: 3, pendientes: 2 });
  });

  test('un usuario sin tareas (2) tiene total 0 y pendientes 0', async () => {
    assert.deepEqual(await resumenDeUsuario(2), { nombre: 'Luis', total: 0, pendientes: 0 });
  });

  test('devuelve una promesa (es una función async)', () => {
    const resultado = resumenDeUsuario(1);
    assert.ok(resultado instanceof Promise);
    return resultado;
  });

  test('si el usuario no existe se rechaza con: No se pudo cargar el resumen del usuario 7', async () => {
    await assert.rejects(resumenDeUsuario(7), {
      message: 'No se pudo cargar el resumen del usuario 7',
    });
  });

  test('el error trae en cause el error original: No existe el usuario 7', async () => {
    await assert.rejects(resumenDeUsuario(7), (error) => {
      assert.equal(error.cause?.message, 'No existe el usuario 7');
      return true;
    });
  });
});
