// Otro módulo que también importa contador.js.
import { registrarVisita } from './contador.js';

export function mostrarPagina(nombre) {
  registrarVisita();
  return `Página: ${nombre}`;
}
