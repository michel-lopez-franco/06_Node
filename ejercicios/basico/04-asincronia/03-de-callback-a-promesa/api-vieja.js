// Una API vieja, con callbacks error-first. No la edites.

const LIBROS = {
  '978-0': { titulo: 'El llano en llamas', autor: 'Juan Rulfo' },
  '978-1': { titulo: 'Pedro Páramo', autor: 'Juan Rulfo' },
};

/**
 * Busca un libro por ISBN y llama a callback(error, libro) después de 10 ms.
 * @param {string} isbn
 * @param {(error: Error | null, libro?: { titulo: string, autor: string }) => void} callback
 */
export function buscarLibro(isbn, callback) {
  setTimeout(() => {
    const libro = LIBROS[isbn];
    if (libro === undefined) {
      callback(new Error(`No existe el libro ${isbn}`));
    } else {
      callback(null, libro);
    }
  }, 10);
}
