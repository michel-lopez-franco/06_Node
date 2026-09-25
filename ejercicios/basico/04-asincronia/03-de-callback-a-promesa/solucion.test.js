import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { buscarLibroPromesa, promisificar } from './solucion.js';
import { buscarLibro } from './api-vieja.js';

// Funciones error-first de prueba.
function sumarDespues(a, b, callback) {
  setTimeout(() => callback(null, a + b), 5);
}
const ERROR_DE_PRUEBA = new Error('falló a propósito');
function fallarDespues(callback) {
  setTimeout(() => callback(ERROR_DE_PRUEBA), 5);
}

describe('buscarLibroPromesa', () => {
  test('devuelve una promesa', () => {
    const resultado = buscarLibroPromesa('978-1');
    assert.ok(resultado instanceof Promise);
    return resultado;
  });

  test('con "978-1" se cumple con Pedro Páramo', async () => {
    assert.deepEqual(await buscarLibroPromesa('978-1'), {
      titulo: 'Pedro Páramo',
      autor: 'Juan Rulfo',
    });
  });

  test('con un ISBN que no existe se rechaza: No existe el libro 000', async () => {
    await assert.rejects(buscarLibroPromesa('000'), { message: 'No existe el libro 000' });
  });
});

describe('promisificar', () => {
  test('devuelve una función', () => {
    assert.equal(typeof promisificar(sumarDespues), 'function');
  });

  test('pasa todos los argumentos: promisificar(sumarDespues)(2, 3) se cumple con 5', async () => {
    assert.equal(await promisificar(sumarDespues)(2, 3), 5);
  });

  test('funciona con la API vieja: promisificar(buscarLibro)("978-0")', async () => {
    const buscar = promisificar(buscarLibro);
    assert.equal((await buscar('978-0')).titulo, 'El llano en llamas');
  });

  test('si el callback recibe un error, se rechaza con ESE mismo error', async () => {
    await assert.rejects(promisificar(fallarDespues)(), (error) => error === ERROR_DE_PRUEBA);
  });

  test('cada llamada es independiente', async () => {
    const sumar = promisificar(sumarDespues);
    assert.deepEqual(await Promise.all([sumar(1, 1), sumar(10, 10)]), [2, 20]);
  });
});
