// Termina con código 2 si no recibe un nombre. Pruébalo y luego revisa el código de salida:
//   node 06-salida-con-error.js Ana
//   node 06-salida-con-error.js
// @verificar falla

const nombre = process.argv[2];

if (nombre === undefined) {
  // console.error escribe en la salida de errores (stderr), no en la normal (stdout).
  console.error('Error: falta el nombre.');
  console.error('Uso: node 06-salida-con-error.js <nombre>');
  // 2 es el código habitual para "usaste mal el programa".
  process.exitCode = 2;
} else {
  console.log(`Hola, ${nombre}`);
}
