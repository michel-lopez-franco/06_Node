// Ejecuta la CLI de verdad, como lo haría el usuario, y revisa lo que imprime y su código.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import paquete from '../package.json' with { type: 'json' };

const CLI = fileURLToPath(new URL('../src/cli.js', import.meta.url));

function tareas(...args) {
  return spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });
}

describe('cli', () => {
  test('listar muestra las tareas de ejemplo y termina con código 0', () => {
    const { status, stdout } = tareas('listar');
    assert.equal(status, 0);
    assert.match(stdout, /\[x\] #1 Instalar Node 24 \(media\)/);
    assert.match(stdout, /\[ \] #2 Leer el módulo 3 \(alta\)/);
  });

  test('--version muestra la versión del package.json', () => {
    assert.equal(tareas('--version').stdout.trim(), paquete.version);
  });

  test('un error va a stderr con código 1', () => {
    const { status, stdout, stderr } = tareas('completar', '99');
    assert.equal(status, 1);
    assert.equal(stdout, '');
    assert.match(stderr, /No existe la tarea con id 99/);
  });

  test('una opción desconocida va a stderr con código 2', () => {
    const { status, stderr } = tareas('listar', '--color');
    assert.equal(status, 2);
    assert.match(stderr, /Opción desconocida: --color/);
  });
});
