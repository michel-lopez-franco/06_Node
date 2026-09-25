import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { interpretarArgumentos } from './solucion.js';

const POR_DEFECTO = { prioridad: 'media', pendientes: false, ayuda: false };

describe('comando y argumentos', () => {
  test('["agregar", "Comprar", "pan"] da comando "agregar" y argumentos ["Comprar", "pan"]', () => {
    assert.deepEqual(interpretarArgumentos(['agregar', 'Comprar', 'pan']), {
      comando: 'agregar',
      argumentos: ['Comprar', 'pan'],
      opciones: POR_DEFECTO,
    });
  });

  test('sin argumentos [] el comando es undefined y los argumentos []', () => {
    assert.deepEqual(interpretarArgumentos([]), {
      comando: undefined,
      argumentos: [],
      opciones: POR_DEFECTO,
    });
  });

  test('las opciones pueden ir en cualquier lugar: ["-p", "alta", "agregar", "Leer"]', () => {
    const resultado = interpretarArgumentos(['-p', 'alta', 'agregar', 'Leer']);
    assert.equal(resultado.comando, 'agregar');
    assert.deepEqual(resultado.argumentos, ['Leer']);
    assert.equal(resultado.opciones.prioridad, 'alta');
  });
});

describe('opciones', () => {
  test('lee --prioridad alta, --prioridad=alta y -p alta', () => {
    for (const args of [['--prioridad', 'alta'], ['--prioridad=alta'], ['-p', 'alta']]) {
      assert.equal(interpretarArgumentos(args).opciones.prioridad, 'alta');
    }
  });

  test('sin --prioridad, la prioridad es "media"', () => {
    assert.equal(interpretarArgumentos(['listar']).opciones.prioridad, 'media');
  });

  test('con --pendientes la bandera pendientes es true', () => {
    assert.equal(interpretarArgumentos(['listar', '--pendientes']).opciones.pendientes, true);
  });

  test('con --ayuda o -h la bandera ayuda es true', () => {
    assert.equal(interpretarArgumentos(['--ayuda']).opciones.ayuda, true);
    assert.equal(interpretarArgumentos(['-h']).opciones.ayuda, true);
  });

  test('opciones es un objeto normal (no el de parseArgs, que no tiene prototipo)', () => {
    const { opciones } = interpretarArgumentos([]);
    assert.equal(Object.getPrototypeOf(opciones), Object.prototype);
  });
});

describe('errores', () => {
  test('con --prioridad urgente lanza: Prioridad inválida: "urgente". Usa baja, media o alta', () => {
    assert.throws(() => interpretarArgumentos(['agregar', 'Leer', '--prioridad', 'urgente']), {
      message: 'Prioridad inválida: "urgente". Usa baja, media o alta',
    });
  });

  test('una opción desconocida (--color) lanza el error de parseArgs ERR_PARSE_ARGS_UNKNOWN_OPTION', () => {
    assert.throws(() => interpretarArgumentos(['listar', '--color']), {
      code: 'ERR_PARSE_ARGS_UNKNOWN_OPTION',
    });
  });

  test('--prioridad sin valor lanza el error de parseArgs ERR_PARSE_ARGS_INVALID_OPTION_VALUE', () => {
    assert.throws(() => interpretarArgumentos(['agregar', 'Leer', '--prioridad']), {
      code: 'ERR_PARSE_ARGS_INVALID_OPTION_VALUE',
    });
  });
});
