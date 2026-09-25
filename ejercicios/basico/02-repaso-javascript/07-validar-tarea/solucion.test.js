import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { ErrorDeValidacion, validarTarea } from './solucion.js';

describe('ErrorDeValidacion', () => {
  test('guarda el mensaje y el campo', () => {
    const error = new ErrorDeValidacion('El título es obligatorio', 'titulo');
    assert.equal(error.message, 'El título es obligatorio');
    assert.equal(error.campo, 'titulo');
  });

  test('su name es "ErrorDeValidacion"', () => {
    assert.equal(new ErrorDeValidacion('x', 'y').name, 'ErrorDeValidacion');
  });

  test('es un Error (extiende a Error)', () => {
    assert.ok(new ErrorDeValidacion('x', 'y') instanceof Error);
  });
});

describe('validarTarea', () => {
  test('con datos correctos devuelve { titulo, prioridad }', () => {
    assert.deepEqual(validarTarea({ titulo: 'Leer', prioridad: 'alta' }), {
      titulo: 'Leer',
      prioridad: 'alta',
    });
  });

  test('sin prioridad usa "normal"', () => {
    assert.deepEqual(validarTarea({ titulo: 'Leer' }), { titulo: 'Leer', prioridad: 'normal' });
  });

  test('quita los espacios de las orillas del título', () => {
    assert.equal(validarTarea({ titulo: '  Leer  ' }).titulo, 'Leer');
  });

  test('ignora propiedades extra: el resultado solo trae titulo y prioridad', () => {
    assert.deepEqual(validarTarea({ titulo: 'Leer', completada: true, id: 9 }), {
      titulo: 'Leer',
      prioridad: 'normal',
    });
  });

  test('acepta un título de exactamente 100 caracteres', () => {
    const titulo = 'a'.repeat(100);
    assert.equal(validarTarea({ titulo }).titulo, titulo);
  });

  test('sin título lanza ErrorDeValidacion: El título es obligatorio (campo "titulo")', () => {
    assert.throws(() => validarTarea({}), {
      name: 'ErrorDeValidacion',
      message: 'El título es obligatorio',
      campo: 'titulo',
    });
  });

  test('con título de puros espacios lanza: El título es obligatorio', () => {
    assert.throws(() => validarTarea({ titulo: '   ' }), {
      message: 'El título es obligatorio',
      campo: 'titulo',
    });
  });

  test('con un título que no es texto (42) lanza: El título es obligatorio', () => {
    assert.throws(() => validarTarea({ titulo: 42 }), {
      message: 'El título es obligatorio',
      campo: 'titulo',
    });
  });

  test('con 101 caracteres lanza: El título no puede pasar de 100 caracteres', () => {
    assert.throws(() => validarTarea({ titulo: 'a'.repeat(101) }), {
      message: 'El título no puede pasar de 100 caracteres',
      campo: 'titulo',
    });
  });

  test('cuenta los caracteres sin los espacios de las orillas', () => {
    const titulo = `  ${'a'.repeat(100)}  `;
    assert.equal(validarTarea({ titulo }).titulo.length, 100);
  });

  test('con prioridad "urgente" lanza: La prioridad debe ser baja, normal o alta', () => {
    assert.throws(() => validarTarea({ titulo: 'Leer', prioridad: 'urgente' }), {
      message: 'La prioridad debe ser baja, normal o alta',
      campo: 'prioridad',
    });
  });

  test('el error que lanza es un ErrorDeValidacion (sirve instanceof)', () => {
    assert.throws(() => validarTarea({ titulo: '' }), ErrorDeValidacion);
  });
});
