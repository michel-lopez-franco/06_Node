// Un error que nadie captura detiene el programa con código 1 y muestra dónde ocurrió.
//   node 09-error-no-capturado.js
// @verificar falla

function leerEdad(texto) {
  const edad = Number(texto);
  if (Number.isNaN(edad)) {
    throw new Error(`"${texto}" no es una edad válida`);
  }
  return edad;
}

console.log('Edad:', leerEdad('20'));
console.log('Edad:', leerEdad('veinte'));
console.log('Esta línea no se alcanza a ejecutar.');
