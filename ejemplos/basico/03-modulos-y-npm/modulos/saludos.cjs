// Un módulo CommonJS: la extensión .cjs le dice a Node que use este sistema,
// aunque el package.json diga "type": "module".
const PREFIJO = '¡Hola';

function saludar(nombre) {
  return `${PREFIJO}, ${nombre}!`;
}

function despedir(nombre) {
  return `Adiós, ${nombre}.`;
}

// Lo que asignas a module.exports es lo que recibe quien hace require().
module.exports = { saludar, despedir };
