//  FOTOTECA ITZ

import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

// ──  CONFIGURACIÓN SUPABASE
const SUPABASE_URL = "https://iqyytvzlsquwkeimtein.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeXl0dnpsc3F1d2tlaW10ZWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDYyODEsImV4cCI6MjA5MDEyMjI4MX0.l-VPzdyKsYKVHrGxYG8_JwE97-ieAdIBLyh4jcBWj30"; // Settings → API → anon public
const supabase     = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Paleta ────────────────────────────────────────────────────────────────────
const C = {
  navy:"#1c146d", cream:"#f2ebe3", bronze:"#916c3f",
  lavender:"#ebeeff", crimson:"#c11720", steel:"#679cbc",
  mid:"#2e2580", text:"#1a1630", muted:"#7a7590",
};

// ── Estilos globales ──────────────────────────────────────────────────────────
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:${C.cream};color:${C.text};overflow-x:hidden}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${C.lavender}}::-webkit-scrollbar-thumb{background:${C.navy};border-radius:3px}
  .fade-in{animation:fadeIn .5s ease forwards}
  @keyframes fadeIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .card-hover{transition:transform .35s cubic-bezier(.4,0,.2,1),box-shadow .35s ease}
  .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(28,20,109,.18)}
  .img-zoom{overflow:hidden}.img-zoom img{transition:transform .5s cubic-bezier(.4,0,.2,1)}.img-zoom:hover img{transform:scale(1.07)}
  .btn{cursor:pointer;border:none;outline:none;font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:.04em;transition:all .25s ease}.btn:active{transform:scale(.97)}
  .tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase}
  .cb input{display:none}
  .cb label{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:${C.text};padding:4px 0}
  .cb label::before{content:'';width:16px;height:16px;flex-shrink:0;border:2px solid ${C.muted};border-radius:4px;transition:all .2s}
  .cb input:checked+label::before{background:${C.navy};border-color:${C.navy};background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.5 3.5l-7 7-3-3' stroke='white' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-size:12px;background-position:center}
  .poster-badge{background:linear-gradient(135deg,${C.navy},${C.mid});color:white;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:2px}
  input,select,textarea{font-family:'DM Sans',sans-serif}
`;

// ── Sugerencias de búsqueda rotativas ─────────────────────────────────────────
const SUGERENCIAS = [
  "Palacio de Bellas Artes","Festival de Oaxaca","Teotihuacán",
  "Catedral Metropolitana","Haciendas coloniales","Mercados CDMX",
  "Arte prehispánico","Patrimonio arquitectónico","Día de muertos",
];

// ── Estilo base para inputs 
const INP = {
  width:"100%", padding:"9px 12px",
  border:`1.5px solid ${C.lavender}`, borderRadius:8,
  fontSize:13, outline:"none", color:C.text, background:"white",
};

// ── Helper: URL pública de imagen en Supabase Storage 
const storageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/imagenes/${path}`;
};

//  ÍCONOS SVG
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    search:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    x:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    chevL:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
    chevR:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
    grid:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    list:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    filter:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    photo:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    info:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    shield:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    upload:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    plus:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    zoomIn:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    zoomOut:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    close:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    save:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
    trash:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
    edit:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    lock:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    unlock:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
    stats:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    cols:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"/></svg>,
    refresh:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  };
  return icons[name] || null;
};

// ── Spinner
const Spinner = ({ small }) => (
  <div style={{ display:"flex", justifyContent:"center", alignItems:"center", padding: small ? 0 : "60px" }}>
    <div style={{ width: small?18:34, height: small?18:34, border:`3px solid ${C.lavender}`, borderTopColor:C.navy, borderRadius:"50%", animation:"spin .8s linear infinite" }}/>
  </div>
);

// ── Toast 
const Toast = ({ msg, type = "ok", onClose }) => (
  <div style={{ position:"fixed", bottom:24, right:24, zIndex:3000, background: type==="err" ? C.crimson : C.navy, color:"white", padding:"12px 20px", borderRadius:10, boxShadow:"0 8px 30px rgba(0,0,0,.3)", display:"flex", alignItems:"center", gap:10, fontSize:14, maxWidth:340, animation:"fadeIn .3s ease" }}>
    {type==="err" ? "ERROR" : "HECHO"} {msg}
    <button className="btn" onClick={onClose} style={{ background:"transparent", color:"rgba(255,255,255,.7)", marginLeft:"auto", padding:2 }}><Icon name="close" size={14}/></button>
  </div>
);

// ── Field 
const Field = ({ label, children }) => (
  <div>
    <label style={{ fontSize:12, color:C.muted, letterSpacing:".05em", textTransform:"uppercase", display:"block", marginBottom:4 }}>{label}</label>
    {children}
  </div>
);

//  LIGHTBOX — VISUALIZADOR COMPLETO
function Lightbox({ foto, fotos, onClose, onNav }) {
  const [zoom, setZoom]       = useState(1);
  const [meta, setMeta]       = useState(true);
  const [pos, setPos]         = useState({ x:0, y:0 });
  const [drag, setDrag]       = useState(false);
  const [ds, setDs]           = useState({ x:0, y:0 });
  const colFotos = fotos.filter(f => f.coleccion_id === foto.coleccion_id);
  const idx      = colFotos.findIndex(f => f.id === foto.id);
  const src      = storageUrl(foto.url_web || foto.url_original);

  useEffect(() => {
    const h = e => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight") { onNav(1);  setZoom(1); setPos({x:0,y:0}); }
      if (e.key === "ArrowLeft")  { onNav(-1); setZoom(1); setPos({x:0,y:0}); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [foto]);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(10,8,35,.97)", display:"flex", flexDirection:"column" }}
      onContextMenu={e => e.preventDefault()}>

      {/* ── Barra superior ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderBottom:`1px solid rgba(255,255,255,.08)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ color:C.steel, fontSize:12, letterSpacing:".1em", textTransform:"uppercase" }}>{idx+1} / {colFotos.length}</span>
          <span style={{ color:"white", fontFamily:"'Cormorant Garamond',serif", fontSize:18 }}>{foto.titulo}</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn" onClick={() => setZoom(z => Math.min(4, z+.5))} style={{ background:"rgba(255,255,255,.08)", color:"white", padding:"7px", borderRadius:8 }}><Icon name="zoomIn" size={16}/></button>
          <button className="btn" onClick={() => setZoom(z => Math.max(1, z-.5))} style={{ background:"rgba(255,255,255,.08)", color:"white", padding:"7px", borderRadius:8 }}><Icon name="zoomOut" size={16}/></button>
          <button className="btn" onClick={() => setMeta(v=>!v)} style={{ background: meta?"rgba(103,156,188,.3)":"rgba(255,255,255,.08)", color:"white", padding:"7px", borderRadius:8 }}><Icon name="info" size={16}/></button>
          {foto.descargable && (
            <a href={src} download target="_blank" rel="noreferrer"
              style={{ background:`rgba(145,108,63,.4)`, color:"white", padding:"7px 14px", borderRadius:8, fontSize:12, display:"flex", alignItems:"center", gap:6, textDecoration:"none", fontWeight:500 }}>
              <Icon name="download" size={14}/> Descargar
            </a>
          )}
          <button className="btn" onClick={onClose} style={{ background:"rgba(193,23,32,.3)", color:"white", padding:"7px", borderRadius:8 }}><Icon name="close" size={18}/></button>
        </div>
      </div>

      {/* ── Imagen ── */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}
        onWheel={e => { e.preventDefault(); setZoom(z => Math.min(4, Math.max(1, z - e.deltaY*.002))); }}
        onMouseDown={e => { if(zoom>1){ setDrag(true); setDs({x:e.clientX-pos.x, y:e.clientY-pos.y}); }}}
        onMouseMove={e => { if(drag) setPos({x:e.clientX-ds.x, y:e.clientY-ds.y}); }}
        onMouseUp={() => setDrag(false)}>
        <button className="btn" onClick={() => { onNav(-1); setZoom(1); setPos({x:0,y:0}); }}
          style={{ position:"absolute", left:16, zIndex:10, background:"rgba(255,255,255,.1)", color:"white", padding:"12px", borderRadius:"50%", display:"flex" }}>
          <Icon name="chevL" size={22}/>
        </button>
        {src
          ? <img src={src} alt={foto.titulo} draggable={false}
              style={{ maxWidth:"90%", maxHeight:"80vh", objectFit:"contain", transform:`scale(${zoom}) translate(${pos.x/zoom}px,${pos.y/zoom}px)`, transition: drag?"none":".2s", cursor: zoom>1?"grab":"zoom-in", userSelect:"none" }}/>
          : <div style={{ color:"rgba(255,255,255,.3)", textAlign:"center" }}><Icon name="photo" size={64} color="rgba(255,255,255,.1)"/><div style={{ marginTop:12, fontSize:13 }}>Sin imagen</div></div>
        }
        <button className="btn" onClick={() => { onNav(1); setZoom(1); setPos({x:0,y:0}); }}
          style={{ position:"absolute", right:16, zIndex:10, background:"rgba(255,255,255,.1)", color:"white", padding:"12px", borderRadius:"50%", display:"flex" }}>
          <Icon name="chevR" size={22}/>
        </button>
      </div>

      {/* ── Metadatos ── */}
      {meta && (
        <div style={{ background:"rgba(28,20,109,.55)", backdropFilter:"blur(20px)", padding:"16px 24px", borderTop:`1px solid rgba(255,255,255,.08)`, display:"flex", gap:28, flexWrap:"wrap" }}>
          {[["Autor",foto.autor],["Año",foto.anio],["Lugar",foto.lugar],["Edificio",foto.edificio],["Archivo",foto.tipo_archivo],["Derechos",foto.derechos]].map(([k,v]) => (
            <div key={k}>
              <div style={{ fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:C.steel, marginBottom:2 }}>{k}</div>
              <div style={{ fontSize:13, color:"white" }}>{v || "—"}</div>
            </div>
          ))}
          {foto.descripcion && (
            <div style={{ flex:1, minWidth:220 }}>
              <div style={{ fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:C.steel, marginBottom:2 }}>Descripción</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,.8)" }}>{foto.descripcion}</div>
            </div>
          )}
          {foto.keywords_texto && (
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:C.steel, marginBottom:4 }}>Palabras clave</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {foto.keywords_texto.split(",").map(k => (
                  <span key={k} style={{ background:"rgba(103,156,188,.25)", color:C.lavender, padding:"2px 8px", borderRadius:10, fontSize:11 }}>{k.trim()}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

//  TARJETA DE COLECCIÓN
function ColCard({ col, onClick }) {
  const cover = storageUrl(col.portada_url);
  return (
    <div className="card-hover img-zoom" onClick={() => onClick(col)}
      style={{ background:"white", borderRadius:12, overflow:"hidden", cursor:"pointer", border:`1px solid rgba(28,20,109,.08)` }}>
      <div style={{ position:"relative", paddingTop:"62%", overflow:"hidden" }}>
        {cover
          ? <img src={cover} alt={col.titulo} loading="lazy" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
          : <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,${C.navy},${C.steel})`, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="photo" size={40} color="rgba(255,255,255,.3)"/></div>
        }
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,8,35,.7) 0%,transparent 55%)" }}/>
        {col.tipo && <span className="poster-badge" style={{ position:"absolute", top:12, left:12 }}>{col.tipo}</span>}
        <span style={{ position:"absolute", bottom:12, right:12, background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)", color:"white", fontSize:11, padding:"4px 10px", borderRadius:20, fontWeight:500 }}>
          <Icon name="photo" size={11} color="white"/> {col.fotos_reales || col.total_fotos || 0} fotos
        </span>
      </div>
      <div style={{ padding:"16px 18px 18px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:600, color:C.navy, marginBottom:4, lineHeight:1.25 }}>{col.titulo}</h3>
        <div style={{ display:"flex", gap:10, marginBottom:8, flexWrap:"wrap" }}>
          {col.lugar && <span style={{ fontSize:12, color:C.muted }}>{col.lugar}</span>}
          {col.anio  && <><span style={{ fontSize:12, color:C.muted }}>·</span><span style={{ fontSize:12, color:C.muted }}>{col.anio}</span></>}
          {col.autor && <><span style={{ fontSize:12, color:C.muted }}>·</span><span style={{ fontSize:12, color:C.bronze }}>{col.autor}</span></>}
        </div>
        <p style={{ fontSize:13, color:C.muted, lineHeight:1.55, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{col.descripcion}</p>
        <div style={{ display:"flex", gap:4, marginTop:10, flexWrap:"wrap" }}>
          {col.tipo     && <span className="tag" style={{ background:C.lavender, color:C.navy }}>{col.tipo}</span>}
          {col.derechos && <span className="tag" style={{ background:"rgba(145,108,63,.1)", color:C.bronze }}>{col.derechos}</span>}
        </div>
      </div>
    </div>
  );
}

//  VISTA DE COLECCIÓN (fotos internas)
function ColView({ col, fotos, loading, onFotoClick, onBack }) {
  const colFotos = fotos.filter(f => f.coleccion_id === col.id);
  const cover    = storageUrl(col.portada_url);
  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{ position:"relative", height:320, borderRadius:16, overflow:"hidden", marginBottom:32 }}>
        {cover
          ? <img src={cover} alt={col.titulo} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          : <div style={{ width:"100%", height:"100%", background:`linear-gradient(135deg,${C.navy},${C.steel})` }}/>
        }
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(28,20,109,.85),rgba(28,20,109,.4))" }}/>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"32px 36px" }}>
          <button className="btn" onClick={onBack}
            style={{ color:C.steel, background:"transparent", fontSize:12, letterSpacing:".1em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:6, marginBottom:16, width:"fit-content" }}>
            <Icon name="chevL" size={14} color={C.steel}/> Volver
          </button>
          {col.tipo && <span className="poster-badge" style={{ marginBottom:10, width:"fit-content" }}>{col.tipo}</span>}
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,4vw,38px)", color:"white", lineHeight:1.1, marginBottom:8 }}>{col.titulo}</h2>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            {[["Lugar",col.lugar],["Año",col.anio],["Autor",col.autor],["Fotos",col.fotos_reales||colFotos.length]].map(([k,v]) => v && (
              <span key={k} style={{ fontSize:13, color:"rgba(255,255,255,.7)" }}><span style={{ color:C.steel }}>{k}:</span> {v}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Metadatos generales */}
      <div style={{ background:"white", borderRadius:12, padding:"20px 24px", marginBottom:28, border:`1px solid rgba(28,20,109,.08)`, display:"flex", flexWrap:"wrap", gap:20 }}>
        <div style={{ flex:2, minWidth:240 }}>
          <h4 style={{ fontSize:12, letterSpacing:".1em", textTransform:"uppercase", color:C.muted, marginBottom:6 }}>Descripción general</h4>
          <p style={{ fontSize:14, color:C.text, lineHeight:1.6 }}>{col.descripcion || "Sin descripción."}</p>
        </div>
        {col.derechos && (
          <div style={{ flex:1, minWidth:160 }}>
            <h4 style={{ fontSize:12, letterSpacing:".1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Derechos</h4>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <Icon name="shield" size={16} color={C.bronze}/>
              <span style={{ fontSize:13, color:C.text }}>{col.derechos}</span>
            </div>
          </div>
        )}
      </div>

      {/* Grid de fotos */}
      {loading ? <Spinner/> : colFotos.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 20px", color:C.muted }}>
          <Icon name="photo" size={40} color={C.lavender}/>
          <div style={{ marginTop:12, fontSize:16, fontFamily:"'Cormorant Garamond',serif", color:C.navy }}>Esta colección aún no tiene fotografías</div>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16 }}>
          {colFotos.map(foto => {
            const src = storageUrl(foto.url_web || foto.url_original);
            return (
              <div key={foto.id} className="card-hover img-zoom" onClick={() => onFotoClick(foto)}
                style={{ background:"white", borderRadius:10, overflow:"hidden", cursor:"pointer", border:`1px solid rgba(28,20,109,.06)` }}>
                <div style={{ position:"relative", paddingTop:"70%" }}>
                  {src
                    ? <img src={src} alt={foto.titulo} loading="lazy" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
                    : <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,${C.lavender},${C.steel})`, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="photo" size={28} color={C.navy}/></div>
                  }
                  {!foto.descargable && (
                    <div style={{ position:"absolute", top:8, right:8, background:"rgba(193,23,32,.85)", borderRadius:4, padding:"2px 6px", fontSize:10, color:"white", fontWeight:600 }}>🔒 Solo vista</div>
                  )}
                </div>
                <div style={{ padding:"12px 14px 14px" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:600, color:C.navy, marginBottom:2 }}>{foto.titulo}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{foto.autor} · {foto.anio}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

//  PANEL ADMIN — conectado a Supabase
function AdminPanel({ onClose, onRefresh }) {
  const [tab, setTab]         = useState("stats");
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);
  const [cols, setCols]       = useState([]);
  const [fotos, setFotos]     = useState([]);
  const [stats, setStats]     = useState(null);
  const [editCol, setEditCol] = useState(null);
  const [portadaFile, setPortadaFile]   = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const [newCol, setNewCol] = useState({
    titulo:"", descripcion:"", lugar:"", anio: new Date().getFullYear(),
    autor:"", edificio:"", tipo:"Arquitectura", derechos:"CC BY 4.0",
  });
  const [upForm, setUpForm] = useState({
    coleccion_id:"", titulo:"", autor:"", anio: new Date().getFullYear(),
    lugar:"", fecha_origen:"", descripcion:"", edificio:"",
    tipo_archivo:"TIFF", derechos:"CC BY 4.0", descargable:true, keywords:"",
  });

  const ok  = (msg)       => { setToast({msg,type:"ok"});  setTimeout(()=>setToast(null),3500); };
  const err = (msg)       => { setToast({msg,type:"err"}); setTimeout(()=>setToast(null),4000); };

  // ── Cargar datos desde Supabase
  const load = useCallback(async () => {
    const { data: c } = await supabase.from("v_colecciones").select("*").order("anio", { ascending:false });
    const { data: f } = await supabase.from("v_fotografias").select("*").order("creado_en", { ascending:false });
    const { count: nc } = await supabase.from("colecciones").select("*", { count:"exact", head:true });
    const { count: nf } = await supabase.from("fotografias").select("*", { count:"exact", head:true });
    const { count: nd } = await supabase.from("log_descargas").select("*", { count:"exact", head:true });
    setCols(c || []);
    setFotos(f || []);
    setStats({ colecciones: nc||0, fotografias: nf||0, descargas: nd||0 });
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Subir imagen a Supabase Storage
  const uploadImagen = async (file, folder = "fotos") => {
    if (!file) return null;
    const ext  = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("imagenes").upload(path, file, { upsert:true });
    if (error) throw new Error(error.message);
    return path; // guardamos solo el path, la URL pública se construye con storageUrl()
  };

  // ── Guardar fotografía 
  const doUpload = async () => {
    if (!upForm.titulo || !upForm.coleccion_id) return err("Título y colección son requeridos");
    setSaving(true);
    try {
      const urlPath = await uploadImagen(imgFile);
      const { data: fotoData, error: fErr } = await supabase.from("fotografias").insert([{
        coleccion_id: Number(upForm.coleccion_id),
        titulo:       upForm.titulo,
        autor:        upForm.autor,
        anio:         Number(upForm.anio) || null,
        lugar:        upForm.lugar,
        fecha_origen: upForm.fecha_origen || null,
        descripcion:  upForm.descripcion,
        edificio:     upForm.edificio,
        tipo_archivo: upForm.tipo_archivo,
        derechos:     upForm.derechos,
        descargable:  upForm.descargable,
        url_original: urlPath,
        url_web:      urlPath,
        url_thumbnail:urlPath,
      }]).select().single();
      if (fErr) throw new Error(fErr.message);

      // Guardar keywords
      if (upForm.keywords && fotoData) {
        const kws = upForm.keywords.split(",").map(k=>k.trim()).filter(Boolean);
        if (kws.length) {
          await supabase.from("keywords").insert(kws.map(keyword => ({ fotografia_id: fotoData.id, keyword })));
        }
      }
      // Actualizar conteo
      await supabase.rpc("actualizar_total_fotos", { col_id: Number(upForm.coleccion_id) }).catch(()=>{});

      ok("Fotografía guardada en Supabase ✓");
      setImgFile(null);
      setUpForm(f => ({ ...f, titulo:"", descripcion:"", keywords:"", fecha_origen:"" }));
      load(); onRefresh();
    } catch(e) { err(e.message); }
    setSaving(false);
  };

  // ── Crear colección
  const doNewCol = async () => {
    if (!newCol.titulo) return err("El título es requerido");
    setSaving(true);
    try {
      const portPath = await uploadImagen(portadaFile, "portadas");
      const { error } = await supabase.from("colecciones").insert([{
        ...newCol,
        anio:        Number(newCol.anio) || null,
        portada_url: portPath,
      }]);
      if (error) throw new Error(error.message);
      ok("Colección creada en Supabase ✓");
      setPortadaFile(null);
      setNewCol({ titulo:"", descripcion:"", lugar:"", anio: new Date().getFullYear(), autor:"", edificio:"", tipo:"Arquitectura", derechos:"CC BY 4.0" });
      load(); onRefresh();
    } catch(e) { err(e.message); }
    setSaving(false);
  };

  // ── Guardar edición de colección
  const doSaveCol = async () => {
    setSaving(true);
    try {
      const portPath = portadaFile ? await uploadImagen(portadaFile, "portadas") : undefined;
      const updates  = { titulo:editCol.titulo, descripcion:editCol.descripcion, lugar:editCol.lugar, anio:Number(editCol.anio)||null, autor:editCol.autor, edificio:editCol.edificio, tipo:editCol.tipo, derechos:editCol.derechos };
      if (portPath) updates.portada_url = portPath;
      const { error } = await supabase.from("colecciones").update(updates).eq("id", editCol.id);
      if (error) throw new Error(error.message);
      ok("Colección actualizada ✓"); setEditCol(null); setPortadaFile(null);
      load(); onRefresh();
    } catch(e) { err(e.message); }
    setSaving(false);
  };

  // ── Eliminar colección 
  const delCol = async (id) => {
    if (!window.confirm("¿Eliminar esta colección y todas sus fotos?")) return;
    const { error } = await supabase.from("colecciones").delete().eq("id", id);
    error ? err(error.message) : (ok("Colección eliminada"), load(), onRefresh());
  };

  // ── Toggle descargable
  const toggleDl = async (foto) => {
    const { error } = await supabase.from("fotografias").update({ descargable: !foto.descargable }).eq("id", foto.id);
    error ? err(error.message) : (ok("Permiso actualizado ✓"), load(), onRefresh());
  };

  // ── Eliminar foto 
  const delFoto = async (foto) => {
    if (!window.confirm("¿Eliminar esta fotografía?")) return;
    if (foto.url_original) {
      await supabase.storage.from("imagenes").remove([foto.url_original]).catch(()=>{});
    }
    const { error } = await supabase.from("fotografias").delete().eq("id", foto.id);
    error ? err(error.message) : (ok("Fotografía eliminada"), load(), onRefresh());
  };

  const TABS = [
    { id:"stats", label:"Estadísticas",        icon:"stats" },
    { id:"upload",label:"Subir Imagen",         icon:"upload" },
    { id:"newcol",label:"Nueva Colección",      icon:"plus" },
    { id:"cols",  label:"Gestionar Colecciones",icon:"cols" },
    { id:"fotos", label:"Gestionar Fotos",      icon:"photo" },
  ];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(10,8,35,.8)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"white", borderRadius:16, width:"100%", maxWidth:900, maxHeight:"92vh", display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 30px 100px rgba(28,20,109,.35)" }}>

        {/* Header */}
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.mid})`, padding:"18px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"white", fontWeight:600 }}>Panel Administrativo</div>
            <div style={{ fontSize:12, color:"rgba(235,238,255,.6)" }}>Supabase · PostgreSQL · {SUPABASE_URL.split("//")[1]?.split(".")[0]}</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn" onClick={() => { load(); onRefresh(); }} style={{ background:"rgba(255,255,255,.1)", color:"white", padding:"8px", borderRadius:8 }}><Icon name="refresh" size={16}/></button>
            <button className="btn" onClick={onClose} style={{ background:"rgba(193,23,32,.3)", color:"white", padding:"8px", borderRadius:8 }}><Icon name="close" size={18}/></button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:`2px solid ${C.lavender}`, padding:"0 16px", background:"#f7f8ff", overflowX:"auto", flexShrink:0 }}>
          {TABS.map(t => (
            <button key={t.id} className="btn" onClick={() => setTab(t.id)}
              style={{ padding:"11px 14px", fontSize:12, color: tab===t.id?C.navy:C.muted, fontWeight: tab===t.id?600:400, background:"transparent", borderBottom: tab===t.id?`2px solid ${C.navy}`:"2px solid transparent", marginBottom:-2, display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap" }}>
              <Icon name={t.icon} size={13} color={tab===t.id?C.navy:C.muted}/> {t.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div style={{ flex:1, overflowY:"auto", padding:24 }}>

          {/* ── ESTADÍSTICAS ── */}
          {tab==="stats" && (
            <div className="fade-in">
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.navy, marginBottom:20 }}>Estadísticas en tiempo real</h3>
              {stats ? (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }}>
                  {[["Colecciones",stats.colecciones,"cols",C.navy],["Fotografías",stats.fotografias,"photo",C.steel],["Descargas",stats.descargas,"download",C.bronze]].map(([label,val,icon,color]) => (
                    <div key={label} style={{ background:"white", border:`1px solid ${C.lavender}`, borderRadius:12, padding:"20px", textAlign:"center" }}>
                      <div style={{ width:40, height:40, background:`${color}20`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}><Icon name={icon} size={20} color={color}/></div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, color, fontWeight:600 }}>{val}</div>
                      <div style={{ fontSize:11, color:C.muted, letterSpacing:".06em", textTransform:"uppercase", marginTop:2 }}>{label}</div>
                    </div>
                  ))}
                </div>
              ) : <Spinner/>}
              <div style={{ marginTop:20, padding:16, background:C.lavender, borderRadius:12, fontSize:13, color:C.navy }}>
                💡 <strong>Supabase:</strong> También puedes editar datos directamente en <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" style={{ color:C.steel }}>supabase.com → Table Editor</a> y los cambios se reflejarán aquí automáticamente.
              </div>
            </div>
          )}

          {/* ── SUBIR IMAGEN ── */}
          {tab==="upload" && (
            <div className="fade-in">
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.navy, marginBottom:20 }}>Subir nueva fotografía</h3>
              <label htmlFor="img-up" style={{ display:"block", cursor:"pointer", marginBottom:20 }}>
                <div style={{ border:`2px dashed ${imgFile?C.navy:C.steel}`, borderRadius:12, padding:"24px 20px", textAlign:"center", background: imgFile?`${C.navy}08`:C.lavender, transition:"all .2s" }}>
                  <Icon name="upload" size={28} color={imgFile?C.navy:C.steel}/>
                  <div style={{ fontSize:15, fontFamily:"'Cormorant Garamond',serif", color:C.navy, marginTop:8, marginBottom:2 }}>
                    {imgFile ? `✅ ${imgFile.name}` : "Arrastra una imagen aquí"}
                  </div>
                  {!imgFile && <div style={{ fontSize:12, color:C.muted }}>o haz clic para seleccionar · Se sube a Supabase Storage</div>}
                  <div style={{ marginTop:8, display:"flex", justifyContent:"center", flexWrap:"wrap", gap:4 }}>
                    {["TIFF","JPG","PNG","WEBP","GIF","BMP","SVG","HEIC"].map(f => (
                      <span key={f} style={{ background:"white", border:`1px solid rgba(28,20,109,.15)`, color:C.navy, fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:4 }}>{f}</span>
                    ))}
                  </div>
                </div>
              </label>
              <input id="img-up" type="file" accept="image/*,.tif,.tiff,.heic,.heif" style={{ display:"none" }} onChange={e => setImgFile(e.target.files[0]||null)}/>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <Field label="Colección *">
                  <select value={upForm.coleccion_id} onChange={e => setUpForm(f=>({...f,coleccion_id:e.target.value}))} style={{ ...INP, background:"white" }}>
                    <option value="">— Selecciona —</option>
                    {cols.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
                  </select>
                </Field>
                <Field label="Título *"><input value={upForm.titulo} onChange={e=>setUpForm(f=>({...f,titulo:e.target.value}))} style={INP}/></Field>
                <Field label="Autor"><input value={upForm.autor} onChange={e=>setUpForm(f=>({...f,autor:e.target.value}))} style={INP}/></Field>
                <Field label="Año"><input type="number" value={upForm.anio} onChange={e=>setUpForm(f=>({...f,anio:e.target.value}))} style={INP}/></Field>
                <Field label="Lugar"><input value={upForm.lugar} onChange={e=>setUpForm(f=>({...f,lugar:e.target.value}))} style={INP}/></Field>
                <Field label="Fecha de origen"><input type="date" value={upForm.fecha_origen} onChange={e=>setUpForm(f=>({...f,fecha_origen:e.target.value}))} style={INP}/></Field>
                <Field label="Edificio"><input value={upForm.edificio} onChange={e=>setUpForm(f=>({...f,edificio:e.target.value}))} style={INP}/></Field>
                <Field label="Tipo de archivo">
                  <select value={upForm.tipo_archivo} onChange={e=>setUpForm(f=>({...f,tipo_archivo:e.target.value}))} style={{ ...INP, background:"white" }}>
                    {["TIFF","JPG","PNG","WEBP","GIF","BMP","HEIC"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Derechos de uso"><input value={upForm.derechos} onChange={e=>setUpForm(f=>({...f,derechos:e.target.value}))} style={INP}/></Field>
                <Field label="Palabras clave (separadas por coma)"><input value={upForm.keywords} onChange={e=>setUpForm(f=>({...f,keywords:e.target.value}))} placeholder="patrimonio, arquitectura, 1920" style={INP}/></Field>
                <div style={{ gridColumn:"1/-1" }}>
                  <Field label="Descripción"><textarea value={upForm.descripcion} onChange={e=>setUpForm(f=>({...f,descripcion:e.target.value}))} rows={3} style={{ ...INP, resize:"vertical" }}/></Field>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <input type="checkbox" id="dl" checked={upForm.descargable} onChange={e=>setUpForm(f=>({...f,descargable:e.target.checked}))} style={{ width:16, height:16 }}/>
                  <label htmlFor="dl" style={{ fontSize:13, color:C.text, cursor:"pointer" }}>Permitir descarga pública</label>
                </div>
              </div>
              <button className="btn" onClick={doUpload} disabled={saving}
                style={{ marginTop:20, background:`linear-gradient(135deg,${C.navy},${C.mid})`, color:"white", padding:"11px 28px", borderRadius:10, fontSize:14, display:"flex", alignItems:"center", gap:8, opacity:saving?.6:1 }}>
                {saving ? <Spinner small/> : <Icon name="upload" size={15} color="white"/>} {saving?"Subiendo a Supabase…":"Guardar en Supabase"}
              </button>
            </div>
          )}

          {/* ── NUEVA COLECCIÓN ── */}
          {tab==="newcol" && (
            <div className="fade-in">
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.navy, marginBottom:20 }}>Crear nueva colección</h3>
              <label htmlFor="port-up" style={{ display:"block", cursor:"pointer", marginBottom:20 }}>
                <div style={{ border:`2px dashed ${portadaFile?C.navy:C.steel}`, borderRadius:12, padding:"20px", textAlign:"center", background: portadaFile?`${C.navy}08`:C.lavender }}>
                  <Icon name="photo" size={24} color={portadaFile?C.navy:C.steel}/>
                  <div style={{ fontSize:14, color:C.navy, marginTop:6 }}>{portadaFile ? `✅ ${portadaFile.name}` : "Imagen de portada (opcional)"}</div>
                </div>
              </label>
              <input id="port-up" type="file" accept="image/*" style={{ display:"none" }} onChange={e=>setPortadaFile(e.target.files[0]||null)}/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div style={{ gridColumn:"1/-1" }}><Field label="Título *"><input value={newCol.titulo} onChange={e=>setNewCol(f=>({...f,titulo:e.target.value}))} style={INP}/></Field></div>
                <Field label="Lugar"><input value={newCol.lugar} onChange={e=>setNewCol(f=>({...f,lugar:e.target.value}))} style={INP}/></Field>
                <Field label="Año"><input type="number" value={newCol.anio} onChange={e=>setNewCol(f=>({...f,anio:e.target.value}))} style={INP}/></Field>
                <Field label="Autor"><input value={newCol.autor} onChange={e=>setNewCol(f=>({...f,autor:e.target.value}))} style={INP}/></Field>
                <Field label="Edificio"><input value={newCol.edificio} onChange={e=>setNewCol(f=>({...f,edificio:e.target.value}))} style={INP}/></Field>
                <Field label="Tipo">
                  <select value={newCol.tipo} onChange={e=>setNewCol(f=>({...f,tipo:e.target.value}))} style={{ ...INP, background:"white" }}>
                    {["Arquitectura","Arqueología","Evento","Patrimonio Rural","Patrimonio Inmaterial","Otro"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Derechos"><input value={newCol.derechos} onChange={e=>setNewCol(f=>({...f,derechos:e.target.value}))} style={INP}/></Field>
                <div style={{ gridColumn:"1/-1" }}><Field label="Descripción"><textarea value={newCol.descripcion} onChange={e=>setNewCol(f=>({...f,descripcion:e.target.value}))} rows={3} style={{ ...INP, resize:"vertical" }}/></Field></div>
              </div>
              <button className="btn" onClick={doNewCol} disabled={saving}
                style={{ marginTop:20, background:`linear-gradient(135deg,${C.navy},${C.mid})`, color:"white", padding:"11px 28px", borderRadius:10, fontSize:14, display:"flex", alignItems:"center", gap:8, opacity:saving?.6:1 }}>
                {saving?<Spinner small/>:<Icon name="plus" size={15} color="white"/>} Crear colección en Supabase
              </button>
            </div>
          )}

          {/* ── GESTIONAR COLECCIONES ── */}
          {tab==="cols" && (
            <div className="fade-in">
              {editCol ? (
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.navy }}>Editar: {editCol.titulo}</h3>
                    <button className="btn" onClick={()=>setEditCol(null)} style={{ color:C.muted, background:"transparent", fontSize:13, display:"flex", alignItems:"center", gap:6 }}><Icon name="x" size={14}/> Cancelar</button>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div style={{ gridColumn:"1/-1" }}><Field label="Título"><input value={editCol.titulo||""} onChange={e=>setEditCol(f=>({...f,titulo:e.target.value}))} style={INP}/></Field></div>
                    <Field label="Lugar"><input value={editCol.lugar||""} onChange={e=>setEditCol(f=>({...f,lugar:e.target.value}))} style={INP}/></Field>
                    <Field label="Año"><input type="number" value={editCol.anio||""} onChange={e=>setEditCol(f=>({...f,anio:e.target.value}))} style={INP}/></Field>
                    <Field label="Autor"><input value={editCol.autor||""} onChange={e=>setEditCol(f=>({...f,autor:e.target.value}))} style={INP}/></Field>
                    <Field label="Edificio"><input value={editCol.edificio||""} onChange={e=>setEditCol(f=>({...f,edificio:e.target.value}))} style={INP}/></Field>
                    <Field label="Tipo"><input value={editCol.tipo||""} onChange={e=>setEditCol(f=>({...f,tipo:e.target.value}))} style={INP}/></Field>
                    <Field label="Derechos"><input value={editCol.derechos||""} onChange={e=>setEditCol(f=>({...f,derechos:e.target.value}))} style={INP}/></Field>
                    <div style={{ gridColumn:"1/-1" }}><Field label="Descripción"><textarea value={editCol.descripcion||""} onChange={e=>setEditCol(f=>({...f,descripcion:e.target.value}))} rows={3} style={{ ...INP, resize:"vertical" }}/></Field></div>
                    <div>
                      <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:".05em" }}>Nueva portada (opcional)</label>
                      <input type="file" accept="image/*" onChange={e=>setPortadaFile(e.target.files[0]||null)} style={{ fontSize:12, color:C.text }}/>
                    </div>
                  </div>
                  <button className="btn" onClick={doSaveCol} disabled={saving}
                    style={{ marginTop:20, background:`linear-gradient(135deg,${C.navy},${C.mid})`, color:"white", padding:"11px 28px", borderRadius:10, fontSize:14, display:"flex", alignItems:"center", gap:8 }}>
                    {saving?<Spinner small/>:<Icon name="save" size={15} color="white"/>} Guardar en Supabase
                  </button>
                </>
              ) : (
                <>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.navy, marginBottom:20 }}>Colecciones ({cols.length})</h3>
                  {cols.map(col => (
                    <div key={col.id} style={{ display:"flex", gap:14, alignItems:"center", padding:"12px 14px", borderRadius:10, border:`1px solid ${C.lavender}`, marginBottom:10 }}>
                      <div style={{ width:56, height:42, borderRadius:6, overflow:"hidden", flexShrink:0, background:C.lavender, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {storageUrl(col.portada_url) ? <img src={storageUrl(col.portada_url)} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : <Icon name="photo" size={18} color={C.muted}/>}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, fontSize:14, color:C.navy }}>{col.titulo}</div>
                        <div style={{ fontSize:12, color:C.muted }}>{col.fotos_reales||col.total_fotos||0} fotos · {col.anio} · {col.lugar}</div>
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <button className="btn" onClick={()=>setEditCol({...col})} style={{ background:C.lavender, color:C.navy, padding:"6px 12px", borderRadius:6, fontSize:12, display:"flex", alignItems:"center", gap:5 }}><Icon name="edit" size={12}/>Editar</button>
                        <button className="btn" onClick={()=>delCol(col.id)} style={{ background:"rgba(193,23,32,.1)", color:C.crimson, padding:"6px 12px", borderRadius:6, fontSize:12, display:"flex", alignItems:"center", gap:5 }}><Icon name="trash" size={12}/>Eliminar</button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* ── GESTIONAR FOTOS ── */}
          {tab==="fotos" && (
            <div className="fade-in">
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.navy, marginBottom:20 }}>Fotografías ({fotos.length})</h3>
              {fotos.map(foto => (
                <div key={foto.id} style={{ display:"flex", gap:14, alignItems:"center", padding:"12px 14px", borderRadius:10, border:`1px solid ${C.lavender}`, marginBottom:10 }}>
                  <div style={{ width:52, height:40, borderRadius:6, overflow:"hidden", flexShrink:0, background:C.lavender, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {storageUrl(foto.url_web||foto.url_original) ? <img src={storageUrl(foto.url_web||foto.url_original)} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : <Icon name="photo" size={16} color={C.muted}/>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:13, color:C.navy }}>{foto.titulo}</div>
                    <div style={{ fontSize:11, color:C.muted }}>{foto.autor} · {foto.anio} · {foto.coleccion_titulo||""}</div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <button className="btn" onClick={()=>toggleDl(foto)}
                      style={{ background: foto.descargable?"rgba(103,156,188,.15)":"rgba(193,23,32,.1)", color: foto.descargable?C.steel:C.crimson, padding:"5px 10px", borderRadius:6, fontSize:11, display:"flex", alignItems:"center", gap:5 }}>
                      <Icon name={foto.descargable?"unlock":"lock"} size={12}/> {foto.descargable?"Descargable":"Solo vista"}
                    </button>
                    <button className="btn" onClick={()=>delFoto(foto)} style={{ background:"rgba(193,23,32,.1)", color:C.crimson, padding:"6px", borderRadius:6, display:"flex" }}><Icon name="trash" size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}

//  APP PRINCIPAL
export default function Fototeca() {
  const [view,        setView]        = useState("home");
  const [activeCol,   setActiveCol]   = useState(null);
  const [lightbox,    setLightbox]    = useState(null);
  const [search,      setSearch]      = useState("");
  const [showSug,     setShowSug]     = useState(false);
  const [sugIdx,      setSugIdx]      = useState(0);
  const [filters,     setFilters]     = useState({ years:[], places:[], authors:[], buildings:[], types:[], rights:[] });
  const [gridMode,    setGridMode]    = useState("grid");
  const [page,        setPage]        = useState("gallery");
  const [cols,        setCols]        = useState([]);
  const [fotos,       setFotos]       = useState([]);
  const [filterOpts,  setFilterOpts]  = useState({ years:[], places:[], authors:[], buildings:[], types:[], rights:[] });
  const [loading,     setLoading]     = useState(true);
  const [colLoading,  setColLoading]  = useState(false);
  const [showAdmin,   setShowAdmin]   = useState(false);
  const [adminPass,   setAdminPass]   = useState("");
  const [adminOk,     setAdminOk]     = useState(false);
  const [passErr,     setPassErr]     = useState("");

  // ── Cargar colecciones y filtros desde Supabase
  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data: c } = await supabase.from("v_colecciones").select("*").order("anio", { ascending:false });
    const colData = c || [];
    setCols(colData);
    setFilterOpts({
      years:     [...new Set(colData.map(x=>String(x.anio)).filter(Boolean))].sort((a,b)=>b-a),
      places:    [...new Set(colData.map(x=>x.lugar).filter(Boolean))],
      authors:   [...new Set(colData.map(x=>x.autor).filter(Boolean))],
      buildings: [...new Set(colData.map(x=>x.edificio).filter(Boolean))],
      types:     [...new Set(colData.map(x=>x.tipo).filter(Boolean))],
      rights:    [...new Set(colData.map(x=>x.derechos).filter(Boolean))],
    });
    setLoading(false);
  }, []);

  // ── Cargar fotos de una colección
  const fetchFotos = useCallback(async (colId) => {
    setColLoading(true);
    const { data: f } = await supabase.from("v_fotografias").select("*").eq("coleccion_id", colId).order("creado_en");
    setFotos(prev => [...prev.filter(p => p.coleccion_id !== colId), ...(f||[])]);
    setColLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, []);
  useEffect(() => {
    const t = setInterval(() => setSugIdx(i => (i+1) % SUGERENCIAS.length), 3000);
    return () => clearInterval(t);
  }, []);

  // ── Filtros 
  const toggleFilter = (cat, val) =>
    setFilters(f => ({ ...f, [cat]: f[cat].includes(val) ? f[cat].filter(x=>x!==val) : [...f[cat], val] }));

  const filtered = cols.filter(col => {
    const q = search.toLowerCase();
    return (!q || col.titulo?.toLowerCase().includes(q) || col.lugar?.toLowerCase().includes(q) || col.autor?.toLowerCase().includes(q))
      && (!filters.years.length    || filters.years.includes(String(col.anio)))
      && (!filters.places.length   || filters.places.some(p => col.lugar?.includes(p)))
      && (!filters.authors.length  || filters.authors.includes(col.autor))
      && (!filters.buildings.length|| filters.buildings.includes(col.edificio))
      && (!filters.types.length    || filters.types.includes(col.tipo))
      && (!filters.rights.length   || filters.rights.includes(col.derechos));
  });

  const handleColClick = async (col) => {
    setActiveCol(col); setView("collection");
    await fetchFotos(col.id);
  };

  const handleNav = dir => {
    if (!lightbox) return;
    const col = fotos.filter(f => f.coleccion_id === lightbox.coleccion_id);
    const idx = col.findIndex(f => f.id === lightbox.id);
    setLightbox(col[(idx + dir + col.length) % col.length]);
  };

  const activeFilters = Object.values(filters).flat().length;
  const totalFotos    = cols.reduce((a, c) => a + (c.fotos_reales || c.total_fotos || 0), 0);

  // ── Admin: login simple con contraseña ───────────────────────────────────
  // PRECAUCIÓN!! Cambia "admin123" por una constraseña segura
  const ADMIN_PASS = "admin123";//AQUI SE CAMBIA
  const tryLogin = () => {
    if (adminPass === ADMIN_PASS) { setAdminOk(true); setPassErr(""); }
    else { setPassErr("Contraseña incorrecta"); }
  };

  const FilterGroup = ({ title, cat, opts = [] }) => (
    <div style={{ marginBottom:18 }}>
      <div style={{ fontSize:11, letterSpacing:".1em", textTransform:"uppercase", color:C.muted, marginBottom:8, fontWeight:600 }}>{title}</div>
      {opts.length === 0
        ? <div style={{ fontSize:12, color:C.lavender }}>—</div>
        : opts.map(o => (
          <div key={o} className="cb">
            <input type="checkbox" id={`${cat}-${o}`} checked={filters[cat].includes(o)} onChange={()=>toggleFilter(cat,o)}/>
            <label htmlFor={`${cat}-${o}`}>{o}</label>
          </div>
        ))
      }
    </div>
  );

  return (
    <>
      <style>{GS}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:`rgba(28,20,109,.97)`, backdropFilter:"blur(16px)", borderBottom:`1px solid rgba(255,255,255,.08)` }}>
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", gap:16, height:62 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
            <div style={{ width:38, height:38, background:`linear-gradient(135deg,${C.bronze},${C.steel})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="photo" size={18} color="white"/>
            </div>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, color:"white", lineHeight:1 }}>Fototeca</div>
              <div style={{ fontSize:9, letterSpacing:".12em", color:`rgba(235,238,255,.5)`, textTransform:"uppercase" }}>Del ITZ</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:4, marginLeft:16 }}>
            {[["gallery","Colecciones"],["about","Acerca de"]].map(([id,label]) => (
              <button key={id} className="btn" onClick={() => { setPage(id); setView("home"); }}
                style={{ color: page===id?"white":C.lavender, background: page===id?"rgba(255,255,255,.1)":"transparent", padding:"6px 14px", borderRadius:6, fontSize:13, opacity: page===id?1:.7 }}>{label}</button>
            ))}
          </div>
          <div style={{ flex:1 }}/>
          <button className="btn" onClick={() => setShowAdmin(true)}
            style={{ background:`rgba(145,108,63,.3)`, color:"white", padding:"7px 14px", borderRadius:8, fontSize:12, display:"flex", alignItems:"center", gap:6, border:`1px solid rgba(145,108,63,.4)` }}>
            <Icon name="settings" size={13} color="white"/> Admin
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      {view==="home" && page==="gallery" && (
        <div style={{ background:`linear-gradient(160deg,${C.navy} 0%,${C.mid} 60%,${C.steel} 100%)`, padding:"56px 24px 60px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"rgba(103,156,188,.08)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:-60, left:-60, width:300, height:300, borderRadius:"50%", background:"rgba(145,108,63,.07)", pointerEvents:"none" }}/>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, letterSpacing:".25em", color:C.steel, textTransform:"uppercase", marginBottom:14 }}>Repositorio fotográfico</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,5vw,58px)", color:"white", lineHeight:1.1, marginBottom:16 }}>
            Fototeca Digital<br/><em style={{ color:C.lavender, fontWeight:400 }}>del Patrimonio</em>
          </h1>
          <p style={{ color:"rgba(255,255,255,.6)", fontSize:15, maxWidth:520, margin:"0 auto 32px", lineHeight:1.6 }}>
            Archivo visual institucional con {loading ? "…" : totalFotos} fotografías de patrimonio histórico, arquitectónico y cultural.
          </p>

          {/* Buscador */}
          <div style={{ maxWidth:560, margin:"0 auto", position:"relative" }}>
            <div style={{ display:"flex", alignItems:"center", background:"white", borderRadius:12, padding:"0 16px", boxShadow:"0 8px 40px rgba(0,0,0,.25)" }}>
              <Icon name="search" size={18} color={C.muted}/>
              <input value={search} onChange={e=>{setSearch(e.target.value);setShowSug(true);}}
                onFocus={() => setShowSug(true)} onBlur={() => setTimeout(()=>setShowSug(false),200)}
                placeholder={`Buscar: ${SUGERENCIAS[sugIdx]}…`}
                style={{ flex:1, padding:"14px 12px", border:"none", outline:"none", fontSize:14, color:C.text, background:"transparent" }}/>
              {search && <button className="btn" onClick={()=>setSearch("")} style={{ background:"transparent", padding:4, color:C.muted }}><Icon name="x" size={14}/></button>}
            </div>
            {showSug && search.length > 0 && (
              <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:"white", borderRadius:10, boxShadow:"0 12px 40px rgba(0,0,0,.2)", zIndex:200, overflow:"hidden" }}>
                {SUGERENCIAS.filter(s=>s.toLowerCase().includes(search.toLowerCase())).slice(0,5).map(s => (
                  <div key={s} onClick={()=>{setSearch(s);setShowSug(false);}}
                    style={{ padding:"10px 16px", fontSize:13, color:C.text, cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lavender}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <Icon name="search" size={13} color={C.muted}/> {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ display:"flex", justifyContent:"center", gap:32, marginTop:32, flexWrap:"wrap" }}>
            {[[String(cols.length),"Colecciones"],[String(totalFotos),"Fotografías"],[String(new Set(cols.map(c=>c.autor)).size),"Autores"],[String(new Set(cols.map(c=>c.edificio)).size),"Edificios"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:"white", fontWeight:600 }}>{loading?"…":n}</div>
                <div style={{ fontSize:11, color:"rgba(235,238,255,.5)", letterSpacing:".1em", textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ACERCA DE ── */}
      {page==="about" && (
        <div style={{ maxWidth:780, margin:"60px auto", padding:"0 24px" }} className="fade-in">
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:38, color:C.navy, marginBottom:20 }}>Acerca de la Fototeca</h2>
          <div style={{ width:60, height:3, background:C.bronze, marginBottom:28 }}/>
          <p style={{ fontSize:15, lineHeight:1.8, color:C.text, marginBottom:20 }}>La <strong>Fototeca Digital del Instituto Tecnológico De Zacatecas</strong> es un repositorio institucional de acceso público que preserva, organiza y difunde el acervo fotográfico histórico y contemporáneo del patrimonio arquitectónico, arqueológico y cultural de México.</p>
          <p style={{ fontSize:15, lineHeight:1.8, color:C.text, marginBottom:20 }}>Las imágenes se almacenan en <strong>formato TIFF de alta resolución</strong> y se distribuyen en versiones optimizadas (JPG/WEBP). Los datos viven en <strong>Supabase (PostgreSQL)</strong> y las imágenes en <strong>Supabase Storage</strong>, garantizando disponibilidad global y copias de seguridad automáticas.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16, marginTop:32 }}>
            {[["Preservación","TIFF sin pérdida de calidad"],["Base de datos","PostgreSQL via Supabase"],["Almacenamiento","Supabase Storage (CDN global)"],["Seguridad","Acceso por roles y permisos"]].map(([t,d]) => (
              <div key={t} style={{ background:"white", borderRadius:12, padding:20, border:`1px solid rgba(28,20,109,.08)` }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:C.navy, marginBottom:6, fontWeight:600 }}>{t}</div>
                <div style={{ fontSize:13, color:C.muted, lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── GALERÍA + SIDEBAR ── */}
      {page==="gallery" && (
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"28px 16px", display:"flex", gap:24 }}>

          {/* Sidebar filtros */}
          <aside style={{ width:230, flexShrink:0, position:"sticky", top:82, alignSelf:"flex-start", maxHeight:"calc(100vh - 100px)", overflowY:"auto" }}>
            <div style={{ background:"white", borderRadius:12, padding:20, border:`1px solid rgba(28,20,109,.08)` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <span style={{ fontSize:13, fontWeight:600, color:C.navy, display:"flex", alignItems:"center", gap:7 }}>
                  <Icon name="filter" size={13} color={C.navy}/> Filtros
                  {activeFilters > 0 && <span style={{ background:C.navy, color:"white", borderRadius:"50%", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>{activeFilters}</span>}
                </span>
                {activeFilters > 0 && (
                  <button className="btn" onClick={() => setFilters({ years:[], places:[], authors:[], buildings:[], types:[], rights:[] })} style={{ fontSize:11, color:C.crimson, background:"transparent" }}>Limpiar</button>
                )}
              </div>
              <FilterGroup title="Año"      cat="years"     opts={filterOpts.years}/>
              <FilterGroup title="Lugar"    cat="places"    opts={filterOpts.places}/>
              <FilterGroup title="Autor"    cat="authors"   opts={filterOpts.authors}/>
              <FilterGroup title="Edificio" cat="buildings" opts={filterOpts.buildings}/>
              <FilterGroup title="Tipo"     cat="types"     opts={filterOpts.types}/>
              <FilterGroup title="Derechos" cat="rights"    opts={filterOpts.rights}/>
            </div>
          </aside>

          {/* Contenido principal */}
          <main style={{ flex:1, minWidth:0 }}>
            {view==="home" && (
              <>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
                  <span style={{ fontSize:13, color:C.muted }}>
                    {loading ? "Cargando desde Supabase…" : `${filtered.length} colección${filtered.length!==1?"es":""} encontrada${filtered.length!==1?"s":""}`}
                    {activeFilters>0 && <span style={{ marginLeft:8, color:C.bronze, fontSize:12 }}>({activeFilters} filtro{activeFilters!==1?"s":""} activo{activeFilters!==1?"s":""})</span>}
                  </span>
                  <div style={{ display:"flex", gap:6 }}>
                    <button className="btn" onClick={fetchAll} style={{ background:C.lavender, color:C.navy, padding:"7px", borderRadius:7 }}><Icon name="refresh" size={15} color={C.navy}/></button>
                    <button className="btn" onClick={()=>setGridMode("grid")} style={{ background: gridMode==="grid"?C.navy:C.lavender, color: gridMode==="grid"?"white":C.navy, padding:"7px", borderRadius:7 }}><Icon name="grid" size={15} color={gridMode==="grid"?"white":C.navy}/></button>
                    <button className="btn" onClick={()=>setGridMode("list")} style={{ background: gridMode==="list"?C.navy:C.lavender, color: gridMode==="list"?"white":C.navy, padding:"7px", borderRadius:7 }}><Icon name="list" size={15} color={gridMode==="list"?"white":C.navy}/></button>
                  </div>
                </div>

                {loading ? <Spinner/> : filtered.length===0 ? (
                  <div style={{ textAlign:"center", padding:"80px 20px", color:C.muted }}>
                    <Icon name="photo" size={48} color={C.lavender}/>
                    <div style={{ fontSize:20, fontFamily:"'Cormorant Garamond',serif", color:C.navy, marginTop:16 }}>Sin resultados</div>
                    <div style={{ fontSize:14, marginTop:6 }}>Modifica los filtros o el término de búsqueda</div>
                    <button className="btn" onClick={fetchAll} style={{ marginTop:16, background:C.navy, color:"white", padding:"10px 24px", borderRadius:8, fontSize:13, display:"inline-flex", alignItems:"center", gap:8 }}>
                      <Icon name="refresh" size={14} color="white"/> Recargar desde Supabase
                    </button>
                  </div>
                ) : gridMode==="grid" ? (
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }} className="fade-in">
                    {filtered.map(col => <ColCard key={col.id} col={col} onClick={handleColClick}/>)}
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }} className="fade-in">
                    {filtered.map(col => (
                      <div key={col.id} className="card-hover" onClick={() => handleColClick(col)}
                        style={{ background:"white", borderRadius:12, overflow:"hidden", cursor:"pointer", display:"flex", border:`1px solid rgba(28,20,109,.08)` }}>
                        <div className="img-zoom" style={{ width:140, height:105, flexShrink:0, background:C.lavender, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {storageUrl(col.portada_url) ? <img src={storageUrl(col.portada_url)} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : <Icon name="photo" size={28} color={C.muted}/>}
                        </div>
                        <div style={{ padding:"14px 18px", flex:1 }}>
                          <div style={{ display:"flex", gap:8, alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap" }}>
                            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:C.navy, fontWeight:600 }}>{col.titulo}</h3>
                            {col.tipo && <span className="poster-badge">{col.tipo}</span>}
                          </div>
                          <div style={{ fontSize:12, color:C.muted, margin:"4px 0 8px", display:"flex", gap:10, flexWrap:"wrap" }}>
                            {col.lugar&&<span>{col.lugar}</span>}{col.anio&&<><span>·</span><span>{col.anio}</span></>}{col.autor&&<><span>·</span><span style={{color:C.bronze}}>{col.autor}</span></>}
                            <span>·</span><span>{col.fotos_reales||col.total_fotos||0} fotos</span>
                          </div>
                          <p style={{ fontSize:13, color:C.muted, lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{col.descripcion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {view==="collection" && activeCol && (
              <ColView col={activeCol} fotos={fotos} loading={colLoading} onFotoClick={setLightbox}
                onBack={() => { setView("home"); setActiveCol(null); }}/>
            )}
          </main>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background:C.navy, color:"rgba(255,255,255,.5)", padding:"28px 24px", marginTop:48, textAlign:"center" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:8 }}>
          <div style={{ width:28, height:28, background:`linear-gradient(135deg,${C.bronze},${C.steel})`, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="photo" size={14} color="white"/></div>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:"white" }}>Fototeca Digital del ITZ</span>
        </div>
        <div style={{ fontSize:12 }}>© {new Date().getFullYear()} · Las imágenes están protegidas por sus respectivos derechos de autor · Uso institucional</div>
        <div style={{ marginTop:6, fontSize:11, color:`rgba(103,156,188,.4)` }}>Supabase · PostgreSQL · Storage CDN</div>
      </footer>

      {/* ── LIGHTBOX ── */}
      {lightbox && <Lightbox foto={lightbox} fotos={fotos} onClose={() => setLightbox(null)} onNav={handleNav}/>}

      {/* ── MODAL LOGIN ADMIN ── */}
      {showAdmin && !adminOk && (
        <div style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(10,8,35,.8)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"white", borderRadius:16, padding:36, width:360, boxShadow:"0 30px 80px rgba(28,20,109,.3)", textAlign:"center" }}>
            <div style={{ width:52, height:52, background:`linear-gradient(135deg,${C.navy},${C.mid})`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}><Icon name="shield" size={24} color="white"/></div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.navy, marginBottom:4 }}>Acceso administrativo</h3>
            <p style={{ fontSize:13, color:C.muted, marginBottom:20 }}>Conectado a Supabase · PostgreSQL</p>
            {passErr && <div style={{ background:"rgba(193,23,32,.08)", color:C.crimson, border:`1px solid rgba(193,23,32,.2)`, borderRadius:8, padding:"8px 12px", fontSize:13, marginBottom:14 }}>{passErr}</div>}
            <input type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)}
              onKeyDown={e => e.key==="Enter" && tryLogin()}
              placeholder="Contraseña de administrador"
              style={{ ...INP, textAlign:"center", marginBottom:16 }}/>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn" onClick={() => { setShowAdmin(false); setAdminPass(""); setPassErr(""); }}
                style={{ flex:1, padding:"10px", border:`1.5px solid ${C.lavender}`, borderRadius:8, fontSize:13, color:C.muted, background:"white" }}>Cancelar</button>
              <button className="btn" onClick={tryLogin}
                style={{ flex:1, padding:"10px", background:C.navy, color:"white", borderRadius:8, fontSize:13 }}>Entrar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── PANEL ADMIN ── */}
      {showAdmin && adminOk && (
        <AdminPanel onClose={() => { setShowAdmin(false); setAdminOk(false); setAdminPass(""); }} onRefresh={fetchAll}/>
      )}
    </>
  );
}