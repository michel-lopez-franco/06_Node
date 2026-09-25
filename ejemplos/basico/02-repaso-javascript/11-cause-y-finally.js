// Envolver un error con `cause` y limpiar con `finally`.
//   node 11-cause-y-finally.js

function leerConfiguracion(texto) {
  try {
    return JSON.parse(texto);
  } catch (error) {
    // Un mensaje que explica el problema en términos de tu programa, sin perder el original.
    throw new Error('La configuración no es JSON válido', { cause: error });
  }
}

try {
  leerConfiguracion('{ puerto: 3000 }'); // Falta poner comillas a "puerto".
} catch (error) {
  console.log('1.', error.message);
  console.log('2.', error.cause.name, '-', error.cause.message);
}

// finally se ejecuta siempre: haya error o no, e incluso después de un return.
function procesar(texto) {
  console.log(`   Abriendo "${texto}"...`);
  try {
    return leerConfiguracion(texto);
  } finally {
    console.log('   Cerrando (esto se ejecuta siempre).');
  }
}

console.log('3.', procesar('{"puerto": 3000}'));
try {
  procesar('esto no es JSON');
} catch (error) {
  console.log('4.', error.message);
}
