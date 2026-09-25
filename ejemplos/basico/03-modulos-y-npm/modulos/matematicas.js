// Un módulo: un archivo que decide qué comparte con `export`.
// Lo que no exportas se queda privado dentro del archivo.

// Exportaciones con nombre: puede haber todas las que quieras.
export const PI_APROX = 3.14;

export function sumar(a, b) {
  return a + b;
}

export function multiplicar(a, b) {
  return a * b;
}

// Privada: nadie fuera de este archivo puede usarla.
function redondear(numero) {
  return Math.round(numero * 100) / 100;
}

// Exportación por defecto: como máximo una por módulo.
export default function areaDeCirculo(radio) {
  return redondear(PI_APROX * radio ** 2);
}
