import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { interpretarArgumentos } from '../src/argumentos.js';

describe('interpretarArgumentos', () => {
  test('separa comando, argumentos y opciones con sus valores por defecto', () => {
    assert.deepEqual(interpretarArgumentos(['agregar', 'Comprar', 'pan']), {
      comando: 'agregar',
      argumentos: ['Comprar', 'pan'],
      opciones: { prioridad: 'media', pendientes: false, ayuda: false, version: false },
    });
  });

  test('lee --prioridad, -p, --pendientes, -h y -v', () => {
    assert.equal(interpretarArgumentos(['-p', 'alta']).opciones.prioridad, 'alta');
    assert.equal(interpretarArgumentos(['--prioridad=baja']).opciones.prioridad, 'baja');
    assert.equal(interpretarArgumentos(['--pendientes']).opciones.pendientes, true);
    assert.equal(interpretarArgumentos(['-h']).opciones.ayuda, true);
    assert.equal(interpretarArgumentos(['-v']).opciones.version, true);
  });

  test('traduce los errores de parseArgs al español', () => {
    assert.throws(() => interpretarArgumentos(['--color']), {
      message: 'Opción desconocida: --color',
    });
    assert.throws(() => interpretarArgumentos(['-z']), { message: 'Opción desconocida: -z' });
    assert.throws(() => interpretarArgumentos(['agregar', 'x', '--prioridad']), {
      message: 'Falta el valor de la opción --prioridad',
    });
  });

  test('rechaza una prioridad que no existe', () => {
    assert.throws(() => interpretarArgumentos(['-p', 'urgente']), {
      message: 'Prioridad inválida: "urgente". Usa baja, media o alta',
    });
  });
});
