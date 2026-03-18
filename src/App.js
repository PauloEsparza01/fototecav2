import { useEffect, useRef, useState } from "react";

// ── Paletas visuales ──────────────────────────────────────────────────────────────────
const C = {
  navy:    "#1c146d",
  cream:   "#f2ebe3",
  bronze:  "#916c3f",
  lavender:"#ebeeff",
  crimson: "#c11720",
  steel:   "#679cbc",
  dark:    "#0f0d3d",
  mid:     "#2e2580",
  text:    "#1a1630",
  muted:   "#7a7590",
};

// ── Meta Data ─────────────────────────────────────────────────────────────────
const COLLECTIONS = [
  {
    id: 1, title: "Palacio de Bellas Artes", year: 2022,
    place: "Ciudad de México", author: "Ramón Villarreal",
    type: "Arquitectura", building: "Palacio de Bellas Artes",
    rights: "CC BY-NC 4.0", count: 48,
    description: "Registro fotográfico integral del icónico edificio Art Déco, capturando detalles ornamentales, fachadas y espacios interiores en distintas condiciones de luz.",
    cover: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80",
    tags: ["arquitectura", "art déco", "patrimonio", "murales"],
  },
  {
    id: 2, title: "Festival de las Almas 2023", year: 2023,
    place: "Oaxaca", author: "Lucía Mondragón",
    type: "Evento", building: "Zócalo de Oaxaca",
    rights: "Todos los derechos reservados", count: 132,
    description: "Documentación del festival anual Día de Muertos en Oaxaca. Incluye altares, procesiones nocturnas, trajes tradicionales y ofrendas familiares.",
    cover: "https://images.unsplash.com/photo-1601342630314-8427c38bf5e6?w=800&q=80",
    tags: ["día de muertos", "oaxaca", "tradición", "festival"],
  },
  {
    id: 3, title: "Zona Arqueológica de Teotihuacán", year: 2021,
    place: "Estado de México", author: "Jorge Espinoza",
    type: "Arqueología", building: "Pirámide del Sol",
    rights: "Uso educativo libre", count: 87,
    description: "Registro aéreo y terrestre de la antigua ciudad prehispánica. Capturas al amanecer y atardecer revelan la monumentalidad de las estructuras.",
    cover: "https://images.unsplash.com/photo-1554867326-f7ad96d7b63d?w=800&q=80",
    tags: ["prehispánico", "pirámides", "arqueología", "patrimonio"],
  },
  {
    id: 4, title: "Catedral Metropolitana – Restauración", year: 2020,
    place: "Ciudad de México", author: "Elena Castillo",
    type: "Arquitectura", building: "Catedral Metropolitana",
    rights: "CC BY 4.0", count: 61,
    description: "Seguimiento fotográfico del proceso de restauración de la Catedral Metropolitana, desde andamiajes hasta detalles escultóricos intervenidos.",
    cover: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&q=80",
    tags: ["catedral", "restauración", "colonial", "cdmx"],
  },
  {
    id: 5, title: "Haciendas del Bajío", year: 2019,
    place: "Guanajuato / Querétaro", author: "Marco A. Torres",
    type: "Patrimonio Rural", building: "Hacienda San Miguel",
    rights: "Uso no comercial", count: 74,
    description: "Exploración visual de haciendas históricas del Bajío mexicano: arquitectura vernácula, capillas, trojes y jardines en diverso estado de conservación.",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tags: ["hacienda", "bajío", "patrimonio rural", "colonial"],
  },
  {
    id: 6, title: "Mercados Tradicionales de CDMX", year: 2023,
    place: "Ciudad de México", author: "Sofía Reyes",
    type: "Patrimonio Inmaterial", building: "Mercado de la Merced",
    rights: "CC BY-SA 4.0", count: 95,
    description: "Crónica visual de los mercados populares de la capital: colores, texturas, personas y tradiciones que persisten en el tejido urbano contemporáneo.",
    cover: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80",
    tags: ["mercado", "cdmx", "cultura popular", "gastronomía"],
  },
];

const PHOTOS = [
  { id:101, colId:1, title:"Cúpula principal", author:"Ramón Villarreal", year:2022, place:"CDMX", date:"2022-03-15", desc:"Vista cenital de la cúpula Art Déco iluminada.", building:"Palacio de Bellas Artes", keywords:["cúpula","art déco","luz"], fileType:"TIFF/JPG", rights:"CC BY-NC 4.0", downloadable:true,
    src:"https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=90"},
  { id:102, colId:1, title:"Fachada norte al amanecer", author:"Ramón Villarreal", year:2022, place:"CDMX", date:"2022-03-16", desc:"Fachada norte con luz dorada del amanecer.", building:"Palacio de Bellas Artes", keywords:["fachada","amanecer"], fileType:"TIFF/JPG", rights:"CC BY-NC 4.0", downloadable:true,
    src:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=90"},
  { id:103, colId:1, title:"Detalle mural Rivera", author:"Ramón Villarreal", year:2022, place:"CDMX", date:"2022-04-02", desc:"Fragmento del mural de Diego Rivera.", building:"Palacio de Bellas Artes", keywords:["mural","rivera","pintura"], fileType:"TIFF/JPG", rights:"CC BY-NC 4.0", downloadable:false,
    src:"https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=1200&q=90"},
  { id:201, colId:2, title:"Altar familiar nocturno", author:"Lucía Mondragón", year:2023, place:"Oaxaca", date:"2023-11-01", desc:"Altar elaborado con cempasúchil y fotografías.", building:"Zócalo de Oaxaca", keywords:["altar","cempasúchil","noche"], fileType:"TIFF/JPG", rights:"Todos los derechos reservados", downloadable:false,
    src:"https://images.unsplash.com/photo-1601342630314-8427c38bf5e6?w=1200&q=90"},
  { id:202, colId:2, title:"Procesión de velas", author:"Lucía Mondragón", year:2023, place:"Oaxaca", date:"2023-11-02", desc:"Procesión nocturna con cirios y flores.", building:"Panteón de Oaxaca", keywords:["procesión","velas","noche"], fileType:"TIFF/JPG", rights:"Todos los derechos reservados", downloadable:false,
    src:"https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=1200&q=90"},
  { id:301, colId:3, title:"Pirámide del Sol al amanecer", author:"Jorge Espinoza", year:2021, place:"Estado de México", date:"2021-09-23", desc:"Vista este con cielo rosado al amanecer.", building:"Pirámide del Sol", keywords:["pirámide","amanecer","equinoccio"], fileType:"TIFF/JPG", rights:"Uso educativo libre", downloadable:true,
    src:"https://images.unsplash.com/photo-1554867326-f7ad96d7b63d?w=1200&q=90"},
  { id:302, colId:3, title:"Calzada de los Muertos", author:"Jorge Espinoza", year:2021, place:"Estado de México", date:"2021-09-24", desc:"Vista aérea de la calzada principal.", building:"Zona Arqueológica", keywords:["calzada","aéreo","panorámica"], fileType:"TIFF/JPG", rights:"Uso educativo libre", downloadable:true,
    src:"https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=1200&q=90"},
  { id:401, colId:4, title:"Torres campanario", author:"Elena Castillo", year:2020, place:"CDMX", date:"2020-07-10", desc:"Torres con andamiaje de restauración.", building:"Catedral Metropolitana", keywords:["torres","restauración","andamiaje"], fileType:"TIFF/JPG", rights:"CC BY 4.0", downloadable:true,
    src:"https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&q=90"},
  { id:501, colId:5, title:"Capilla de la hacienda", author:"Marco A. Torres", year:2019, place:"Guanajuato", date:"2019-06-14", desc:"Pequeña capilla del siglo XVIII.", building:"Hacienda San Miguel", keywords:["capilla","hacienda","colonial"], fileType:"TIFF/JPG", rights:"Uso no comercial", downloadable:true,
    src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90"},
  { id:601, colId:6, title:"Especias del mercado", author:"Sofía Reyes", year:2023, place:"CDMX", date:"2023-02-20", desc:"Colorida exposición de especias y chiles.", building:"Mercado de la Merced", keywords:["especias","color","mercado"], fileType:"TIFF/JPG", rights:"CC BY-SA 4.0", downloadable:true,
    src:"https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&q=90"},
];

const YEARS = [...new Set(COLLECTIONS.map(c => c.year))].sort((a,b)=>b-a);
const PLACES = [...new Set(COLLECTIONS.map(c => c.place.split("/")[0].trim()))];
const AUTHORS = [...new Set(COLLECTIONS.map(c => c.author))];
const BUILDINGS = [...new Set(COLLECTIONS.map(c => c.building))];
const TYPES = [...new Set(COLLECTIONS.map(c => c.type))];
const RIGHTS_LIST = [...new Set(COLLECTIONS.map(c => c.rights))];

const SUGGESTIONS = [
  "Palacio de Bellas Artes", "Festival de Oaxaca", "Teotihuacán",
  "Catedral Metropolitana", "Haciendas coloniales", "Mercados CDMX",
  "Diego Rivera", "Arte prehispánico", "Patrimonio arquitectónico",
  "Día de muertos", "Restauración histórica", "Arquitectura virreinal",
];

// ── Estilos Globales ─────────────────────────────────────────────────────────────
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:${C.cream};color:${C.text};overflow-x:hidden}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:${C.lavender}}
  ::-webkit-scrollbar-thumb{background:${C.navy};border-radius:3px}

  .fade-in{animation:fadeIn .5s ease forwards}
  @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

  .card-hover{transition:transform .35s cubic-bezier(.4,0,.2,1),box-shadow .35s ease}
  .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(28,20,109,.18)}

  .img-zoom{overflow:hidden}
  .img-zoom img{transition:transform .5s cubic-bezier(.4,0,.2,1)}
  .img-zoom:hover img{transform:scale(1.07)}

  .btn{cursor:pointer;border:none;outline:none;font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:.04em;transition:all .25s ease}
  .btn:active{transform:scale(.97)}

  .tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase}

  .checkbox-filter input{display:none}
  .checkbox-filter label{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:${C.text};padding:4px 0;transition:color .2s}
  .checkbox-filter label:hover{color:${C.navy}}
  .checkbox-filter label::before{content:'';width:16px;height:16px;flex-shrink:0;border:2px solid ${C.muted};border-radius:4px;transition:all .2s}
  .checkbox-filter input:checked + label::before{background:${C.navy};border-color:${C.navy};background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.5 3.5l-7 7-3-3'  stroke='white' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-size:12px;background-position:center}

  .poster-badge{background:linear-gradient(135deg,${C.navy},${C.mid});color:white;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:2px}

  @media(max-width:768px){
    .sidebar-mobile{transform:translateX(-110%);transition:transform .35s ease}
    .sidebar-mobile.open{transform:translateX(0)}
  }
`;

// ── Utility components ────────────────────────────────────────────────────────
const Icon = ({ name, size=18, color="currentColor" }) => {
  const icons = {
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    expand: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    chevLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
    chevRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    list: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    photo: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    zoomIn: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    zoomOut: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    watermark: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/><path d="M8 12l2 2 4-4"/></svg>,
    collections: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"/></svg>,
  };
  return icons[name] || null;
};

// ── Lightbox / Fullscreen Viewer ──────────────────────────────────────────────
function Lightbox({ photo, photos, onClose, onNav }) {
  const [zoom, setZoom] = useState(1);
  const [showMeta, setShowMeta] = useState(true);
  const [pos, setPos] = useState({ x:0, y:0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x:0, y:0 });
  const imgRef = useRef(null);
  const colPhotos = photos.filter(p => p.colId === photo.colId);
  const idx = colPhotos.findIndex(p => p.id === photo.id);

  useEffect(() => {
    const handler = e => {
      if(e.key==="Escape") onClose();
      if(e.key==="ArrowRight") { onNav(1); setZoom(1); setPos({x:0,y:0}); }
      if(e.key==="ArrowLeft") { onNav(-1); setZoom(1); setPos({x:0,y:0}); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [photo]);

  const handleWheel = e => {
    e.preventDefault();
    setZoom(z => Math.min(4, Math.max(1, z - e.deltaY*0.002)));
  };

  return (
    <div style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(10,8,35,.97)",display:"flex",flexDirection:"column" }}
      onContextMenu={e => e.preventDefault()}>
      {/* top bar */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:`1px solid rgba(255,255,255,.08)` }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ color:C.steel,fontSize:12,letterSpacing:".1em",textTransform:"uppercase" }}>
            {idx+1} / {colPhotos.length}
          </span>
          <span style={{ color:"white",fontFamily:"'Cormorant Garamond',serif",fontSize:18 }}>{photo.title}</span>
        </div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          <button className="btn" onClick={() => setZoom(z => Math.min(4,z+0.5))}
            style={{ background:"rgba(255,255,255,.08)",color:"white",padding:"7px",borderRadius:8 }}><Icon name="zoomIn" size={16}/></button>
          <button className="btn" onClick={() => setZoom(z => Math.max(1,z-0.5))}
            style={{ background:"rgba(255,255,255,.08)",color:"white",padding:"7px",borderRadius:8 }}><Icon name="zoomOut" size={16}/></button>
          <button className="btn" onClick={() => setShowMeta(v=>!v)}
            style={{ background:showMeta?"rgba(103,156,188,.3)":"rgba(255,255,255,.08)",color:"white",padding:"7px",borderRadius:8 }}><Icon name="info" size={16}/></button>
          {photo.downloadable && (
            <button className="btn" onClick={() => alert("Descarga con marca de agua iniciada.")}
              style={{ background:`rgba(145,108,63,.4)`,color:"white",padding:"7px 14px",borderRadius:8,fontSize:12,display:"flex",alignItems:"center",gap:6 }}>
              <Icon name="download" size={14}/> Descargar
            </button>
          )}
          <button className="btn" onClick={onClose}
            style={{ background:"rgba(193,23,32,.3)",color:"white",padding:"7px",borderRadius:8 }}><Icon name="close" size={18}/></button>
        </div>
      </div>

      {/* image area */}
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}
        onWheel={handleWheel}
        onMouseDown={e => { if(zoom>1){ setDragging(true); setDragStart({x:e.clientX-pos.x,y:e.clientY-pos.y}); }}}
        onMouseMove={e => { if(dragging) setPos({x:e.clientX-dragStart.x,y:e.clientY-dragStart.y}); }}
        onMouseUp={() => setDragging(false)}>
        <button className="btn" onClick={() => { onNav(-1); setZoom(1); setPos({x:0,y:0}); }}
          style={{ position:"absolute",left:16,zIndex:10,background:"rgba(255,255,255,.1)",color:"white",padding:"12px",borderRadius:"50%",display:"flex" }}>
          <Icon name="chevLeft" size={22}/>
        </button>
        <img ref={imgRef} src={photo.src} alt={photo.title} draggable={false}
          style={{ maxWidth:"90%",maxHeight:"80vh",objectFit:"contain",transform:`scale(${zoom}) translate(${pos.x/zoom}px,${pos.y/zoom}px)`,transition:dragging?"none":".2s",cursor:zoom>1?"grab":"zoom-in",userSelect:"none" }}/>
        <button className="btn" onClick={() => { onNav(1); setZoom(1); setPos({x:0,y:0}); }}
          style={{ position:"absolute",right:16,zIndex:10,background:"rgba(255,255,255,.1)",color:"white",padding:"12px",borderRadius:"50%",display:"flex" }}>
          <Icon name="chevRight" size={22}/>
        </button>
      </div>

      {/* meta panel */}
      {showMeta && (
        <div style={{ background:"rgba(28,20,109,.5)",backdropFilter:"blur(20px)",padding:"16px 24px",borderTop:`1px solid rgba(255,255,255,.08)`,display:"flex",gap:32,flexWrap:"wrap" }}>
          {[["Autor",photo.author],["Año",photo.year],["Lugar",photo.place],["Edificio",photo.building],["Archivo",photo.fileType],["Derechos",photo.rights]].map(([k,v])=>(
            <div key={k}>
              <div style={{ fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:C.steel,marginBottom:2 }}>{k}</div>
              <div style={{ fontSize:13,color:"white" }}>{v}</div>
            </div>
          ))}
          <div style={{ flex:1,minWidth:200 }}>
            <div style={{ fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:C.steel,marginBottom:2 }}>Palabras clave</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
              {photo.keywords.map(k=><span key={k} style={{ background:"rgba(103,156,188,.25)",color:C.lavender,padding:"2px 8px",borderRadius:10,fontSize:11 }}>{k}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Collection Card ───────────────────────────────────────────────────────────
function CollectionCard({ col, onClick }) {
  return (
    <div className="card-hover img-zoom" onClick={() => onClick(col)}
      style={{ background:"white",borderRadius:12,overflow:"hidden",cursor:"pointer",border:`1px solid rgba(28,20,109,.08)` }}>
      <div style={{ position:"relative",paddingTop:"62%",overflow:"hidden" }}>
        <img src={col.cover} alt={col.title} loading="lazy"
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover" }}/>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,8,35,.7) 0%,transparent 55%)" }}/>
        <span className="poster-badge" style={{ position:"absolute",top:12,left:12 }}>{col.type}</span>
        <span style={{ position:"absolute",bottom:12,right:12,background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",color:"white",fontSize:11,padding:"4px 10px",borderRadius:20,fontWeight:500 }}>
          <Icon name="photo" size={11} color="white"/> {col.count} fotos
        </span>
      </div>
      <div style={{ padding:"16px 18px 18px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:600,color:C.navy,marginBottom:4,lineHeight:1.25 }}>{col.title}</h3>
        <div style={{ display:"flex",gap:12,marginBottom:8,flexWrap:"wrap" }}>
          <span style={{ fontSize:12,color:C.muted }}>{col.place}</span>
          <span style={{ fontSize:12,color:C.muted }}>·</span>
          <span style={{ fontSize:12,color:C.muted }}>{col.year}</span>
          <span style={{ fontSize:12,color:C.muted }}>·</span>
          <span style={{ fontSize:12,color:C.bronze }}>{col.author}</span>
        </div>
        <p style={{ fontSize:13,color:C.muted,lineHeight:1.55,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{col.description}</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginTop:10 }}>
          {col.tags.slice(0,3).map(t=>(
            <span key={t} className="tag" style={{ background:C.lavender,color:C.navy }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Photo Grid inside a Collection ───────────────────────────────────────────
function CollectionView({ col, photos, onPhotoClick, onBack }) {
  const colPhotos = photos.filter(p => p.colId === col.id);
  return (
    <div className="fade-in">
      {/* hero */}
      <div style={{ position:"relative",height:320,borderRadius:16,overflow:"hidden",marginBottom:32 }}>
        <img src={col.cover} alt={col.title} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(28,20,109,.85),rgba(28,20,109,.4))" }}/>
        <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"32px 36px" }}>
          <button className="btn" onClick={onBack}
            style={{ color:C.steel,background:"transparent",fontSize:12,letterSpacing:".1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6,marginBottom:16,width:"fit-content" }}>
            <Icon name="chevLeft" size={14} color={C.steel}/> Volver a colecciones
          </button>
          <span className="poster-badge" style={{ marginBottom:10,width:"fit-content" }}>{col.type}</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:38,color:"white",lineHeight:1.1,marginBottom:8 }}>{col.title}</h2>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
            {[["Lugar",col.place],["Año",col.year],["Autor",col.author],["Fotos",`${col.count}`]].map(([k,v])=>(
              <span key={k} style={{ fontSize:13,color:"rgba(255,255,255,.7)" }}><span style={{ color:C.steel }}>{k}:</span> {v}</span>
            ))}
          </div>
        </div>
      </div>

      {/* metadata */}
      <div style={{ background:"white",borderRadius:12,padding:"20px 24px",marginBottom:28,border:`1px solid rgba(28,20,109,.08)`,display:"flex",flexWrap:"wrap",gap:20 }}>
        <div style={{ flex:2,minWidth:240 }}>
          <h4 style={{ fontSize:12,letterSpacing:".1em",textTransform:"uppercase",color:C.muted,marginBottom:6 }}>Descripción general</h4>
          <p style={{ fontSize:14,color:C.text,lineHeight:1.6 }}>{col.description}</p>
        </div>
        <div style={{ flex:1,minWidth:180 }}>
          <h4 style={{ fontSize:12,letterSpacing:".1em",textTransform:"uppercase",color:C.muted,marginBottom:8 }}>Derechos</h4>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <Icon name="shield" size={16} color={C.bronze}/>
            <span style={{ fontSize:13,color:C.text }}>{col.rights}</span>
          </div>
          <div style={{ marginTop:12,display:"flex",flexWrap:"wrap",gap:4 }}>
            {col.tags.map(t=><span key={t} className="tag" style={{ background:C.lavender,color:C.navy }}>{t}</span>)}
          </div>
        </div>
      </div>

      {/* photos grid */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16 }}>
        {colPhotos.map(photo => (
          <div key={photo.id} className="card-hover img-zoom" onClick={() => onPhotoClick(photo)}
            style={{ background:"white",borderRadius:10,overflow:"hidden",cursor:"pointer",border:`1px solid rgba(28,20,109,.06)` }}>
            <div style={{ position:"relative",paddingTop:"70%" }}>
              <img src={photo.src} alt={photo.title} loading="lazy"
                style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover" }}/>
              {!photo.downloadable && (
                <div style={{ position:"absolute",top:8,right:8,background:"rgba(193,23,32,.85)",borderRadius:4,padding:"2px 6px",fontSize:10,color:"white",fontWeight:600 }}>
                  🔒 Solo vista
                </div>
              )}
            </div>
            <div style={{ padding:"12px 14px 14px" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:600,color:C.navy,marginBottom:2 }}>{photo.title}</div>
              <div style={{ fontSize:11,color:C.muted }}>{photo.author} · {photo.year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Admin Panel ───────────────────────────────────────────────────────────────
function AdminPanel({ onClose }) {
  const [tab, setTab] = useState("upload");
  const [uploadForm, setUploadForm] = useState({ title:"",author:"",year:new Date().getFullYear(),place:"",date:"",desc:"",building:"",keywords:"",fileType:"TIFF",rights:"CC BY 4.0",downloadable:true });

  const tabs = [
    { id:"upload", label:"Subir Imagen", icon:"upload" },
    { id:"collections", label:"Colecciones", icon:"collections" },
    { id:"permissions", label:"Permisos", icon:"shield" },
    { id:"settings", label:"Configuración", icon:"settings" },
  ];

  return (
    <div style={{ position:"fixed",inset:0,zIndex:900,background:"rgba(10,8,35,.8)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
      <div style={{ background:"white",borderRadius:16,width:"100%",maxWidth:820,maxHeight:"90vh",display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 30px 100px rgba(28,20,109,.3)" }}>
        {/* header */}
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.mid})`,padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"white",fontWeight:600 }}>Panel Administrativo</div>
            <div style={{ fontSize:12,color:C.lavender,opacity:.7 }}>Gestión de la fototeca</div>
          </div>
          <button className="btn" onClick={onClose} style={{ background:"rgba(255,255,255,.1)",color:"white",padding:"8px",borderRadius:8 }}>
            <Icon name="close" size={18}/>
          </button>
        </div>

        {/* tabs */}
        <div style={{ display:"flex",borderBottom:`2px solid ${C.lavender}`,padding:"0 20px",background:C.lavender }}>
          {tabs.map(t => (
            <button key={t.id} className="btn" onClick={() => setTab(t.id)}
              style={{ padding:"12px 16px",fontSize:13,color:tab===t.id?C.navy:C.muted,fontWeight:tab===t.id?600:400,background:"transparent",borderBottom:tab===t.id?`2px solid ${C.navy}`:"2px solid transparent",marginBottom:-2,display:"flex",alignItems:"center",gap:7 }}>
              <Icon name={t.icon} size={14} color={tab===t.id?C.navy:C.muted}/> {t.label}
            </button>
          ))}
        </div>

        {/* content */}
        <div style={{ flex:1,overflowY:"auto",padding:28 }}>
          {tab==="upload" && (
            <div>
              <label htmlFor="file-upload" style={{ display:"block",cursor:"pointer" }}>
                <div style={{ border:`2px dashed ${C.steel}`,borderRadius:12,padding:"32px 20px",textAlign:"center",marginBottom:24,background:C.lavender,transition:"border-color .2s,background .2s" }}
                  onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor=C.navy;e.currentTarget.style.background="#dde4f5"}}
                  onDragLeave={e=>{e.currentTarget.style.borderColor=C.steel;e.currentTarget.style.background=C.lavender}}
                  onDrop={e=>{
                    e.preventDefault();
                    e.currentTarget.style.borderColor=C.steel;
                    e.currentTarget.style.background=C.lavender;
                    const files=[...e.dataTransfer.files];
                    if(files.length){
                      const names=files.map(f=>f.name).join(", ");
                      alert(`Archivo(s) seleccionado(s):\n${names}`);
                    }
                  }}>
                  <Icon name="upload" size={32} color={C.steel}/>
                  <div style={{ fontSize:16,fontFamily:"'Cormorant Garamond',serif",color:C.navy,marginTop:10,marginBottom:4 }}>Arrastra imágenes aquí</div>
                  <div style={{ fontSize:12,color:C.muted }}>o haz clic para seleccionar</div>
                  <div style={{ marginTop:10,display:"flex",justifyContent:"center",flexWrap:"wrap",gap:6 }}>
                    {["TIFF","JPG","PNG","WEBP","GIF","BMP","SVG","HEIC"].map(fmt=>(
                      <span key={fmt} style={{ background:"white",border:`1px solid rgba(28,20,109,.15)`,color:C.navy,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:4,letterSpacing:".05em" }}>{fmt}</span>
                    ))}
                  </div>
                  <div style={{ marginTop:8,fontSize:11,color:C.muted }}>Máx. 500MB por archivo</div>
                </div>
              </label>
              <input id="file-upload" type="file" accept="image/*,.tif,.tiff,.heic,.heif" multiple
                style={{ display:"none" }}
                onChange={e=>{
                  const files=[...e.target.files];
                  if(files.length){
                    const names=files.map(f=>f.name).join(", ");
                    alert(`Archivo(s) seleccionado(s):\n${names}`);
                  }
                }}/>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                {[["Título","title","text"],["Autor","author","text"],["Año","year","number"],["Lugar","place","text"],["Fecha de origen","date","date"],["Edificio / Colección","building","text"]].map(([label,field,type])=>(
                  <div key={field}>
                    <label style={{ fontSize:12,color:C.muted,letterSpacing:".05em",textTransform:"uppercase",display:"block",marginBottom:4 }}>{label}</label>
                    <input type={type} value={uploadForm[field]} onChange={e => setUploadForm(f=>({...f,[field]:e.target.value}))}
                      style={{ width:"100%",padding:"9px 12px",border:`1.5px solid ${C.lavender}`,borderRadius:8,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:C.text }}/>
                  </div>
                ))}
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={{ fontSize:12,color:C.muted,letterSpacing:".05em",textTransform:"uppercase",display:"block",marginBottom:4 }}>Descripción</label>
                  <textarea value={uploadForm.desc} onChange={e => setUploadForm(f=>({...f,desc:e.target.value}))} rows={3}
                    style={{ width:"100%",padding:"9px 12px",border:`1.5px solid ${C.lavender}`,borderRadius:8,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",resize:"vertical",color:C.text }}/>
                </div>
                <div>
                  <label style={{ fontSize:12,color:C.muted,letterSpacing:".05em",textTransform:"uppercase",display:"block",marginBottom:4 }}>Derechos de uso</label>
                  <select value={uploadForm.rights} onChange={e => setUploadForm(f=>({...f,rights:e.target.value}))}
                    style={{ width:"100%",padding:"9px 12px",border:`1.5px solid ${C.lavender}`,borderRadius:8,fontSize:13,outline:"none",background:"white",color:C.text }}>
                    {RIGHTS_LIST.map(r=><option key={r}>{r}</option>)}
                  </select>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:10,paddingTop:20 }}>
                  <input type="checkbox" id="dl" checked={uploadForm.downloadable} onChange={e=>setUploadForm(f=>({...f,downloadable:e.target.checked}))} style={{ width:16,height:16 }}/>
                  <label htmlFor="dl" style={{ fontSize:13,color:C.text,cursor:"pointer" }}>Permitir descarga pública (con marca de agua)</label>
                </div>
              </div>
              <button className="btn" style={{ marginTop:20,background:`linear-gradient(135deg,${C.navy},${C.mid})`,color:"white",padding:"11px 28px",borderRadius:10,fontSize:14,display:"flex",alignItems:"center",gap:8 }}
                onClick={() => alert("Imagen guardada con metadatos.")}>
                <Icon name="upload" size={15} color="white"/> Guardar imagen
              </button>
            </div>
          )}
          {tab==="collections" && (
            <div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:C.navy }}>Todas las colecciones</h3>
                <button className="btn" style={{ background:C.navy,color:"white",padding:"8px 16px",borderRadius:8,fontSize:13,display:"flex",alignItems:"center",gap:6 }}>
                  <Icon name="plus" size={14} color="white"/> Nueva colección
                </button>
              </div>
              {COLLECTIONS.map(col => (
                <div key={col.id} style={{ display:"flex",gap:16,alignItems:"center",padding:"12px 16px",borderRadius:10,border:`1px solid ${C.lavender}`,marginBottom:10 }}>
                  <img src={col.cover} alt="" style={{ width:60,height:45,objectFit:"cover",borderRadius:6 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600,fontSize:14,color:C.navy }}>{col.title}</div>
                    <div style={{ fontSize:12,color:C.muted }}>{col.count} fotos · {col.year} · {col.place}</div>
                  </div>
                  <div style={{ display:"flex",gap:8 }}>
                    <button className="btn" style={{ background:C.lavender,color:C.navy,padding:"6px 12px",borderRadius:6,fontSize:12 }}>Editar</button>
                    <button className="btn" style={{ background:"rgba(193,23,32,.1)",color:C.crimson,padding:"6px 12px",borderRadius:6,fontSize:12 }}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab==="permissions" && (
            <div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:C.navy,marginBottom:20 }}>Permisos de contenido</h3>
              <div style={{ background:C.lavender,borderRadius:12,padding:20,marginBottom:16 }}>
                <div style={{ fontWeight:600,fontSize:14,color:C.navy,marginBottom:12 }}>Protección global</div>
                {[["Deshabilitar clic derecho en imágenes",true],["Marca de agua automática en descargas",true],["Limitar descarga no autorizada",true],["Permitir zoom en visualizador",true]].map(([label,def])=>(
                  <label key={label} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer" }}>
                    <input type="checkbox" defaultChecked={def} style={{ width:16,height:16 }}/>
                    <span style={{ fontSize:13,color:C.text }}>{label}</span>
                  </label>
                ))}
              </div>
              <div style={{ background:"white",borderRadius:12,padding:20,border:`1px solid ${C.lavender}` }}>
                <div style={{ fontWeight:600,fontSize:14,color:C.navy,marginBottom:4 }}>Imágenes con restricción de descarga</div>
                <div style={{ fontSize:12,color:C.muted,marginBottom:12 }}>Estas imágenes solo pueden visualizarse</div>
                {PHOTOS.filter(p=>!p.downloadable).map(p=>(
                  <div key={p.id} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.lavender}` }}>
                    <span style={{ fontSize:13,color:C.text }}>{p.title}</span>
                    <span style={{ fontSize:11,color:C.crimson,background:"rgba(193,23,32,.1)",padding:"2px 8px",borderRadius:8 }}>Solo vista</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="settings" && (
            <div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:C.navy,marginBottom:20 }}>Configuración del sistema</h3>
              {[
                ["Formato de almacenamiento (servidor)","TIFF – Tagged Image File Format"],
                ["Formato de visualización web","JPG / WEBP (derivados automáticos)"],
                ["Calidad de descarga pública","Baja resolución con marca de agua"],
                ["Marca de agua","Logo institucional + leyenda de derechos"],
              ].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${C.lavender}` }}>
                  <span style={{ fontSize:13,color:C.text,fontWeight:500 }}>{k}</span>
                  <span style={{ fontSize:12,color:C.bronze }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Menu App ──────────────────────────────────────────────────────────────────
export default function Fototeca() {
  const [view, setView] = useState("home"); // home | collection
  const [activeCol, setActiveCol] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [filters, setFilters] = useState({ years:[], places:[], authors:[], buildings:[], types:[], rights:[] });
  const [showFilters, setShowFilters] = useState(true);
  const [gridMode, setGridMode] = useState("grid");
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [page, setPage] = useState("gallery"); // gallery | about

  // rotating suggestions
  useEffect(() => {
    const t = setInterval(() => setSuggestionIdx(i => (i+1)%SUGGESTIONS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const toggleFilter = (cat, val) => {
    setFilters(f => ({
      ...f,
      [cat]: f[cat].includes(val) ? f[cat].filter(x=>x!==val) : [...f[cat],val]
    }));
  };

  const filtered = COLLECTIONS.filter(col => {
    const q = search.toLowerCase();
    const matchSearch = !q || col.title.toLowerCase().includes(q) || col.place.toLowerCase().includes(q) || col.author.toLowerCase().includes(q) || col.tags.some(t=>t.includes(q));
    const matchYear  = !filters.years.length    || filters.years.includes(String(col.year));
    const matchPlace = !filters.places.length   || filters.places.some(p=>col.place.includes(p));
    const matchAuth  = !filters.authors.length  || filters.authors.includes(col.author);
    const matchBuild = !filters.buildings.length|| filters.buildings.includes(col.building);
    const matchType  = !filters.types.length    || filters.types.includes(col.type);
    const matchRight = !filters.rights.length   || filters.rights.includes(col.rights);
    return matchSearch&&matchYear&&matchPlace&&matchAuth&&matchBuild&&matchType&&matchRight;
  });

  const handlePhotoNav = dir => {
    if(!lightbox) return;
    const colPhotos = PHOTOS.filter(p=>p.colId===lightbox.colId);
    const idx = colPhotos.findIndex(p=>p.id===lightbox.id);
    const next = colPhotos[(idx+dir+colPhotos.length)%colPhotos.length];
    setLightbox(next);
  };

  const FilterGroup = ({ title, cat, options }) => (
    <div style={{ marginBottom:18 }}>
      <div style={{ fontSize:11,letterSpacing:".1em",textTransform:"uppercase",color:C.muted,marginBottom:8,fontWeight:600 }}>{title}</div>
      {options.map(opt=>(
        <div key={opt} className="checkbox-filter">
          <input type="checkbox" id={`${cat}-${opt}`} checked={filters[cat].includes(opt)} onChange={()=>toggleFilter(cat,opt)}/>
          <label htmlFor={`${cat}-${opt}`}>{opt}</label>
        </div>
      ))}
    </div>
  );

  const activeFiltersCount = Object.values(filters).flat().length;

  return (
    <>
      <style>{GS}</style>

      {/* ── Navbar ── */}
      <nav style={{ position:"sticky",top:0,zIndex:100,background:`rgba(28,20,109,.97)`,backdropFilter:"blur(16px)",borderBottom:`1px solid rgba(255,255,255,.08)` }}>
        <div style={{ maxWidth:1380,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",gap:16,height:62 }}>
          {/* Logo */}
          <div style={{ display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
            <div style={{ width:38,height:38,background:`linear-gradient(135deg,${C.bronze},${C.steel})`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Icon name="photo" size={18} color="white"/>
            </div>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:600,color:"white",lineHeight:1 }}>Fototeca</div>
              <div style={{ fontSize:9,letterSpacing:".12em",color:`rgba(235,238,255,.5)`,textTransform:"uppercase" }}>Patrimonio Digital</div>
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display:"flex",gap:4,marginLeft:16 }}>
            {[["gallery","Colecciones"],["about","Acerca de"]].map(([id,label])=>(
              <button key={id} className="btn" onClick={()=>{setPage(id);setView("home");}}
                style={{ color:page===id?"white":C.lavender,background:page===id?"rgba(255,255,255,.1)":"transparent",padding:"6px 14px",borderRadius:6,fontSize:13,opacity:page===id?1:.7 }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ flex:1 }}/>

          {/* Admin btn */}
          <button className="btn" onClick={() => setShowAdmin(true)}
            style={{ background:`rgba(145,108,63,.3)`,color:"white",padding:"7px 14px",borderRadius:8,fontSize:12,display:"flex",alignItems:"center",gap:6,border:`1px solid rgba(145,108,63,.4)` }}>
            <Icon name="settings" size={13} color="white"/> Admin
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      {view==="home" && page==="gallery" && (
        <div style={{ background:`linear-gradient(160deg,${C.navy} 0%,${C.mid} 60%,${C.steel} 100%)`,padding:"56px 24px 60px",textAlign:"center",position:"relative",overflow:"hidden" }}>
          {/* decorative circles */}
          <div style={{ position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:"rgba(103,156,188,.08)",pointerEvents:"none" }}/>
          <div style={{ position:"absolute",bottom:-60,left:-60,width:300,height:300,borderRadius:"50%",background:"rgba(145,108,63,.07)",pointerEvents:"none" }}/>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:".25em",color:C.steel,textTransform:"uppercase",marginBottom:14 }}>Repositorio fotográfico</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,58px)",color:"white",lineHeight:1.1,marginBottom:16 }}>
            Fototeca Digital<br/><em style={{ color:C.lavender,fontWeight:400 }}>del ITZ</em>
          </h1>
          <p style={{ color:"rgba(255,255,255,.6)",fontSize:15,maxWidth:520,margin:"0 auto 32px",lineHeight:1.6 }}>
            Archivo visual institucional con más de {COLLECTIONS.reduce((a,c)=>a+c.count,0)} fotografías del Instituto Tecnológico de Zacatecas
          </p>
          {/* Search */}
          <div style={{ maxWidth:560,margin:"0 auto",position:"relative" }}>
            <div style={{ display:"flex",alignItems:"center",background:"white",borderRadius:12,padding:"0 16px",boxShadow:"0 8px 40px rgba(0,0,0,.25)" }}>
              <Icon name="search" size={18} color={C.muted}/>
              <input value={search} onChange={e=>{setSearch(e.target.value);setShowSuggestions(true);}}
                onFocus={()=>setShowSuggestions(true)} onBlur={()=>setTimeout(()=>setShowSuggestions(false),200)}
                placeholder={`Buscar: ${SUGGESTIONS[suggestionIdx]}…`}
                style={{ flex:1,padding:"14px 12px",border:"none",outline:"none",fontSize:14,color:C.text,background:"transparent",fontFamily:"'DM Sans',sans-serif" }}/>
              {search && <button className="btn" onClick={()=>setSearch("")} style={{ background:"transparent",padding:4,color:C.muted }}><Icon name="x" size={14}/></button>}
            </div>
            {showSuggestions && search.length>0 && (
              <div style={{ position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"white",borderRadius:10,boxShadow:"0 12px 40px rgba(0,0,0,.2)",zIndex:200,overflow:"hidden" }}>
                {SUGGESTIONS.filter(s=>s.toLowerCase().includes(search.toLowerCase())).slice(0,5).map(s=>(
                  <div key={s} onClick={()=>{setSearch(s);setShowSuggestions(false);}}
                    style={{ padding:"10px 16px",fontSize:13,color:C.text,cursor:"pointer",display:"flex",alignItems:"center",gap:10 }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.lavender} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <Icon name="search" size={13} color={C.muted}/> {s}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* stats */}
          <div style={{ display:"flex",justifyContent:"center",gap:32,marginTop:32,flexWrap:"wrap" }}>
            {[["6","Colecciones"],["497","Fotografías"],["5","Autores"],["8","Edificios"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:"white",fontWeight:600 }}>{n}</div>
                <div style={{ fontSize:11,color:"rgba(235,238,255,.5)",letterSpacing:".1em",textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── About page ── */}
      {page==="about" && (
        <div style={{ maxWidth:780,margin:"60px auto",padding:"0 24px" }} className="fade-in">
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:38,color:C.navy,marginBottom:20 }}>Acerca de la Fototeca</h2>
          <div style={{ width:60,height:3,background:C.bronze,marginBottom:28 }}/>
          <p style={{ fontSize:15,lineHeight:1.8,color:C.text,marginBottom:20 }}>La <strong>Fototeca Digital del Patrimonio</strong> es un repositorio institucional de acceso público que preserva, organiza y difunde el acervo fotográfico histórico y contemporáneo del patrimonio arquitectónico, arqueológico y cultural de México.</p>
          <p style={{ fontSize:15,lineHeight:1.8,color:C.text,marginBottom:20 }}>Las imágenes se almacenan en formato <strong>TIFF de alta resolución</strong> para garantizar la fidelidad del archivo original, y se distribuyen en versiones optimizadas para web (JPG / WEBP) con metadatos integrados conforme a estándares internacionales de catalogación (Dublin Core, IPTC).</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16,marginTop:32 }}>
            {[["Preservación","Archivos TIFF sin pérdida de calidad"],["Accesibilidad","Plataforma optimizada para todos los dispositivos"],["Metadatos","Catalogación completa por imagen y colección"],["Derechos","Gestión de licencias y marca de agua automática"]].map(([t,d])=>(
              <div key={t} style={{ background:"white",borderRadius:12,padding:20,border:`1px solid rgba(28,20,109,.08)` }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:C.navy,marginBottom:6,fontWeight:600 }}>{t}</div>
                <div style={{ fontSize:13,color:C.muted,lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Gallery layout ── */}
      {page==="gallery" && (
        <div style={{ maxWidth:1380,margin:"0 auto",padding:"28px 16px",display:"flex",gap:24 }}>

          {/* Sidebar */}
          <aside style={{ width:230,flexShrink:0,position:"sticky",top:82,alignSelf:"flex-start",maxHeight:"calc(100vh - 100px)",overflowY:"auto" }}>
            <div style={{ background:"white",borderRadius:12,padding:20,border:`1px solid rgba(28,20,109,.08)` }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                <span style={{ fontSize:13,fontWeight:600,color:C.navy,display:"flex",alignItems:"center",gap:7 }}>
                  <Icon name="filter" size={13} color={C.navy}/> Filtros
                  {activeFiltersCount>0 && <span style={{ background:C.navy,color:"white",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10 }}>{activeFiltersCount}</span>}
                </span>
                {activeFiltersCount>0 && (
                  <button className="btn" onClick={()=>setFilters({years:[],places:[],authors:[],buildings:[],types:[],rights:[]})}
                    style={{ fontSize:11,color:C.crimson,background:"transparent" }}>Limpiar</button>
                )}
              </div>
              <FilterGroup title="Año" cat="years" options={YEARS.map(String)}/>
              <FilterGroup title="Lugar" cat="places" options={PLACES}/>
              <FilterGroup title="Autor" cat="authors" options={AUTHORS}/>
              <FilterGroup title="Edificio" cat="buildings" options={BUILDINGS}/>
              <FilterGroup title="Tipo" cat="types" options={TYPES}/>
              <FilterGroup title="Derechos" cat="rights" options={RIGHTS_LIST}/>
            </div>
          </aside>

          {/* Main */}
          <main style={{ flex:1,minWidth:0 }}>
            {view==="home" && (
              <>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10 }}>
                  <div>
                    <span style={{ fontSize:13,color:C.muted }}>{filtered.length} colección{filtered.length!==1?"es":""} encontrada{filtered.length!==1?"s":""}</span>
                    {activeFiltersCount>0 && <span style={{ marginLeft:8,fontSize:12,color:C.bronze }}>({activeFiltersCount} filtro{activeFiltersCount!==1?"s":""} activo{activeFiltersCount!==1?"s":""})</span>}
                  </div>
                  <div style={{ display:"flex",gap:6 }}>
                    <button className="btn" onClick={()=>setGridMode("grid")} style={{ background:gridMode==="grid"?C.navy:C.lavender,color:gridMode==="grid"?"white":C.navy,padding:"7px",borderRadius:7 }}><Icon name="grid" size={15} color={gridMode==="grid"?"white":C.navy}/></button>
                    <button className="btn" onClick={()=>setGridMode("list")} style={{ background:gridMode==="list"?C.navy:C.lavender,color:gridMode==="list"?"white":C.navy,padding:"7px",borderRadius:7 }}><Icon name="list" size={15} color={gridMode==="list"?"white":C.navy}/></button>
                  </div>
                </div>

                {filtered.length===0 ? (
                  <div style={{ textAlign:"center",padding:"80px 20px",color:C.muted }}>
                    <Icon name="photo" size={48} color={C.lavender}/>
                    <div style={{ fontSize:20,fontFamily:"'Cormorant Garamond',serif",color:C.navy,marginTop:16 }}>Sin resultados</div>
                    <div style={{ fontSize:14,marginTop:6 }}>Intenta modificar los filtros o el término de búsqueda</div>
                  </div>
                ) : gridMode==="grid" ? (
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20 }} className="fade-in">
                    {filtered.map(col=><CollectionCard key={col.id} col={col} onClick={c=>{setActiveCol(c);setView("collection");}}/>)}
                  </div>
                ) : (
                  <div style={{ display:"flex",flexDirection:"column",gap:12 }} className="fade-in">
                    {filtered.map(col=>(
                      <div key={col.id} className="card-hover" onClick={()=>{setActiveCol(col);setView("collection");}}
                        style={{ background:"white",borderRadius:12,overflow:"hidden",cursor:"pointer",display:"flex",border:`1px solid rgba(28,20,109,.08)` }}>
                        <div className="img-zoom" style={{ width:140,flexShrink:0 }}>
                          <img src={col.cover} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                        </div>
                        <div style={{ padding:"14px 18px",flex:1 }}>
                          <div style={{ display:"flex",gap:8,alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap" }}>
                            <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:C.navy,fontWeight:600 }}>{col.title}</h3>
                            <span className="poster-badge">{col.type}</span>
                          </div>
                          <div style={{ fontSize:12,color:C.muted,margin:"4px 0 8px",display:"flex",gap:10,flexWrap:"wrap" }}>
                            <span>{col.place}</span><span>·</span><span>{col.year}</span><span>·</span><span style={{ color:C.bronze }}>{col.author}</span><span>·</span><span>{col.count} fotos</span>
                          </div>
                          <p style={{ fontSize:13,color:C.muted,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{col.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {view==="collection" && activeCol && (
              <CollectionView col={activeCol} photos={PHOTOS} onPhotoClick={setLightbox} onBack={()=>{setView("home");setActiveCol(null);}}/>
            )}
          </main>
        </div>
      )}

      {/* ── Footer ── */}
      <footer style={{ background:C.navy,color:"rgba(255,255,255,.5)",padding:"28px 24px",marginTop:48,textAlign:"center" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:8 }}>
          <div style={{ width:28,height:28,background:`linear-gradient(135deg,${C.bronze},${C.steel})`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Icon name="photo" size={14} color="white"/>
          </div>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"white" }}>Fototeca Digital del Patrimonio</span>
        </div>
        <div style={{ fontSize:12 }}>© {new Date().getFullYear()} · Las imágenes están protegidas por sus respectivos derechos de autor · Uso institucional</div>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && <Lightbox photo={lightbox} photos={PHOTOS} onClose={()=>setLightbox(null)} onNav={handlePhotoNav}/>}

      {/* ── Admin auth/panel ── */}
      {showAdmin && !adminAuth && (
        <div style={{ position:"fixed",inset:0,zIndex:900,background:"rgba(10,8,35,.8)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:"white",borderRadius:16,padding:36,width:340,boxShadow:"0 30px 80px rgba(28,20,109,.3)",textAlign:"center" }}>
            <div style={{ width:52,height:52,background:`linear-gradient(135deg,${C.navy},${C.mid})`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px" }}>
              <Icon name="shield" size={24} color="white"/>
            </div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:C.navy,marginBottom:4 }}>Acceso administrativo</h3>
            <p style={{ fontSize:13,color:C.muted,marginBottom:20 }}>Ingresa la contraseña para continuar</p>
            <input type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&adminPass==="admin123") setAdminAuth(true);}}
              placeholder="Contraseña (admin123)"
              style={{ width:"100%",padding:"10px 14px",border:`1.5px solid ${C.lavender}`,borderRadius:8,fontSize:14,outline:"none",textAlign:"center",fontFamily:"'DM Sans',sans-serif",marginBottom:12 }}/>
            <div style={{ display:"flex",gap:8 }}>
              <button className="btn" onClick={()=>{setShowAdmin(false);setAdminPass("");}}
                style={{ flex:1,padding:"10px",border:`1.5px solid ${C.lavender}`,borderRadius:8,fontSize:13,color:C.muted,background:"white" }}>Cancelar</button>
              <button className="btn" onClick={()=>{if(adminPass==="admin123") setAdminAuth(true); else alert("Contraseña incorrecta");}}
                style={{ flex:1,padding:"10px",background:C.navy,color:"white",borderRadius:8,fontSize:13 }}>Entrar</button>
            </div>
          </div>
        </div>
      )}
      {showAdmin && adminAuth && <AdminPanel onClose={()=>{setShowAdmin(false);setAdminAuth(false);setAdminPass("");}}/>}
    </>
  );
}