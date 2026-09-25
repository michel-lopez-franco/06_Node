// Qué pasa cuando olvidas el await. Ejecuta: node 14-olvidar-await.js
import { buscarTarea } from './modulos/tareas-promesas.js';

// 1. Sin await recibes la promesa, no el valor.
const tarea = buscarTarea(1);
console.log('1. titulo sin await:', tarea.titulo);

// 2. try/catch solo atrapa el error si esperas la promesa DENTRO del try.
async function sinAwait() {
  try {
    return buscarTarea(99); // la promesa se devuelve y el error escapa del try
  } catch {
    return 'atrapado adentro';
  }
}

async function conAwait() {
  try {
    return await buscarTarea(99); // el rechazo ocurre aquí, dentro del try
  } catch {
    return 'atrapado adentro';
  }
}

console.log('2. con await:', await conAwait());
try {
  await sinAwait();
} catch (error) {
  console.log('3. sin await, el error llegó hasta afuera:', error.message);
}
