// try/catch no atrapa un error lanzado DESPUÉS, dentro de un callback.
// Ejecuta: node 15-errores-en-callbacks.js
// @verificar falla

try {
  setTimeout(() => {
    // Cuando esto se ejecuta, el try/catch de afuera ya terminó hace mucho.
    throw new Error('lanzado dentro del setTimeout');
  }, 10);
  console.log('El try terminó sin errores');
} catch (error) {
  console.log('Nunca llegamos aquí:', error.message);
}
