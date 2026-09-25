#!/usr/bin/env node
// Punto de entrada de la CLI: une las piezas y habla con la terminal.
//
//   node src/cli.js listar
//   node src/cli.js agregar Comprar pan --prioridad alta
//
// La primera línea (#!) permite ejecutarlo como comando `tareas` después de `npm link`.
import paquete from '../package.json' with { type: 'json' };
import { interpretarArgumentos } from './argumentos.js';
import { CODIGOS, ejecutar } from './comandos.js';
import { crearListaDeEjemplo } from './datos-de-ejemplo.js';

let resultado;
try {
  const entrada = interpretarArgumentos(process.argv.slice(2));
  resultado = entrada.opciones.version
    ? { codigo: CODIGOS.OK, mensaje: paquete.version }
    : ejecutar(crearListaDeEjemplo(), entrada);
} catch (error) {
  // interpretarArgumentos lanza cuando las opciones están mal escritas: es mal uso.
  resultado = {
    codigo: CODIGOS.MAL_USO,
    mensaje: `${error.message}\nConsulta "tareas ayuda" para ver las opciones.`,
  };
}

if (resultado.codigo === CODIGOS.OK) {
  console.log(resultado.mensaje);
} else {
  console.error(resultado.mensaje);
}
process.exitCode = resultado.codigo;
