import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { AYUDA, ejecutar } from '../src/comandos.js';
import { ListaDeTareas } from '../src/lista-de-tareas.js';

const OPCIONES = { prioridad: 'media', pendientes: false, ayuda: false, version: false };

// Atajo para no repetir la forma completa de la entrada en cada test.
function correr(lista, comando, argumentos = [], opciones = {}) {
  return ejecutar(lista, { comando, argumentos, opciones: { ...OPCIONES, ...opciones } });
}

function listaConDos() {
  const lista = new ListaDeTareas();
  lista.agregar('Leer');
  lista.agregar('Correr', { prioridad: 'alta' });
  return lista;
}

describe('ejecutar', () => {
  test('agregar une los argumentos en un solo título y usa la prioridad', () => {
    const lista = new ListaDeTareas();
    assert.deepEqual(correr(lista, 'agregar', ['Comprar', 'pan'], { prioridad: 'alta' }), {
      codigo: 0,
      mensaje: 'Agregada: [ ] #1 Comprar pan (alta)',
    });
    assert.equal(lista.total, 1);
  });

  test('agregar sin título es mal uso (código 2)', () => {
    assert.equal(correr(new ListaDeTareas(), 'agregar').codigo, 2);
  });

  test('listar muestra todas; con --pendientes, solo las pendientes', () => {
    const lista = listaConDos();
    lista.completar(1);
    assert.equal(correr(lista, 'listar').mensaje, '[x] #1 Leer (media)\n[ ] #2 Correr (alta)');
    assert.equal(correr(lista, 'listar', [], { pendientes: true }).mensaje, '[ ] #2 Correr (alta)');
  });

  test('listar una lista vacía muestra "No hay tareas."', () => {
    assert.equal(correr(new ListaDeTareas(), 'listar').mensaje, 'No hay tareas.');
  });

  test('completar y eliminar reciben el id como texto', () => {
    const lista = listaConDos();
    assert.deepEqual(correr(lista, 'completar', ['1']), {
      codigo: 0,
      mensaje: 'Completada: [x] #1 Leer (media)',
    });
    assert.deepEqual(correr(lista, 'eliminar', ['2']), {
      codigo: 0,
      mensaje: 'Eliminada: [ ] #2 Correr (alta)',
    });
  });

  test('un id que no es entero positivo es mal uso (código 2)', () => {
    for (const id of ['x', '1.5', '0', '-1', '']) {
      assert.equal(correr(listaConDos(), 'completar', [id]).codigo, 2, `id "${id}"`);
    }
    assert.equal(correr(listaConDos(), 'eliminar', []).codigo, 2);
  });

  test('un id que no existe es un error (código 1)', () => {
    assert.deepEqual(correr(listaConDos(), 'completar', ['9']), {
      codigo: 1,
      mensaje: 'No existe la tarea con id 9',
    });
  });

  test('ayuda y --ayuda muestran la ayuda con código 0', () => {
    assert.deepEqual(correr(listaConDos(), 'ayuda'), { codigo: 0, mensaje: AYUDA });
    assert.deepEqual(correr(listaConDos(), 'listar', [], { ayuda: true }), {
      codigo: 0,
      mensaje: AYUDA,
    });
  });

  test('sin comando o con uno desconocido es mal uso (código 2)', () => {
    assert.equal(correr(listaConDos(), undefined).codigo, 2);
    assert.equal(correr(listaConDos(), 'borrar').codigo, 2);
    assert.equal(correr(listaConDos(), 'toString').codigo, 2);
  });
});
