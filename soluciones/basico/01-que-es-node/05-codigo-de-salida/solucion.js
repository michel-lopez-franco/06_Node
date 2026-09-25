/**
 * Valida los argumentos de `node dividir.js <dividendo> <divisor>` y calcula la división.
 * @param {string[]} args Argumentos del usuario, por ejemplo ['10', '4'].
 * @returns {{ codigo: number, mensaje: string }} codigo 0 (bien), 1 (dato inválido) o 2 (mal uso).
 */
export function procesarDivision(args) {
  // La función no llama a process.exit() ni a console.log(): solo decide el código y el
  // mensaje. Así se puede probar sin terminar el proceso, y dividir.js se encarga de
  // imprimir y de poner process.exitCode.

  // Por convención, el código 2 significa "usaste mal el programa" (faltan o sobran
  // argumentos) y el 1 es un error general. Revisamos primero la cantidad: si no hay dos
  // argumentos, no tiene caso validar su contenido.
  if (args.length !== 2) {
    return { codigo: 2, mensaje: 'Uso: node dividir.js <dividendo> <divisor>' };
  }

  // Validamos ambos argumentos con el mismo ciclo en lugar de repetir el `if` dos veces.
  for (const texto of args) {
    // Igual que en el ejercicio de sumar: Number('') es 0, así que el vacío se revisa aparte.
    if (texto.trim() === '' || Number.isNaN(Number(texto))) {
      return { codigo: 1, mensaje: `"${texto}" no es un número` };
    }
  }

  const dividendo = Number(args[0]);
  const divisor = Number(args[1]);

  // En JavaScript, 10 / 0 no lanza error: da Infinity. Si no lo revisamos, el programa
  // imprimiría "Infinity" con código 0, como si todo hubiera salido bien.
  if (divisor === 0) {
    return { codigo: 1, mensaje: 'No se puede dividir entre cero' };
  }

  // String() convierte el número a texto: 2.5 → "2.5".
  return { codigo: 0, mensaje: String(dividendo / divisor) };
}
