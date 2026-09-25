/**
 * Lee el valor de una opción `--<nombre>` en la forma `--nombre valor` o `--nombre=valor`.
 * @param {string[]} args Argumentos del usuario, por ejemplo ['--nombre', 'Ana'].
 * @param {string} nombre Nombre de la opción, sin los guiones: 'nombre'.
 * @returns {string | undefined} El valor, o undefined si la opción no está o no trae valor.
 */
export function leerOpcion(args, nombre) {
  const opcion = `--${nombre}`;
  // Incluimos el "=" en el prefijo. Si buscáramos solo "--nombre", también coincidiría
  // "--nombrecompleto=Ana", que es otra opción.
  const prefijo = `${opcion}=`;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Forma --nombre=Ana. Cortamos desde el final del prefijo en lugar de usar split('='),
    // porque split también partiría los "=" que vengan dentro del valor ("--filtro=a=b").
    if (arg.startsWith(prefijo)) {
      return arg.slice(prefijo.length);
    }

    // Forma --nombre Ana: el valor es el siguiente elemento.
    if (arg === opcion) {
      const siguiente = args[i + 1];
      // Si no hay siguiente (args[i + 1] es undefined) o es otra opción, no hay valor.
      if (siguiente === undefined || siguiente.startsWith('--')) {
        return undefined;
      }
      return siguiente;
    }
  }

  // Recorrimos todo sin encontrarla.
  return undefined;

  // Nota: Node trae util.parseArgs, que hace esto y más (valores por defecto, alias como -n).
  // Lo usaremos en el módulo 3; aquí lo hacemos a mano para entender qué resuelve.
}

/**
 * Indica si una bandera `--<nombre>` aparece en los argumentos.
 * @param {string[]} args Argumentos del usuario, por ejemplo ['--verbose'].
 * @param {string} nombre Nombre de la bandera, sin los guiones: 'verbose'.
 * @returns {boolean}
 */
export function tieneBandera(args, nombre) {
  // includes() compara elementos completos, no pedazos de texto: "--verbosidad" no es igual
  // a "--verbose", así que no hay falsos positivos.
  return args.includes(`--${nombre}`);
}
