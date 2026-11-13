// ─────────────────────────────────────────────────────────────
//  Notación: Parpadeo de los filtros (checkbox)
//  Causa: FilterGroup estaba definido DENTRO de Fototeca(), así que en
//  cada render React lo tomaba como un componente nuevo, lo desmontaba y
//  lo volvía a montar (se reiniciaba la animación fade-in y el scroll).
//  Solución: se llama como función normal, sin desmontarse.
//
//  Uso (desde la carpeta del proyecto, donde está src/App.js):
//      node src\corregir_filtros.js        (o node corregir_filtros.js si está en la raíz)
//  Respaldo: src/App.backup-filtros.js. No escribe nada si algo no coincide.
// ─────────────────────────────────────────────────────────────
const fs = require("fs");
const path = require("path");

const file = process.argv[2] || path.join("src", "App.js");
if (!fs.existsSync(file)) { console.error("❌ No encuentro " + file + ". Ejecuta el comando en la carpeta del proyecto."); process.exit(1); }
let src = fs.readFileSync(file, "utf8");
const fail = m => { console.error("❌ " + m + "\nNo se modificó ningún archivo."); process.exit(1); };

// 1) Debe existir la definición interna de FilterGroup (una sola vez)
const defs = src.split("const FilterGroup = ({ title, cat, opts = [] }) => {").length - 1;
if (defs !== 1) fail("No encontré la definición de FilterGroup (coincidencias: " + defs + ").");

// 2) Cambiar <FilterGroup title="X" cat="Y" opts={Z} /> por una llamada directa
const re = /<FilterGroup title="([^"]+)" cat="([^"]+)" opts=\{([^}]+)\} \/>/g;
const usos = (src.match(re) || []).length;
if (usos !== 6) fail("Se esperaban 6 usos de <FilterGroup /> y encontré " + usos + ".");
src = src.replace(re, (m, title, cat, opts) => '{FilterGroup({ title: "' + title + '", cat: "' + cat + '", opts: ' + opts + ' })}');

fs.writeFileSync(path.join(path.dirname(file), "App.backup-filtros.js"), fs.readFileSync(file));
fs.writeFileSync(file, src);
console.log("✅ FilterGroup ahora se renderiza sin desmontarse (" + usos + " filtros corregidos)");
console.log("Listo. Respaldo en " + path.join(path.dirname(file), "App.backup-filtros.js"));