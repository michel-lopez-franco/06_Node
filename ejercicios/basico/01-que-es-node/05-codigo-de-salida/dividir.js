// Programa completo que usa tu función. No necesitas editarlo.
//
//   node dividir.js 10 4
//
// La línea `import` trae tu función desde solucion.js; los módulos los veremos en el módulo 3.
import { procesarDivision } from './solucion.js';

const { codigo, mensaje } = procesarDivision(process.argv.slice(2));

// Los resultados van a la salida estándar (stdout) y los errores a la de errores (stderr).
if (codigo === 0) {
  console.log(mensaje);
} else {
  console.error(mensaje);
}

// Con exitCode, Node termina normalmente y usa este código al salir.
process.exitCode = codigo;
