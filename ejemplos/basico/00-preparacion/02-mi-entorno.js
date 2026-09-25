// Muestra con qué versión de Node y en qué sistema estás trabajando.
// `process` es un objeto que Node pone a tu disposición; lo veremos a detalle en el módulo 1.
//   node 02-mi-entorno.js
console.log('Versión de Node:', process.version);
console.log('Sistema operativo:', process.platform);
console.log('Carpeta actual:', process.cwd());

// process.versions.node es algo como '24.7.0'; nos quedamos con el número antes del primer punto.
const versionPrincipal = Number(process.versions.node.split('.')[0]);

if (versionPrincipal >= 24) {
  console.log('✓ Tu versión de Node sirve para el curso.');
} else {
  console.log('✗ El curso necesita Node 24 o más reciente. Revisa la lección "Instalar Node".');
}
