// Promise.all, allSettled, race y any ante promesas que fallan. Ejecuta: node 12-combinadores.js
import { setTimeout as esperar } from 'node:timers/promises';

const exito = (ms, valor) => esperar(ms, valor);
const fallo = async (ms, mensaje) => {
  await esperar(ms);
  throw new Error(mensaje);
};

// all: se rechaza en cuanto UNA falla (y pierdes los resultados de las demás).
try {
  await Promise.all([exito(50, 'a'), fallo(20, 'b falló'), exito(10, 'c')]);
} catch (error) {
  console.log('all:       ', error.message);
}

// allSettled: espera a todas y te dice cuál se cumplió y cuál no. Nunca se rechaza.
const estados = await Promise.allSettled([exito(50, 'a'), fallo(20, 'b falló')]);
console.log('allSettled:', estados.map((e) => e.status).join(', '));

// race: gana la primera que TERMINE, sea con éxito o con error.
console.log('race:      ', await Promise.race([exito(50, 'lenta'), exito(10, 'rápida')]));

// any: gana la primera que se CUMPLA; ignora los fallos mientras quede alguna.
console.log('any:       ', await Promise.any([fallo(10, 'x'), exito(50, 'la que sí')]));
