import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { obtenerArgumentos } from './solucion.js';

describe('obtenerArgumentos', () => {
  test('en macOS o Linux: quita node y el script, y deja ["hola", "42"]', () => {
    const argv = ['/usr/local/bin/node', '/home/ana/app.js', 'hola', '42'];
    assert.deepEqual(obtenerArgumentos(argv), ['hola', '42']);
  });

  test('en Windows: quita node y el script, y deja ["--rapido"]', () => {
    const argv = ['C:\\Program Files\\nodejs\\node.exe', 'C:\\curso\\app.js', '--rapido'];
    assert.deepEqual(obtenerArgumentos(argv), ['--rapido']);
  });

  test('si el usuario no escribió nada, devuelve un arreglo vacío []', () => {
    const argv = ['/usr/local/bin/node', '/home/ana/app.js'];
    assert.deepEqual(obtenerArgumentos(argv), []);
  });

  test('no modifica el arreglo original (sigue teniendo sus 3 elementos)', () => {
    const argv = ['/usr/local/bin/node', '/home/ana/app.js', 'hola'];
    obtenerArgumentos(argv);
    assert.deepEqual(argv, ['/usr/local/bin/node', '/home/ana/app.js', 'hola']);
  });
});
