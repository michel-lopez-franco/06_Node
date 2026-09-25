// Los errores de Node traen una propiedad `code` pensada para compararse en el código.
//   node 12-codigos-de-error.js

try {
  new URL('esto no es una URL');
} catch (error) {
  console.log('name:   ', error.name);
  console.log('code:   ', error.code);
  console.log('message:', error.message);

  // Compara con `code`, que es estable, y no con `message`, que puede cambiar de una versión
  // de Node a otra.
  if (error.code === 'ERR_INVALID_URL') {
    console.log('→ Pide al usuario una URL que empiece con http:// o https://');
  }
}
