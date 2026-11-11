// ─────────────────────────────────────────────────────────────
//  Parche: vista previa de imágenes en el Panel Administrativo
//  Uso (desde la carpeta del proyecto, donde está src/App.js):
//      node aplicar_vista_previa.js
//  Hace un respaldo en src/App.backup.js y NO escribe nada si
//  alguno de los bloques no se encuentra.
// ─────────────────────────────────────────────────────────────
const fs = require("fs");
const path = require("path");

const file = process.argv[2] || path.join("src", "App.js");
if (!fs.existsSync(file)) { console.error("❌ No encuentro " + file + ". Ejecuta el comando en la carpeta del proyecto."); process.exit(1); }
let src = fs.readFileSync(file, "utf8");
const log = [];
const fail = m => { console.error("❌ " + m + "\nNo se modificó ningún archivo."); process.exit(1); };
const countOf = (s, t) => s.split(t).length - 1;

function exact(label, from, to) {
  const n = countOf(src, from);
  if (n !== 1) fail(label + ": se esperaba 1 coincidencia y hay " + n + ".");
  src = src.split(from).join(to);
  log.push("✅ " + label);
}
function regex(label, re, fn) {
  const g = new RegExp(re.source, "g");
  const n = (src.match(g) || []).length;
  if (n !== 1) fail(label + ": se esperaba 1 coincidencia y hay " + n + ".");
  src = src.replace(re, fn);
  log.push("✅ " + label);
}

// 1) Nuevo ZonaCarga: zona de arrastre a la izquierda + vista previa a la derecha (con ✕ para quitar)
const NUEVO_ZONACARGA = `function ZonaCarga({ archivo, onChange, label = "Arrastra imagen aquí", accept = "image/*,.tif,.tiff,.heic,.heif", id = "fz", actual = null, actualLabel = "Imagen actual" }) {
  const [over, setOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewErr, setPreviewErr] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!archivo) { setPreview(null); setPreviewErr(false); return; }
    const url = URL.createObjectURL(archivo);
    setPreview(url);
    setPreviewErr(false);
    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  useEffect(() => { setPreviewErr(false); }, [actual]);

  const quitar = e => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    onChange(null);
  };

  const mostrando = preview || actual;
  const esNueva = !!preview;
  const activo = over || !!archivo;

  return (
    <div style={{ display: "flex", gap: 14, alignItems: "stretch", flexWrap: "wrap", marginBottom: 18 }}>
      <label htmlFor={id} style={{ flex: "1 1 240px", minWidth: 0, display: "block", cursor: "pointer" }}
        onDragOver={e => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={e => { e.preventDefault(); setOver(false); const f = e.dataTransfer.files[0]; if (f) onChange(f); }}>
        <div style={{ height: "100%", minHeight: 150, border: "2px dashed " + (activo ? "#1c146d" : "#679cbc"), borderRadius: 12, padding: "22px 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", background: archivo ? "rgba(28,20,109,.06)" : "#ebeeff", transition: "all .2s", transform: over ? "scale(1.01)" : "none" }}>
          <Icon name="upload" size={26} color={activo ? "#1c146d" : "#679cbc"} />
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#1c146d", marginTop: 7, marginBottom: 2, wordBreak: "break-word" }}>{archivo ? "✅ " + archivo.name : label}</div>
          <div style={{ fontSize: 11, color: "#7a7590" }}>{archivo ? "Haz clic o arrastra otra imagen para reemplazarla" : "o haz clic · TIFF JPG PNG WEBP HEIC BMP SVG"}</div>
        </div>
        <input id={id} ref={inputRef} type="file" accept={accept} style={{ display: "none" }} onChange={e => onChange(e.target.files[0] || null)} />
      </label>

      {mostrando && (
        <div style={{ flex: "0 1 230px", minWidth: 160, position: "relative", minHeight: 150, borderRadius: 12, overflow: "hidden", background: "#f7f8ff", border: "1px solid #ebeeff" }}>
          {!previewErr ? (
            <img src={mostrando} alt="Vista previa" onError={() => setPreviewErr(true)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, textAlign: "center", color: "#7a7590", fontSize: 11 }}>
              <Icon name="photo" size={28} color="#679cbc" />
              Vista previa no disponible para este formato
            </div>
          )}
          <span style={{ position: "absolute", left: 8, bottom: 8, background: esNueva ? "#1c146d" : "rgba(28,20,109,.7)", color: "white", fontSize: 10, padding: "3px 9px", borderRadius: 10, letterSpacing: ".05em" }}>{esNueva ? "Nueva" : actualLabel}</span>
          {esNueva && (
            <button type="button" className="btn" onClick={quitar} title="Quitar imagen" aria-label="Quitar imagen"
              style={{ position: "absolute", top: 7, right: 7, width: 26, height: 26, borderRadius: "50%", background: "rgba(193,23,32,.92)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, boxShadow: "0 2px 8px rgba(0,0,0,.3)" }}>
              <Icon name="close" size={14} color="white" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

`;
const ini = src.indexOf("function ZonaCarga(");
const fin = src.indexOf("function Carrusel()");
if (ini === -1 || fin === -1 || fin < ini) fail("ZonaCarga: no encontré el componente.");
src = src.slice(0, ini) + NUEVO_ZONACARGA + src.slice(fin);
log.push("✅ ZonaCarga con vista previa (puntos 1 y 2)");

// 2) Estados nuevos (archivo de edición separado del de "Nueva colección")
exact("Estados nuevos",
  "const [imgFile, setImgFile] = useState(null);",
  "const [imgFile, setImgFile] = useState(null);\n  const [editPortadaFile, setEditPortadaFile] = useState(null);\n  const [editFotoFile, setEditFotoFile] = useState(null);");

// 3) Editar colección: portada actual a un lado de "Nueva portada"
exact("Editar colección: ZonaCarga",
  '<ZonaCarga archivo={portadaFile} onChange={setPortadaFile} label="Nueva portada (opcional)" accept="image/*" id="port-edit" />',
  '<ZonaCarga archivo={editPortadaFile} onChange={setEditPortadaFile} label="Nueva portada (opcional)" accept="image/*" id="port-edit" actual={storageUrl(editCol.portada_url)} actualLabel="Portada actual" />');
exact("Guardar colección: subir portada nueva",
  'const portPath = portadaFile ? await uploadImg(portadaFile, "portadas") : undefined;',
  'const portPath = editPortadaFile ? await uploadImg(editPortadaFile, "portadas") : undefined;');
exact("Guardar colección: limpiar",
  'ok("✅ Colección actualizada"); setEditCol(null); setPortadaFile(null);',
  'ok("✅ Colección actualizada"); setEditCol(null); setEditPortadaFile(null);');
exact("Botón Editar colección",
  "onClick={() => setEditCol({ ...col })}",
  "onClick={() => { setEditPortadaFile(null); setEditCol({ ...col }); }}");
exact("Botón Cancelar colección",
  "onClick={() => setEditCol(null)}",
  "onClick={() => { setEditCol(null); setEditPortadaFile(null); }}");

// 4) Editar fotografía: foto actual + reemplazo opcional
exact("Botón Editar foto",
  'onClick={() => setEditFoto({ ...foto, keywords: foto.keywords || "" })}',
  'onClick={() => { setEditFotoFile(null); setEditFoto({ ...foto, keywords: foto.keywords || "" }); }}');
regex("Editar foto: ZonaCarga bajo el encabezado",
  /<button className="btn" onClick=\{\(\) => setEditFoto\(null\)\}([^\n]*?Cancelar<\/button>\s*<\/div>)/,
  (m, resto) => '<button className="btn" onClick={() => { setEditFoto(null); setEditFotoFile(null); }}' + resto +
    '\n                  <ZonaCarga archivo={editFotoFile} onChange={setEditFotoFile} label="Reemplazar fotografía (opcional)" id="foto-edit" actual={storageUrl(editFoto.url_web || editFoto.url_original)} actualLabel="Fotografía actual" />');
regex("Guardar foto: subir imagen nueva",
  /const \{ error \} = await supabase\.from\("fotografias"\)\.update\(\{\s*titulo: editFoto\.titulo,/,
  () => 'const nuevaUrl = editFotoFile ? await uploadImg(editFotoFile) : null;\n      const { error } = await supabase.from("fotografias").update({\n        ...(nuevaUrl ? { url_original: nuevaUrl, url_web: nuevaUrl, url_thumbnail: nuevaUrl } : {}),\n        titulo: editFoto.titulo,');
exact("Guardar foto: limpiar",
  'ok("✅ Foto actualizada"); setEditFoto(null);',
  'ok("✅ Foto actualizada"); setEditFoto(null); setEditFotoFile(null);');

fs.writeFileSync(path.join(path.dirname(file), "App.backup.js"), fs.readFileSync(file));
fs.writeFileSync(file, src);
console.log(log.join("\n"));
console.log("\nListo. Respaldo en " + path.join(path.dirname(file), "App.backup.js"));