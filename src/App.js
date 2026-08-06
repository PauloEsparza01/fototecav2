/* eslint-disable react-hooks/exhaustive-deps */
import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";
import GobHeader from "./components/GobHeader";
import GobFooter from "./components/GobFooter";

const SUPABASE_URL = "https://iqyytvzlsquwkeimtein.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeXl0dnpsc3F1d2tlaW10ZWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDYyODEsImV4cCI6MjA5MDEyMjI4MX0.l-VPzdyKsYKVHrGxYG8_JwE97-ieAdIBLyh4jcBWj30";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Logo ITZ embebido (no requiere archivo externo)
const LOGO_ITZ = "data:image/png;base64,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";

const C = {
  navy:"#1c146d", cream:"#f2ebe3", bronze:"#916c3f",
  lavender:"#ebeeff", crimson:"#c11720", steel:"#679cbc",
  mid:"#2e2580", text:"#1a1630", muted:"#7a7590",
};

// Fotos del carrusel — pon tus imágenes en public/carrusel/
const CARRUSEL = [
  { src:"/carrusel/foto1.jpg", titulo:"50 Aniversario ITZ", sub:"Instituto Tecnológico de Zacatecas 1976–2026" },
  { src:"/carrusel/foto2.jpg", titulo:"Campus ITZ",         sub:"Patrimonio educativo de Zacatecas" },
  { src:"/carrusel/foto3.jpg", titulo:"Comunidad ITZ",      sub:"Formando profesionistas desde 1976" },
  { src:"/carrusel/foto4.jpg", titulo:"Historia y Futuro",  sub:"Tecnología · Innovación · Tradición" },
];

const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:#f2ebe3;color:#1a1630;overflow-x:hidden}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#ebeeff}::-webkit-scrollbar-thumb{background:#1c146d;border-radius:3px}
  .fade-in{animation:fadeIn .5s ease forwards}
  @keyframes fadeIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .card-hover{transition:transform .35s cubic-bezier(.4,0,.2,1),box-shadow .35s ease}
  .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(28,20,109,.18)}
  .img-zoom{overflow:hidden}.img-zoom img{transition:transform .5s cubic-bezier(.4,0,.2,1)}.img-zoom:hover img{transform:scale(1.07)}
  .btn{cursor:pointer;border:none;outline:none;font-family:'DM Sans',sans-serif;font-weight:500;transition:all .25s ease}.btn:active{transform:scale(.97)}
  .tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase}
  .cb input{display:none}
  .cb label{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#1a1630;padding:4px 0}
  .cb label::before{content:'';width:16px;height:16px;flex-shrink:0;border:2px solid #7a7590;border-radius:4px;transition:all .2s}
  .cb input:checked+label::before{background:#1c146d;border-color:#1c146d;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.5 3.5l-7 7-3-3' stroke='white' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-size:12px;background-position:center}
  .poster-badge{background:linear-gradient(135deg,#1c146d,#2e2580);color:white;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:2px}
  .drag-over{border-color:#1c146d!important;background:rgba(28,20,109,.06)!important}
  input,select,textarea{font-family:'DM Sans',sans-serif}
`;

const INP = {
  width:"100%",padding:"9px 12px",
  border:"1.5px solid #ebeeff",borderRadius:8,
  fontSize:13,outline:"none",color:"#1a1630",background:"white",
};

const storageUrl = path => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return SUPABASE_URL + "/storage/v1/object/public/imagenes/" + path;
};

const LogoImg = ({ height, style }) => (
  <img 
    src={LOGO_ITZ} 
    alt="Logo ITZ" 
    style={{ 
      height: height || 80, 
      display: "block", 
      mixBlendMode: "multiply", 
      ...style 
    }} 
  />
);

// ── ÍCONOS ────────────────────────────────────────────────────
const Icon = ({ name, size=18, color="currentColor" }) => {
  const I = {
    search:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    x:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    dl:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    chevL:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
    chevR:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
    grid:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    list:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    filter:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    photo:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    info:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    shield:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    upload:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    settings:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    plus:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    zoomIn:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    zoomOut: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    close:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    save:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
    trash:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
    edit:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    lock:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    unlock:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
    stats:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    cols:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"/></svg>,
    refresh: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    key:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  };
  return I[name] || null;
};

const Spinner = ({ small }) => (
  <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:small?0:"60px"}}>
    <div style={{width:small?18:34,height:small?18:34,border:"3px solid #ebeeff",borderTopColor:"#1c146d",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
  </div>
);

const Toast = ({ msg, type="ok", onClose }) => (
  <div style={{position:"fixed",bottom:24,right:24,zIndex:3000,background:type==="err"?"#c11720":"#1c146d",color:"white",padding:"12px 20px",borderRadius:10,boxShadow:"0 8px 30px rgba(0,0,0,.3)",display:"flex",alignItems:"center",gap:10,fontSize:14,maxWidth:380,animation:"fadeIn .3s ease"}}>
    {type==="err"?"❌":"✅"} {msg}
    <button className="btn" onClick={onClose} style={{background:"transparent",color:"rgba(255,255,255,.7)",marginLeft:"auto",padding:2}}><Icon name="close" size={14}/></button>
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label style={{fontSize:12,color:"#7a7590",letterSpacing:".05em",textTransform:"uppercase",display:"block",marginBottom:4}}>{label}</label>
    {children}
  </div>
);

// ── CARRUSEL ─────────────────────────────────────────────────
function Carrusel() {
  const [idx, setIdx] = useState(0);
  const [startX, setStartX] = useState(0);
  const timer = useRef(null);
  const next = useCallback(() => setIdx(i => (i+1) % CARRUSEL.length), []);
  const prev = () => setIdx(i => (i-1+CARRUSEL.length) % CARRUSEL.length);
  const reset = () => { clearInterval(timer.current); timer.current = setInterval(next, 5500); };
  useEffect(() => { timer.current = setInterval(next, 5500); return () => clearInterval(timer.current); }, [next]);
  const slide = CARRUSEL[idx];
  return (
    <div style={{position:"relative",height:"clamp(180px,25vw,360px)",overflow:"hidden",background:"#1c146d"}}
      onTouchStart={e=>setStartX(e.touches[0].clientX)}
      onTouchEnd={e=>{const d=startX-e.changedTouches[0].clientX;if(Math.abs(d)>50){d>0?next():prev();reset();}}}>
      <div key={idx} style={{position:"absolute",inset:0,animation:"fadeIn .7s ease"}}>
        <img src={slide.src} alt={slide.titulo} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(28,20,109,.8),rgba(46,37,128,.6),rgba(103,156,188,.4))",zIndex:0}}/>
      </div>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,8,35,.75) 0%,rgba(10,8,35,.2) 60%,transparent 100%)",zIndex:1}}/>
      <div style={{position:"absolute",bottom:38,left:0,right:0,textAlign:"center",padding:"0 20px",zIndex:2}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(16px,2.2vw,30px)",color:"white",fontWeight:700,textShadow:"0 2px 12px rgba(0,0,0,.6)"}}>{slide.titulo}</div>
        <div style={{fontSize:"clamp(11px,1vw,13px)",color:"rgba(255,255,255,.75)",marginTop:5,letterSpacing:".05em"}}>{slide.sub}</div>
      </div>
      {[["chevL",prev,"left"],["chevR",next,"right"]].map(([icon,fn,side])=>(
        <button key={icon} className="btn" onClick={()=>{fn();reset();}}
          style={{position:"absolute",[side]:14,top:"50%",transform:"translateY(-50%)",zIndex:3,background:"rgba(255,255,255,.18)",backdropFilter:"blur(8px)",color:"white",padding:"9px",borderRadius:"50%",display:"flex"}}>
          <Icon name={icon} size={19}/>
        </button>
      ))}
      <div style={{position:"absolute",bottom:12,left:0,right:0,display:"flex",justifyContent:"center",gap:6,zIndex:3}}>
        {CARRUSEL.map((_,i)=>(
          <button key={i} className="btn" onClick={()=>{setIdx(i);reset();}}
            style={{width:i===idx?20:6,height:6,borderRadius:3,background:i===idx?"white":"rgba(255,255,255,.38)",padding:0,transition:"all .3s"}}/>
        ))}
      </div>
    </div>
  );
}

// ── ZONA DRAG & DROP ──────────────────────────────────────────
function ZonaCarga({ archivo, onChange, label="Arrastra imagen aquí", accept="image/*,.tif,.tiff,.heic,.heif", id="fz" }) {
  const [over, setOver] = useState(false);
  return (
    <label htmlFor={id} style={{display:"block",cursor:"pointer",marginBottom:18}}
      onDragOver={e=>{e.preventDefault();setOver(true);}}
      onDragLeave={()=>setOver(false)}
      onDrop={e=>{e.preventDefault();setOver(false);const f=e.dataTransfer.files[0];if(f)onChange(f);}}>
      <div className={over?"drag-over":""} style={{border:"2px dashed "+(over||archivo?"#1c146d":"#679cbc"),borderRadius:12,padding:"22px 16px",textAlign:"center",background:archivo?"rgba(28,20,109,.06)":"#ebeeff",transition:"all .2s"}}>
        <Icon name="upload" size={26} color={over||archivo?"#1c146d":"#679cbc"}/>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"#1c146d",marginTop:7,marginBottom:2}}>{archivo?"✅ "+archivo.name:label}</div>
        {!archivo&&<div style={{fontSize:11,color:"#7a7590"}}>o haz clic · TIFF, JPG, PNG, WEBP, HEIC, BMP, SVG</div>}
      </div>
      <input id={id} type="file" accept={accept} style={{display:"none"}} onChange={e=>onChange(e.target.files[0]||null)}/>
    </label>
  );
}

// ── LIGHTBOX ──────────────────────────────────────────────────
function Lightbox({ foto, fotos, onClose, onNav }) {
  const [zoom,setZoom]=useState(1);
  const [meta,setMeta]=useState(true);
  const [pos,setPos]=useState({x:0,y:0});
  const [drag,setDrag]=useState(false);
  const [ds,setDs]=useState({x:0,y:0});
  const [descargando,setDescargando]=useState(false);
  const colFotos=fotos.filter(f=>f.coleccion_id===foto.coleccion_id);
  const idx=colFotos.findIndex(f=>f.id===foto.id);
  const src=storageUrl(foto.url_web||foto.url_original);
  useEffect(()=>{
    const h=e=>{
      if(e.key==="Escape")onClose();
      if(e.key==="ArrowRight"){onNav(1);setZoom(1);setPos({x:0,y:0});}
      if(e.key==="ArrowLeft"){onNav(-1);setZoom(1);setPos({x:0,y:0});}
    };
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[foto]);
  const descargarConMarca=async()=>{
    if(!src)return;
    setDescargando(true);
    try{
      const res=await fetch(src);
      const blob=await res.blob();
      const imgUrl=URL.createObjectURL(blob);
      const img=new Image();
      img.crossOrigin="anonymous";
      img.onload=()=>{
        const canvas=document.createElement("canvas");
        canvas.width=img.width;canvas.height=img.height;
        const ctx=canvas.getContext("2d");
        ctx.drawImage(img,0,0);
        ctx.save();ctx.globalAlpha=0.28;ctx.fillStyle="white";
        const fs=Math.max(img.width*.035,18);ctx.font="bold "+fs+"px Arial";ctx.textAlign="center";
        for(let i=-3;i<=Math.ceil(img.width/260)+3;i++){
          for(let j=-3;j<=Math.ceil(img.height/170)+3;j++){
            ctx.save();ctx.translate(i*260,j*170);ctx.rotate(-Math.PI/6);
            ctx.fillText("© Fototeca ITZ",0,0);ctx.restore();
          }
        }
        const bh=Math.max(img.height*.055,30);
        ctx.globalAlpha=0.82;ctx.fillStyle="#1c146d";
        ctx.fillRect(0,img.height-bh,img.width,bh);
        ctx.globalAlpha=1;ctx.fillStyle="white";
        const fs2=Math.max(fs*.44,11);ctx.font=fs2+"px Arial";ctx.textAlign="left";
        ctx.fillText("© Fototeca ITZ · "+(foto.derechos||"Todos los derechos reservados")+" · "+(foto.autor||"")+" "+(foto.anio||""),14,img.height-bh*.2);
        ctx.textAlign="right";ctx.fillText("Instituto Tecnológico de Zacatecas",img.width-14,img.height-bh*.2);
        ctx.restore();
        canvas.toBlob(b=>{
          const url=URL.createObjectURL(b);const a=document.createElement("a");
          a.href=url;a.download=(foto.titulo||"imagen")+"_ITZ.jpg";a.click();
          URL.revokeObjectURL(url);URL.revokeObjectURL(imgUrl);setDescargando(false);
        },"image/jpeg",0.82);
      };
      img.onerror=()=>setDescargando(false);img.src=imgUrl;
    }catch(e){alert("Error: "+e.message);setDescargando(false);}
  };
  return(
    <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(10,8,35,.97)",display:"flex",flexDirection:"column"}} onContextMenu={e=>e.preventDefault()}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 20px",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{color:"#679cbc",fontSize:11,letterSpacing:".1em",textTransform:"uppercase"}}>{idx+1}/{colFotos.length}</span>
          <span style={{color:"white",fontFamily:"'Cormorant Garamond',serif",fontSize:17}}>{foto.titulo}</span>
        </div>
        <div style={{display:"flex",gap:7}}>
          {[["zoomIn",()=>setZoom(z=>Math.min(4,z+.5))],["zoomOut",()=>setZoom(z=>Math.max(1,z-.5))],["info",()=>setMeta(v=>!v)]].map(([n,fn])=>(
            <button key={n} className="btn" onClick={fn} style={{background:n==="info"&&meta?"rgba(103,156,188,.3)":"rgba(255,255,255,.08)",color:"white",padding:"7px",borderRadius:8}}><Icon name={n} size={15}/></button>
          ))}
          {foto.descargable&&(
            <button className="btn" onClick={descargarConMarca} disabled={descargando}
              style={{background:"rgba(145,108,63,.4)",color:"white",padding:"7px 14px",borderRadius:8,fontSize:12,display:"flex",alignItems:"center",gap:6,fontWeight:500,opacity:descargando?.6:1}}>
              {descargando?<Spinner small/>:<Icon name="dl" size={14}/>} {descargando?"Generando…":"Descargar"}
            </button>
          )}
          <button className="btn" onClick={onClose} style={{background:"rgba(193,23,32,.3)",color:"white",padding:"7px",borderRadius:8}}><Icon name="close" size={18}/></button>
        </div>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}
        onWheel={e=>{e.preventDefault();setZoom(z=>Math.min(4,Math.max(1,z-e.deltaY*.002)));}}
        onMouseDown={e=>{if(zoom>1){setDrag(true);setDs({x:e.clientX-pos.x,y:e.clientY-pos.y});}}}
        onMouseMove={e=>{if(drag)setPos({x:e.clientX-ds.x,y:e.clientY-ds.y});}}
        onMouseUp={()=>setDrag(false)}>
        <button className="btn" onClick={()=>{onNav(-1);setZoom(1);setPos({x:0,y:0});}} style={{position:"absolute",left:14,zIndex:10,background:"rgba(255,255,255,.1)",color:"white",padding:"11px",borderRadius:"50%",display:"flex"}}><Icon name="chevL" size={22}/></button>
        {src?<img src={src} alt={foto.titulo} draggable={false} style={{maxWidth:"90%",maxHeight:"80vh",objectFit:"contain",transform:"scale("+zoom+") translate("+(pos.x/zoom)+"px,"+(pos.y/zoom)+"px)",transition:drag?"none":".2s",cursor:zoom>1?"grab":"zoom-in",userSelect:"none"}}/>
            :<div style={{color:"rgba(255,255,255,.3)",textAlign:"center"}}><Icon name="photo" size={64} color="rgba(255,255,255,.1)"/><div style={{marginTop:12,fontSize:13}}>Sin imagen</div></div>}
        <button className="btn" onClick={()=>{onNav(1);setZoom(1);setPos({x:0,y:0});}} style={{position:"absolute",right:14,zIndex:10,background:"rgba(255,255,255,.1)",color:"white",padding:"11px",borderRadius:"50%",display:"flex"}}><Icon name="chevR" size={22}/></button>
      </div>
      {meta&&(
        <div style={{background:"rgba(28,20,109,.55)",backdropFilter:"blur(20px)",padding:"14px 22px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",gap:24,flexWrap:"wrap"}}>
          {[["Autor",foto.autor],["Año",foto.anio],["Lugar",foto.lugar],["Edificio",foto.edificio],["Archivo",foto.tipo_archivo],["Derechos",foto.derechos]].map(([k,v])=>(
            <div key={k}><div style={{fontSize:9,letterSpacing:".1em",textTransform:"uppercase",color:"#679cbc",marginBottom:2}}>{k}</div><div style={{fontSize:13,color:"white"}}>{v||"—"}</div></div>
          ))}
          {foto.descripcion&&(<div style={{flex:1,minWidth:200}}><div style={{fontSize:9,letterSpacing:".1em",textTransform:"uppercase",color:"#679cbc",marginBottom:2}}>Descripción</div><div style={{fontSize:13,color:"rgba(255,255,255,.8)"}}>{foto.descripcion}</div></div>)}
          {foto.keywords&&(<div style={{flex:1,minWidth:200}}><div style={{fontSize:9,letterSpacing:".1em",textTransform:"uppercase",color:"#679cbc",marginBottom:4}}>Palabras clave</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{String(foto.keywords).split(",").map(k=>(<span key={k} style={{background:"rgba(103,156,188,.25)",color:"#ebeeff",padding:"2px 8px",borderRadius:10,fontSize:11}}>{k.trim()}</span>))}</div></div>)}
        </div>
      )}
    </div>
  );
}

// ── TARJETA COLECCIÓN ─────────────────────────────────────────
function ColCard({ col, onClick }) {
  const cover=storageUrl(col.portada_url);
  return(
    <div className="card-hover img-zoom" onClick={()=>onClick(col)} style={{background:"white",borderRadius:12,overflow:"hidden",cursor:"pointer",border:"1px solid rgba(28,20,109,.08)"}}>
      <div style={{position:"relative",paddingTop:"62%",overflow:"hidden"}}>
        {cover?<img src={cover} alt={col.titulo} loading="lazy" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
              :<div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#1c146d,#679cbc)",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="photo" size={40} color="rgba(255,255,255,.3)"/></div>}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,8,35,.7) 0%,transparent 55%)"}}/>
        {col.tipo&&<span className="poster-badge" style={{position:"absolute",top:12,left:12}}>{col.tipo}</span>}
        <span style={{position:"absolute",bottom:12,right:12,background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",color:"white",fontSize:11,padding:"4px 10px",borderRadius:20,fontWeight:500}}>
          <Icon name="photo" size={11} color="white"/> {col.fotos_reales||col.total_fotos||0} fotos
        </span>
      </div>
      <div style={{padding:"16px 18px 18px"}}>
        <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:600,color:"#1c146d",marginBottom:4,lineHeight:1.25}}>{col.titulo}</h3>
        <div style={{display:"flex",gap:10,marginBottom:8,flexWrap:"wrap"}}>
          {col.lugar&&<span style={{fontSize:12,color:"#7a7590"}}>{col.lugar}</span>}
          {col.anio&&<><span style={{fontSize:12,color:"#7a7590"}}>·</span><span style={{fontSize:12,color:"#7a7590"}}>{col.anio}</span></>}
          {col.autor&&<><span style={{fontSize:12,color:"#7a7590"}}>·</span><span style={{fontSize:12,color:"#916c3f"}}>{col.autor}</span></>}
        </div>
        <p style={{fontSize:13,color:"#7a7590",lineHeight:1.55,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{col.descripcion}</p>
        <div style={{display:"flex",gap:4,marginTop:10,flexWrap:"wrap"}}>
          {col.tipo&&<span className="tag" style={{background:"#ebeeff",color:"#1c146d"}}>{col.tipo}</span>}
          {col.derechos&&<span className="tag" style={{background:"rgba(145,108,63,.1)",color:"#916c3f"}}>{col.derechos}</span>}
        </div>
      </div>
    </div>
  );
}

// ── VISTA DE COLECCIÓN ────────────────────────────────────────
function ColView({ col, fotos, loading, onFotoClick, onBack }) {
  const colFotos=fotos.filter(f=>f.coleccion_id===col.id);
  const cover=storageUrl(col.portada_url);
  return(
    <div className="fade-in">
      <div style={{position:"relative",height:300,borderRadius:16,overflow:"hidden",marginBottom:28}}>
        {cover?<img src={cover} alt={col.titulo} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              :<div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#1c146d,#679cbc)"}}/>}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(28,20,109,.85),rgba(28,20,109,.4))"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"28px 32px"}}>
          <button className="btn" onClick={onBack} style={{color:"#679cbc",background:"transparent",fontSize:11,letterSpacing:".1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6,marginBottom:14,width:"fit-content"}}>
            <Icon name="chevL" size={13} color="#679cbc"/> Volver
          </button>
          {col.tipo&&<span className="poster-badge" style={{marginBottom:10,width:"fit-content"}}>{col.tipo}</span>}
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,4vw,36px)",color:"white",lineHeight:1.1,marginBottom:8}}>{col.titulo}</h2>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            {[["Lugar",col.lugar],["Año",col.anio],["Autor",col.autor],["Fotos",col.fotos_reales||colFotos.length]].map(([k,v])=>v&&(
              <span key={k} style={{fontSize:13,color:"rgba(255,255,255,.7)"}}><span style={{color:"#679cbc"}}>{k}:</span> {v}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:"white",borderRadius:12,padding:"18px 22px",marginBottom:24,border:"1px solid rgba(28,20,109,.08)",display:"flex",flexWrap:"wrap",gap:18}}>
        <div style={{flex:2,minWidth:220}}>
          <h4 style={{fontSize:11,letterSpacing:".1em",textTransform:"uppercase",color:"#7a7590",marginBottom:5}}>Descripción</h4>
          <p style={{fontSize:14,color:"#1a1630",lineHeight:1.6}}>{col.descripcion||"Sin descripción."}</p>
        </div>
        {col.derechos&&(<div style={{flex:1,minWidth:150}}><h4 style={{fontSize:11,letterSpacing:".1em",textTransform:"uppercase",color:"#7a7590",marginBottom:7}}>Derechos</h4><div style={{display:"flex",alignItems:"center",gap:7}}><Icon name="shield" size={15} color="#916c3f"/><span style={{fontSize:13,color:"#1a1630"}}>{col.derechos}</span></div></div>)}
      </div>
      {loading?<Spinner/>:colFotos.length===0?(
        <div style={{textAlign:"center",padding:"50px 20px",color:"#7a7590"}}><Icon name="photo" size={40} color="#ebeeff"/><div style={{marginTop:12,fontSize:16,fontFamily:"'Cormorant Garamond',serif",color:"#1c146d"}}>Esta colección aún no tiene fotografías</div></div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
          {colFotos.map(foto=>{
            const s=storageUrl(foto.url_web||foto.url_original);
            return(
              <div key={foto.id} className="card-hover img-zoom" onClick={()=>onFotoClick(foto)} style={{background:"white",borderRadius:10,overflow:"hidden",cursor:"pointer",border:"1px solid rgba(28,20,109,.06)"}}>
                <div style={{position:"relative",paddingTop:"70%"}}>
                  {s?<img src={s} alt={foto.titulo} loading="lazy" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
                    :<div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#ebeeff,#679cbc)",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="photo" size={28} color="#1c146d"/></div>}
                  {!foto.descargable&&<div style={{position:"absolute",top:7,right:7,background:"rgba(193,23,32,.85)",borderRadius:4,padding:"2px 6px",fontSize:10,color:"white",fontWeight:600}}>🔒</div>}
                </div>
                <div style={{padding:"11px 13px 13px"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:"#1c146d",marginBottom:2}}>{foto.titulo}</div>
                  <div style={{fontSize:11,color:"#7a7590"}}>{foto.autor} · {foto.anio}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── PANEL ADMIN ───────────────────────────────────────────────
function AdminPanel({ onClose, onRefresh }) {
  const [tab,setTab]=useState("stats");
  const [saving,setSaving]=useState(false);
  const [toast,setToast]=useState(null);
  const [cols,setCols]=useState([]);
  const [fotos,setFotos]=useState([]);
  const [stats,setStats]=useState(null);
  const [editCol,setEditCol]=useState(null);
  const [editFoto,setEditFoto]=useState(null);
  const [portadaFile,setPortadaFile]=useState(null);
  const [imgFile,setImgFile]=useState(null);
  const [newCol,setNewCol]=useState({titulo:"",descripcion:"",lugar:"",anio:new Date().getFullYear(),autor:"",edificio:"",tipo:"Evento",derechos:"CC BY 4.0"});
  const [upForm,setUpForm]=useState({coleccion_id:"",titulo:"",autor:"",anio:new Date().getFullYear(),lugar:"",fecha_origen:"",descripcion:"",edificio:"",tipo_archivo:"JPG",derechos:"CC BY 4.0",descargable:true,keywords:""});
  const ok=msg=>{setToast({msg,type:"ok"});setTimeout(()=>setToast(null),3500);};
  const err=msg=>{setToast({msg,type:"err"});setTimeout(()=>setToast(null),4500);};
  const load=useCallback(async()=>{
    const [{data:c},{data:f},{count:nc},{count:nf},{count:nd}]=await Promise.all([
      supabase.from("v_colecciones").select("*").order("anio",{ascending:false}),
      supabase.from("v_fotografias").select("*").order("creado_en",{ascending:false}),
      supabase.from("colecciones").select("*",{count:"exact",head:true}),
      supabase.from("fotografias").select("*",{count:"exact",head:true}),
      supabase.from("log_descargas").select("*",{count:"exact",head:true}),
    ]);
    setCols(c||[]);setFotos(f||[]);
    setStats({colecciones:nc||0,fotografias:nf||0,descargas:nd||0});
  },[]);
  useEffect(()=>{load();},[load]);
  const uploadImg=async(file,folder="fotos")=>{
    if(!file)return null;
    const ext=file.name.split(".").pop().toLowerCase();
    const path=folder+"/"+Date.now()+"-"+Math.random().toString(36).slice(2)+"."+ext;
    const{error}=await supabase.storage.from("imagenes").upload(path,file,{upsert:true});
    if(error)throw new Error(error.message);
    return path;
  };
  const doUpload=async()=>{
    if(!upForm.titulo||!upForm.coleccion_id)return err("Título y colección son requeridos");
    setSaving(true);
    try{
      const urlPath=await uploadImg(imgFile);
      const{data:fd,error:fe}=await supabase.from("fotografias").insert([{
        coleccion_id:Number(upForm.coleccion_id),titulo:upForm.titulo,autor:upForm.autor,
        anio:Number(upForm.anio)||null,lugar:upForm.lugar,fecha_origen:upForm.fecha_origen||null,
        descripcion:upForm.descripcion,edificio:upForm.edificio,tipo_archivo:upForm.tipo_archivo,
        derechos:upForm.derechos,descargable:upForm.descargable,
        url_original:urlPath,url_web:urlPath,url_thumbnail:urlPath,
      }]).select().single();
      if(fe)throw new Error(fe.message);
      if(upForm.keywords&&fd){
        const kws=upForm.keywords.split(",").map(k=>k.trim()).filter(Boolean);
        if(kws.length)await supabase.from("keywords").insert(kws.map(keyword=>({fotografia_id:fd.id,keyword})));
      }
      ok("✅ Fotografía guardada");setImgFile(null);
      setUpForm(f=>({...f,titulo:"",descripcion:"",keywords:"",fecha_origen:""}));
      load();onRefresh();
    }catch(e){err(e.message);}
    setSaving(false);
  };
  const doNewCol=async()=>{
    if(!newCol.titulo)return err("El título es requerido");
    setSaving(true);
    try{
      const portPath=await uploadImg(portadaFile,"portadas");
      const{error}=await supabase.from("colecciones").insert([{...newCol,anio:Number(newCol.anio)||null,portada_url:portPath}]);
      if(error)throw new Error(error.message);
      ok("✅ Colección creada");setPortadaFile(null);
      setNewCol({titulo:"",descripcion:"",lugar:"",anio:new Date().getFullYear(),autor:"",edificio:"",tipo:"Evento",derechos:"CC BY 4.0"});
      load();onRefresh();
    }catch(e){err(e.message);}
    setSaving(false);
  };
  const doSaveCol=async()=>{
    setSaving(true);
    try{
      const portPath=portadaFile?await uploadImg(portadaFile,"portadas"):undefined;
      const upd={titulo:editCol.titulo,descripcion:editCol.descripcion,lugar:editCol.lugar,anio:Number(editCol.anio)||null,autor:editCol.autor,edificio:editCol.edificio,tipo:editCol.tipo,derechos:editCol.derechos};
      if(portPath)upd.portada_url=portPath;
      const{error}=await supabase.from("colecciones").update(upd).eq("id",editCol.id);
      if(error)throw new Error(error.message);
      ok("✅ Colección actualizada");setEditCol(null);setPortadaFile(null);load();onRefresh();
    }catch(e){err(e.message);}
    setSaving(false);
  };
  const doSaveFoto=async()=>{
    setSaving(true);
    try{
      const{error}=await supabase.from("fotografias").update({
        titulo:editFoto.titulo,autor:editFoto.autor,anio:Number(editFoto.anio)||null,
        lugar:editFoto.lugar,descripcion:editFoto.descripcion,edificio:editFoto.edificio,
        tipo_archivo:editFoto.tipo_archivo,derechos:editFoto.derechos,descargable:editFoto.descargable,
      }).eq("id",editFoto.id);
      if(error)throw new Error(error.message);
      if(editFoto.keywords!==undefined){
        await supabase.from("keywords").delete().eq("fotografia_id",editFoto.id);
        const kws=String(editFoto.keywords||"").split(",").map(k=>k.trim()).filter(Boolean);
        if(kws.length)await supabase.from("keywords").insert(kws.map(keyword=>({fotografia_id:editFoto.id,keyword})));
      }
      ok("✅ Foto actualizada");setEditFoto(null);load();onRefresh();
    }catch(e){err(e.message);}
    setSaving(false);
  };
  const delCol=async id=>{
    if(!window.confirm("¿Eliminar colección y sus fotos?"))return;
    const{error}=await supabase.from("colecciones").delete().eq("id",id);
    if(error){err(error.message);}else{ok("Colección eliminada");load();onRefresh();}
  };
  const toggleDl=async foto=>{
    const{error}=await supabase.from("fotografias").update({descargable:!foto.descargable}).eq("id",foto.id);
    if(error){err(error.message);}else{ok("Permiso actualizado");load();onRefresh();}
  };
  const delFoto=async foto=>{
    if(!window.confirm("¿Eliminar esta fotografía?"))return;
    if(foto.url_original)await supabase.storage.from("imagenes").remove([foto.url_original]).catch(()=>{});
    const{error}=await supabase.from("fotografias").delete().eq("id",foto.id);
    if(error){err(error.message);}else{ok("Foto eliminada");load();onRefresh();}
  };
  const TABS=[{id:"stats",label:"Estadísticas",icon:"stats"},{id:"upload",label:"Subir Imagen",icon:"upload"},{id:"newcol",label:"Nueva Colección",icon:"plus"},{id:"cols",label:"Colecciones",icon:"cols"},{id:"fotos",label:"Fotografías",icon:"photo"}];
  const TIPOS=["Evento","50 Aniversario","Arquitectura","Graduación","Campus","Laboratorio","Historia","Otro"];
  const FRow=({foto})=>(
    <div style={{display:"flex",gap:12,alignItems:"center",padding:"10px 12px",borderRadius:10,border:"1px solid #ebeeff",marginBottom:8}}>
      <div style={{width:50,height:38,borderRadius:6,overflow:"hidden",flexShrink:0,background:"#ebeeff",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {storageUrl(foto.url_web||foto.url_original)?<img src={storageUrl(foto.url_web||foto.url_original)} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<Icon name="photo" size={16} color="#7a7590"/>}
      </div>
      <div style={{flex:1}}>
        <div style={{fontWeight:600,fontSize:13,color:"#1c146d"}}>{foto.titulo}</div>
        <div style={{fontSize:11,color:"#7a7590"}}>{foto.autor} · {foto.anio} · {foto.coleccion_titulo||""}</div>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        <button className="btn" onClick={()=>setEditFoto({...foto,keywords:foto.keywords||""})} style={{background:"#ebeeff",color:"#1c146d",padding:"5px 9px",borderRadius:6,fontSize:11,display:"flex",alignItems:"center",gap:4}}><Icon name="edit" size={11}/>Editar</button>
        <button className="btn" onClick={()=>toggleDl(foto)} style={{background:foto.descargable?"rgba(103,156,188,.15)":"rgba(193,23,32,.1)",color:foto.descargable?"#679cbc":"#c11720",padding:"5px 9px",borderRadius:6,fontSize:11,display:"flex",alignItems:"center",gap:4}}>
          <Icon name={foto.descargable?"unlock":"lock"} size={11}/>{foto.descargable?"Desc.":"Solo vista"}
        </button>
        <button className="btn" onClick={()=>delFoto(foto)} style={{background:"rgba(193,23,32,.1)",color:"#c11720",padding:"6px",borderRadius:6,display:"flex"}}><Icon name="trash" size={13}/></button>
      </div>
    </div>
  );
  const FotoEditForm=()=>(
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#1c146d"}}>Editar foto</h3>
        <button className="btn" onClick={()=>setEditFoto(null)} style={{color:"#7a7590",background:"transparent",fontSize:12,display:"flex",alignItems:"center",gap:5}}><Icon name="x" size={13}/> Cancelar</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{gridColumn:"1/-1"}}><Field label="Título"><input value={editFoto.titulo||""} onChange={e=>setEditFoto(f=>({...f,titulo:e.target.value}))} style={INP}/></Field></div>
        <Field label="Autor"><input value={editFoto.autor||""} onChange={e=>setEditFoto(f=>({...f,autor:e.target.value}))} style={INP}/></Field>
        <Field label="Año"><input type="number" value={editFoto.anio||""} onChange={e=>setEditFoto(f=>({...f,anio:e.target.value}))} style={INP}/></Field>
        <Field label="Lugar"><input value={editFoto.lugar||""} onChange={e=>setEditFoto(f=>({...f,lugar:e.target.value}))} style={INP}/></Field>
        <Field label="Edificio"><input value={editFoto.edificio||""} onChange={e=>setEditFoto(f=>({...f,edificio:e.target.value}))} style={INP}/></Field>
        <Field label="Tipo de archivo"><select value={editFoto.tipo_archivo||"JPG"} onChange={e=>setEditFoto(f=>({...f,tipo_archivo:e.target.value}))} style={{...INP,background:"white"}}>{["TIFF","JPG","PNG","WEBP","GIF","BMP","HEIC"].map(t=><option key={t}>{t}</option>)}</select></Field>
        <Field label="Derechos"><input value={editFoto.derechos||""} onChange={e=>setEditFoto(f=>({...f,derechos:e.target.value}))} style={INP}/></Field>
        <Field label="Palabras clave (coma)"><input value={editFoto.keywords||""} onChange={e=>setEditFoto(f=>({...f,keywords:e.target.value}))} placeholder="campus, graduación" style={INP}/></Field>
        <div style={{gridColumn:"1/-1"}}><Field label="Descripción"><textarea value={editFoto.descripcion||""} onChange={e=>setEditFoto(f=>({...f,descripcion:e.target.value}))} rows={3} style={{...INP,resize:"vertical"}}/></Field></div>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <input type="checkbox" id="dl-ef" checked={!!editFoto.descargable} onChange={e=>setEditFoto(f=>({...f,descargable:e.target.checked}))} style={{width:15,height:15}}/>
          <label htmlFor="dl-ef" style={{fontSize:13,color:"#1a1630",cursor:"pointer"}}>Permitir descarga pública</label>
        </div>
      </div>
      <button className="btn" onClick={doSaveFoto} disabled={saving} style={{marginTop:18,background:"linear-gradient(135deg,#1c146d,#2e2580)",color:"white",padding:"11px 26px",borderRadius:10,fontSize:14,display:"flex",alignItems:"center",gap:7}}>
        {saving?<Spinner small/>:<Icon name="save" size={14} color="white"/>} Guardar cambios
      </button>
    </>
  );
  const ColEditForm=()=>(
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#1c146d"}}>Editar: {editCol.titulo}</h3>
        <button className="btn" onClick={()=>setEditCol(null)} style={{color:"#7a7590",background:"transparent",fontSize:12,display:"flex",alignItems:"center",gap:5}}><Icon name="x" size={13}/> Cancelar</button>
      </div>
      <ZonaCarga archivo={portadaFile} onChange={setPortadaFile} label="Nueva portada (opcional)" accept="image/*" id="port-edit"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{gridColumn:"1/-1"}}><Field label="Título"><input value={editCol.titulo||""} onChange={e=>setEditCol(f=>({...f,titulo:e.target.value}))} style={INP}/></Field></div>
        <Field label="Lugar"><input value={editCol.lugar||""} onChange={e=>setEditCol(f=>({...f,lugar:e.target.value}))} style={INP}/></Field>
        <Field label="Año"><input type="number" value={editCol.anio||""} onChange={e=>setEditCol(f=>({...f,anio:e.target.value}))} style={INP}/></Field>
        <Field label="Autor"><input value={editCol.autor||""} onChange={e=>setEditCol(f=>({...f,autor:e.target.value}))} style={INP}/></Field>
        <Field label="Edificio"><input value={editCol.edificio||""} onChange={e=>setEditCol(f=>({...f,edificio:e.target.value}))} style={INP}/></Field>
        <Field label="Tipo"><input value={editCol.tipo||""} onChange={e=>setEditCol(f=>({...f,tipo:e.target.value}))} style={INP}/></Field>
        <Field label="Derechos"><input value={editCol.derechos||""} onChange={e=>setEditCol(f=>({...f,derechos:e.target.value}))} style={INP}/></Field>
        <div style={{gridColumn:"1/-1"}}><Field label="Descripción"><textarea value={editCol.descripcion||""} onChange={e=>setEditCol(f=>({...f,descripcion:e.target.value}))} rows={3} style={{...INP,resize:"vertical"}}/></Field></div>
      </div>
      <button className="btn" onClick={doSaveCol} disabled={saving} style={{marginTop:18,background:"linear-gradient(135deg,#1c146d,#2e2580)",color:"white",padding:"11px 26px",borderRadius:10,fontSize:14,display:"flex",alignItems:"center",gap:7}}>
        {saving?<Spinner small/>:<Icon name="save" size={14} color="white"/>} Guardar cambios
      </button>
    </>
  );
  return(
    <div style={{position:"fixed",inset:0,zIndex:900,background:"rgba(10,8,35,.8)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:14}}>
      <div style={{background:"white",borderRadius:16,width:"100%",maxWidth:920,maxHeight:"93vh",display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 30px 100px rgba(28,20,109,.35)"}}>
        <div style={{background:"linear-gradient(135deg,#1c146d,#2e2580)",padding:"16px 26px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <LogoImg height={44} style={{filter:"brightness(0) invert(1)",opacity:1}}/>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:21,color:"white",fontWeight:600}}>Panel Administrativo</div>
              <div style={{fontSize:11,color:"rgba(235,238,255,.55)"}}>Supabase · PostgreSQL · ITZ Fototeca</div>
            </div>
          </div>
          <div style={{display:"flex",gap:7}}>
            <button className="btn" onClick={()=>{load();onRefresh();}} style={{background:"rgba(255,255,255,.1)",color:"white",padding:"8px",borderRadius:8}}><Icon name="refresh" size={16}/></button>
            <button className="btn" onClick={onClose} style={{background:"rgba(193,23,32,.3)",color:"white",padding:"8px",borderRadius:8}}><Icon name="close" size={18}/></button>
          </div>
        </div>
        <div style={{display:"flex",borderBottom:"2px solid #ebeeff",padding:"0 14px",background:"#f7f8ff",overflowX:"auto",flexShrink:0}}>
          {TABS.map(t=>(
            <button key={t.id} className="btn" onClick={()=>setTab(t.id)}
              style={{padding:"10px 13px",fontSize:12,color:tab===t.id?"#1c146d":"#7a7590",fontWeight:tab===t.id?600:400,background:"transparent",borderBottom:tab===t.id?"2px solid #1c146d":"2px solid transparent",marginBottom:-2,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
              <Icon name={t.icon} size={12} color={tab===t.id?"#1c146d":"#7a7590"}/> {t.label}
            </button>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:22}}>
          {tab==="stats"&&(
            <div className="fade-in">
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#1c146d",marginBottom:18}}>Estadísticas en tiempo real</h3>
              {stats?(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:14}}>
                {[["Colecciones",stats.colecciones,"cols","#1c146d"],["Fotografías",stats.fotografias,"photo","#679cbc"],["Descargas",stats.descargas,"dl","#916c3f"]].map(([label,val,icon,color])=>(
                  <div key={label} style={{background:"white",border:"1px solid #ebeeff",borderRadius:12,padding:"18px",textAlign:"center"}}>
                    <div style={{width:38,height:38,background:color+"20",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 9px"}}><Icon name={icon} size={19} color={color}/></div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:color,fontWeight:600}}>{val}</div>
                    <div style={{fontSize:10,color:"#7a7590",letterSpacing:".06em",textTransform:"uppercase",marginTop:2}}>{label}</div>
                  </div>
                ))}</div>):<Spinner/>}
              <div style={{marginTop:18,padding:14,background:"#ebeeff",borderRadius:12,fontSize:13,color:"#1c146d"}}>
                💡 También edita en <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" style={{color:"#679cbc"}}>Supabase → Table Editor</a>
              </div>
            </div>
          )}
          {tab==="upload"&&(
            <div className="fade-in">
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#1c146d",marginBottom:18}}>Subir nueva fotografía</h3>
              <ZonaCarga archivo={imgFile} onChange={setImgFile} id="img-up"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Field label="Colección *"><select value={upForm.coleccion_id} onChange={e=>setUpForm(f=>({...f,coleccion_id:e.target.value}))} style={{...INP,background:"white"}}><option value="">— Selecciona —</option>{cols.map(c=><option key={c.id} value={c.id}>{c.titulo}</option>)}</select></Field>
                <Field label="Título *"><input value={upForm.titulo} onChange={e=>setUpForm(f=>({...f,titulo:e.target.value}))} style={INP}/></Field>
                <Field label="Autor"><input value={upForm.autor} onChange={e=>setUpForm(f=>({...f,autor:e.target.value}))} style={INP}/></Field>
                <Field label="Año"><input type="number" value={upForm.anio} onChange={e=>setUpForm(f=>({...f,anio:e.target.value}))} style={INP}/></Field>
                <Field label="Lugar"><input value={upForm.lugar} onChange={e=>setUpForm(f=>({...f,lugar:e.target.value}))} style={INP}/></Field>
                <Field label="Fecha de origen"><input type="date" value={upForm.fecha_origen} onChange={e=>setUpForm(f=>({...f,fecha_origen:e.target.value}))} style={INP}/></Field>
                <Field label="Edificio"><input value={upForm.edificio} onChange={e=>setUpForm(f=>({...f,edificio:e.target.value}))} style={INP}/></Field>
                <Field label="Tipo de archivo"><select value={upForm.tipo_archivo} onChange={e=>setUpForm(f=>({...f,tipo_archivo:e.target.value}))} style={{...INP,background:"white"}}>{["TIFF","JPG","PNG","WEBP","GIF","BMP","HEIC"].map(t=><option key={t}>{t}</option>)}</select></Field>
                <Field label="Derechos"><input value={upForm.derechos} onChange={e=>setUpForm(f=>({...f,derechos:e.target.value}))} style={INP}/></Field>
                <Field label="Palabras clave (coma)"><input value={upForm.keywords} onChange={e=>setUpForm(f=>({...f,keywords:e.target.value}))} placeholder="50 aniversario, campus" style={INP}/></Field>
                <div style={{gridColumn:"1/-1"}}><Field label="Descripción"><textarea value={upForm.descripcion} onChange={e=>setUpForm(f=>({...f,descripcion:e.target.value}))} rows={3} style={{...INP,resize:"vertical"}}/></Field></div>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <input type="checkbox" id="dl-up" checked={upForm.descargable} onChange={e=>setUpForm(f=>({...f,descargable:e.target.checked}))} style={{width:15,height:15}}/>
                  <label htmlFor="dl-up" style={{fontSize:13,color:"#1a1630",cursor:"pointer"}}>Permitir descarga pública (con marca de agua)</label>
                </div>
              </div>
              <button className="btn" onClick={doUpload} disabled={saving} style={{marginTop:18,background:"linear-gradient(135deg,#1c146d,#2e2580)",color:"white",padding:"11px 26px",borderRadius:10,fontSize:14,display:"flex",alignItems:"center",gap:7,opacity:saving?.6:1}}>
                {saving?<Spinner small/>:<Icon name="upload" size={14} color="white"/>} {saving?"Guardando…":"Guardar en Supabase"}
              </button>
            </div>
          )}
          {tab==="newcol"&&(
            <div className="fade-in">
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#1c146d",marginBottom:18}}>Crear nueva colección</h3>
              <ZonaCarga archivo={portadaFile} onChange={setPortadaFile} label="Imagen de portada (opcional)" accept="image/*" id="port-new"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{gridColumn:"1/-1"}}><Field label="Título *"><input value={newCol.titulo} onChange={e=>setNewCol(f=>({...f,titulo:e.target.value}))} style={INP}/></Field></div>
                <Field label="Lugar"><input value={newCol.lugar} onChange={e=>setNewCol(f=>({...f,lugar:e.target.value}))} style={INP}/></Field>
                <Field label="Año"><input type="number" value={newCol.anio} onChange={e=>setNewCol(f=>({...f,anio:e.target.value}))} style={INP}/></Field>
                <Field label="Autor"><input value={newCol.autor} onChange={e=>setNewCol(f=>({...f,autor:e.target.value}))} style={INP}/></Field>
                <Field label="Edificio"><input value={newCol.edificio} onChange={e=>setNewCol(f=>({...f,edificio:e.target.value}))} style={INP}/></Field>
                <Field label="Tipo"><select value={newCol.tipo} onChange={e=>setNewCol(f=>({...f,tipo:e.target.value}))} style={{...INP,background:"white"}}>{TIPOS.map(t=><option key={t}>{t}</option>)}</select></Field>
                <Field label="Derechos"><input value={newCol.derechos} onChange={e=>setNewCol(f=>({...f,derechos:e.target.value}))} style={INP}/></Field>
                <div style={{gridColumn:"1/-1"}}><Field label="Descripción"><textarea value={newCol.descripcion} onChange={e=>setNewCol(f=>({...f,descripcion:e.target.value}))} rows={3} style={{...INP,resize:"vertical"}}/></Field></div>
              </div>
              <button className="btn" onClick={doNewCol} disabled={saving} style={{marginTop:18,background:"linear-gradient(135deg,#1c146d,#2e2580)",color:"white",padding:"11px 26px",borderRadius:10,fontSize:14,display:"flex",alignItems:"center",gap:7,opacity:saving?.6:1}}>
                {saving?<Spinner small/>:<Icon name="plus" size={14} color="white"/>} Crear colección
              </button>
            </div>
          )}
          {tab==="cols"&&<div className="fade-in">{editCol?<ColEditForm/>:(<><h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#1c146d",marginBottom:18}}>Colecciones ({cols.length})</h3>{cols.map(col=>(<div key={col.id} style={{display:"flex",gap:12,alignItems:"center",padding:"11px 13px",borderRadius:10,border:"1px solid #ebeeff",marginBottom:9}}><div style={{width:54,height:40,borderRadius:6,overflow:"hidden",flexShrink:0,background:"#ebeeff",display:"flex",alignItems:"center",justifyContent:"center"}}>{storageUrl(col.portada_url)?<img src={storageUrl(col.portada_url)} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<Icon name="photo" size={17} color="#7a7590"/>}</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:"#1c146d"}}>{col.titulo}</div><div style={{fontSize:11,color:"#7a7590"}}>{col.fotos_reales||col.total_fotos||0} fotos · {col.anio} · {col.lugar}</div></div><div style={{display:"flex",gap:7}}><button className="btn" onClick={()=>setEditCol({...col})} style={{background:"#ebeeff",color:"#1c146d",padding:"5px 11px",borderRadius:6,fontSize:12,display:"flex",alignItems:"center",gap:4}}><Icon name="edit" size={11}/>Editar</button><button className="btn" onClick={()=>delCol(col.id)} style={{background:"rgba(193,23,32,.1)",color:"#c11720",padding:"5px 11px",borderRadius:6,fontSize:12,display:"flex",alignItems:"center",gap:4}}><Icon name="trash" size={11}/>Eliminar</button></div></div>))}</>)}</div>}
          {tab==="fotos"&&<div className="fade-in">{editFoto?<FotoEditForm/>:(<><h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#1c146d",marginBottom:18}}>Fotografías ({fotos.length})</h3>{fotos.map(foto=><FRow key={foto.id} foto={foto}/>)}</>)}</div>}
        </div>
      </div>
      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}

// ── APP PRINCIPAL ─────────────────────────────────────────────
export default function Fototeca() {
  const [view,setView]=useState("home");
  const [activeCol,setActiveCol]=useState(null);
  const [lightbox,setLightbox]=useState(null);
  const [search,setSearch]=useState("");
  const [showSug,setShowSug]=useState(false);
  const [filters,setFilters]=useState({years:[],places:[],authors:[],buildings:[],types:[],rights:[]});
  const [gridMode,setGridMode]=useState("grid");
  const [page,setPage]=useState("gallery");
  const [cols,setCols]=useState([]);
  const [fotos,setFotos]=useState([]);
  const [filterOpts,setFilterOpts]=useState({years:[],places:[],authors:[],buildings:[],types:[],rights:[]});
  const [loading,setLoading]=useState(true);
  const [colLoading,setColLoading]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [adminPass,setAdminPass]=useState("");
  const [adminOk,setAdminOk]=useState(false);
  const [passErr,setPassErr]=useState("");
  const [sugerencias,setSugerencias]=useState([]);
  const [kwColIds,setKwColIds]=useState(null);

  const fetchAll=useCallback(async()=>{
    setLoading(true);
    const [{data:c},{data:kw}]=await Promise.all([
      supabase.from("v_colecciones").select("*").order("anio",{ascending:false}),
      supabase.from("keywords").select("keyword").limit(300),
    ]);
    const colData=c||[];
    setCols(colData);
    setFilterOpts({
      years:[...new Set(colData.map(x=>String(x.anio)).filter(Boolean))].sort((a,b)=>b-a),
      places:[...new Set(colData.map(x=>x.lugar).filter(Boolean))],
      authors:[...new Set(colData.map(x=>x.autor).filter(Boolean))],
      buildings:[...new Set(colData.map(x=>x.edificio).filter(Boolean))],
      types:[...new Set(colData.map(x=>x.tipo).filter(Boolean))],
      rights:[...new Set(colData.map(x=>x.derechos).filter(Boolean))],
    });
    const kwArr=(kw||[]).map(r=>r.keyword).filter(Boolean);
    const sug=[...colData.map(c=>c.titulo),...colData.map(c=>c.autor).filter(Boolean),...colData.map(c=>c.lugar).filter(Boolean),...colData.map(c=>c.tipo).filter(Boolean),...kwArr];
    setSugerencias([...new Set(sug)]);
    setLoading(false);
  },[]);

  useEffect(()=>{
    if(!search.trim()){setKwColIds(null);return;}
    const q=search.trim();
    const timer=setTimeout(async()=>{
      const{data}=await supabase.from("keywords").select("keyword, fotografias(coleccion_id)").ilike("keyword","%"+q+"%");
      if(data&&data.length>0){
        const ids=[...new Set(data.flatMap(r=>r.fotografias?[r.fotografias.coleccion_id]:[]).filter(Boolean))];
        setKwColIds(ids);
      }else{setKwColIds([]);}
    },400);
    return()=>clearTimeout(timer);
  },[search]);

  const fetchFotos=useCallback(async colId=>{
    setColLoading(true);
    const{data:f}=await supabase.from("v_fotografias").select("*").eq("coleccion_id",colId).order("creado_en");
    setFotos(prev=>[...prev.filter(p=>p.coleccion_id!==colId),...(f||[])]);
    setColLoading(false);
  },[]);

  useEffect(()=>{fetchAll();},[]);

  const toggleFilter=(cat,val)=>setFilters(f=>({...f,[cat]:f[cat].includes(val)?f[cat].filter(x=>x!==val):[...f[cat],val]}));

  const filtered=cols.filter(col=>{
    const q=search.toLowerCase();
    const matchText=!q||col.titulo?.toLowerCase().includes(q)||col.lugar?.toLowerCase().includes(q)||col.autor?.toLowerCase().includes(q)||col.descripcion?.toLowerCase().includes(q)||col.edificio?.toLowerCase().includes(q);
    const matchKw=!q||kwColIds===null||kwColIds.includes(col.id);
    return(matchText||matchKw)
      &&(!filters.years.length||filters.years.includes(String(col.anio)))
      &&(!filters.places.length||filters.places.some(p=>col.lugar?.includes(p)))
      &&(!filters.authors.length||filters.authors.includes(col.autor))
      &&(!filters.buildings.length||filters.buildings.includes(col.edificio))
      &&(!filters.types.length||filters.types.includes(col.tipo))
      &&(!filters.rights.length||filters.rights.includes(col.derechos));
  });

  const sugerenciasFiltradas=search.length>0?sugerencias.filter(s=>s.toLowerCase().includes(search.toLowerCase())).slice(0,7):[];
  const handleColClick=async col=>{setActiveCol(col);setView("collection");await fetchFotos(col.id);};
  const handleNav=dir=>{if(!lightbox)return;const col=fotos.filter(f=>f.coleccion_id===lightbox.coleccion_id);const idx=col.findIndex(f=>f.id===lightbox.id);setLightbox(col[(idx+dir+col.length)%col.length]);};
  const activeFilters=Object.values(filters).flat().length;
  const totalFotos=cols.reduce((a,c)=>a+(c.fotos_reales||c.total_fotos||0),0);
  const ADMIN_PASS="admin123";
  const tryLogin=()=>{if(adminPass===ADMIN_PASS){setAdminOk(true);setPassErr("");}else setPassErr("Contraseña incorrecta");};

  const FilterGroup=({title,cat,opts=[]})=>(
    <div style={{marginBottom:16}}>
      <div style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"#7a7590",marginBottom:7,fontWeight:600}}>{title}</div>
      {opts.length===0?<div style={{fontSize:11,color:"#ebeeff"}}>—</div>:opts.map(o=>(
        <div key={o} className="cb">
          <input type="checkbox" id={cat+"-"+o} checked={filters[cat].includes(o)} onChange={()=>toggleFilter(cat,o)}/>
          <label htmlFor={cat+"-"+o}>{o}</label>
        </div>
      ))}
    </div>
  );

  return(
    <>
      <style>{GS}</style>
      <GobHeader />
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(28,20,109,.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{maxWidth:1380,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",gap:14,height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:11,flexShrink:0}}>
            <LogoImg height={46} style={{filter:"drop-shadow(0 2px 4px rgba(0,0,0,.4))",flexShrink:0}}/>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:600,color:"white",lineHeight:1}}>Fototeca ITZ</div>
              <div style={{fontSize:9,letterSpacing:".12em",color:"rgba(235,238,255,.45)",textTransform:"uppercase"}}>50 Aniversario · 1976–2026</div>
            </div>
          </div>
          <div style={{display:"flex",gap:3,marginLeft:10}}>
            {[["gallery","Colecciones"],["about","Acerca de"]].map(([id,label])=>(
              <button key={id} className="btn" onClick={()=>{setPage(id);setView("home");}}
                style={{color:page===id?"white":"#ebeeff",background:page===id?"rgba(255,255,255,.1)":"transparent",padding:"6px 13px",borderRadius:6,fontSize:13,opacity:page===id?1:.7}}>{label}</button>
            ))}
          </div>
          <div style={{flex:1}}/>
          <button className="btn" onClick={()=>setShowAdmin(true)} style={{background:"rgba(145,108,63,.3)",color:"white",padding:"7px 14px",borderRadius:8,fontSize:12,display:"flex",alignItems:"center",gap:6,border:"1px solid rgba(145,108,63,.4)"}}>
            <Icon name="settings" size={13} color="white"/> Admin
          </button>
        </div>
      </nav>

      {view==="home"&&page==="gallery"&&(
        <>
          <div style={{background:"linear-gradient(160deg,#1c146d 0%,#2e2580 60%,#679cbc 100%)",padding:"44px 24px 48px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-80,right:-80,width:360,height:360,borderRadius:"50%",background:"rgba(103,156,188,.07)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:-60,left:-60,width:280,height:280,borderRadius:"50%",background:"rgba(145,108,63,.07)",pointerEvents:"none"}}/>
            
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,letterSpacing:".25em",color:"#679cbc",textTransform:"uppercase",marginBottom:10}}>Repositorio fotográfico</div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4.5vw,52px)",color:"white",lineHeight:1.1,marginBottom:14}}>Fototeca Digital<br/><em style={{color:"#ebeeff",fontWeight:400}}>del ITZ</em></h1>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:14,maxWidth:480,margin:"0 auto 28px",lineHeight:1.6}}>Archivo visual institucional con {loading?"…":totalFotos} fotografías del patrimonio del ITZ.</p>
            <div style={{maxWidth:540,margin:"0 auto",position:"relative"}}>
              <div style={{display:"flex",alignItems:"center",background:"white",borderRadius:12,padding:"0 15px",boxShadow:"0 8px 40px rgba(0,0,0,.25)"}}>
                <Icon name="search" size={17} color="#7a7590"/>
                <input value={search} onChange={e=>{setSearch(e.target.value);setShowSug(true);}}
                  onFocus={()=>setShowSug(true)} onBlur={()=>setTimeout(()=>setShowSug(false),200)}
                  placeholder="Buscar por título, autor, edificio, keywords…"
                  style={{flex:1,padding:"13px 11px",border:"none",outline:"none",fontSize:14,color:"#1a1630",background:"transparent"}}/>
                {search&&<button className="btn" onClick={()=>{setSearch("");setKwColIds(null);}} style={{background:"transparent",padding:4,color:"#7a7590"}}><Icon name="x" size={14}/></button>}
              </div>
              {showSug&&sugerenciasFiltradas.length>0&&(
                <div style={{position:"absolute",top:"calc(100% + 5px)",left:0,right:0,background:"white",borderRadius:10,boxShadow:"0 12px 40px rgba(0,0,0,.2)",zIndex:200,overflow:"hidden"}}>
                  {sugerenciasFiltradas.map(s=>(
                    <div key={s} onClick={()=>{setSearch(s);setShowSug(false);}}
                      style={{padding:"9px 15px",fontSize:13,color:"#1a1630",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}
                      onMouseEnter={e=>e.currentTarget.style.background="#ebeeff"}
                      onMouseLeave={e=>e.currentTarget.style.background="white"}>
                      <Icon name="key" size={12} color="#7a7590"/> {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:28,marginTop:26,flexWrap:"wrap"}}>
              {[[String(cols.length),"Colecciones"],[String(totalFotos),"Fotografías"],[String(new Set(cols.map(c=>c.autor)).size),"Autores"],[String(new Set(cols.map(c=>c.edificio)).size),"Edificios"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:"white",fontWeight:600}}>{loading?"…":n}</div>
                  <div style={{fontSize:10,color:"rgba(235,238,255,.5)",letterSpacing:".1em",textTransform:"uppercase"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <Carrusel/>
        </>
      )}

      {page==="about"&&(
        <div style={{maxWidth:760,margin:"56px auto",padding:"0 22px"}} className="fade-in">
          <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:22}}>
            <LogoImg height={72}/>
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:"#1c146d",lineHeight:1.1}}>Fototeca Digital ITZ</h2>
              <div style={{color:"#916c3f",fontSize:13,marginTop:4}}>Instituto Tecnológico de Zacatecas · 50 Aniversario 1976–2026</div>
            </div>
          </div>
          <div style={{width:56,height:3,background:"#916c3f",marginBottom:22}}/>
          <p style={{fontSize:15,lineHeight:1.8,color:"#1a1630",marginBottom:16}}>La <strong>Fototeca Digital del Instituto Tecnológico de Zacatecas</strong> preserva, organiza y difunde el acervo fotográfico institucional.</p>
          <p style={{fontSize:15,lineHeight:1.8,color:"#1a1630",marginBottom:20}}>Imágenes en <strong>TIFF de alta resolución</strong>, distribuidas en JPG/WEBP. Datos en <strong>Supabase (PostgreSQL)</strong> con Storage CDN global.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14}}>
            {[["Preservación","TIFF sin pérdida de calidad"],["Base de datos","PostgreSQL via Supabase"],["Almacenamiento","Storage CDN global"],["Seguridad","Acceso por roles y permisos"]].map(([t,d])=>(
              <div key={t} style={{background:"white",borderRadius:12,padding:18,border:"1px solid rgba(28,20,109,.08)"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"#1c146d",marginBottom:5,fontWeight:600}}>{t}</div>
                <div style={{fontSize:12,color:"#7a7590",lineHeight:1.5}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {page==="gallery"&&(
        <div style={{maxWidth:1380,margin:"0 auto",padding:"22px 14px",display:"flex",gap:20}}>
          <aside style={{width:215,flexShrink:0,position:"sticky",top:82,alignSelf:"flex-start",maxHeight:"calc(100vh - 100px)",overflowY:"auto"}}>
            <div style={{background:"white",borderRadius:12,padding:18,border:"1px solid rgba(28,20,109,.08)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <span style={{fontSize:13,fontWeight:600,color:"#1c146d",display:"flex",alignItems:"center",gap:6}}>
                  <Icon name="filter" size={12} color="#1c146d"/> Filtros
                  {activeFilters>0&&<span style={{background:"#1c146d",color:"white",borderRadius:"50%",width:17,height:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9}}>{activeFilters}</span>}
                </span>
                {activeFilters>0&&<button className="btn" onClick={()=>setFilters({years:[],places:[],authors:[],buildings:[],types:[],rights:[]})} style={{fontSize:11,color:"#c11720",background:"transparent"}}>Limpiar</button>}
              </div>
              <FilterGroup title="Año" cat="years" opts={filterOpts.years}/>
              <FilterGroup title="Lugar" cat="places" opts={filterOpts.places}/>
              <FilterGroup title="Autor" cat="authors" opts={filterOpts.authors}/>
              <FilterGroup title="Edificio" cat="buildings" opts={filterOpts.buildings}/>
              <FilterGroup title="Tipo" cat="types" opts={filterOpts.types}/>
              <FilterGroup title="Derechos" cat="rights" opts={filterOpts.rights}/>
            </div>
          </aside>
          <main style={{flex:1,minWidth:0}}>
            {view==="home"&&(
              <>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:8}}>
                  <span style={{fontSize:13,color:"#7a7590"}}>
                    {loading?"Cargando…":`${filtered.length} colección${filtered.length!==1?"es":""} encontrada${filtered.length!==1?"s":""}`}
                    {activeFilters>0&&<span style={{marginLeft:8,color:"#916c3f",fontSize:12}}>({activeFilters} filtro{activeFilters!==1?"s":""} activo{activeFilters!==1?"s":""})</span>}
                  </span>
                  <div style={{display:"flex",gap:5}}>
                    <button className="btn" onClick={fetchAll} style={{background:"#ebeeff",color:"#1c146d",padding:"7px",borderRadius:7}}><Icon name="refresh" size={14} color="#1c146d"/></button>
                    <button className="btn" onClick={()=>setGridMode("grid")} style={{background:gridMode==="grid"?"#1c146d":"#ebeeff",color:gridMode==="grid"?"white":"#1c146d",padding:"7px",borderRadius:7}}><Icon name="grid" size={14} color={gridMode==="grid"?"white":"#1c146d"}/></button>
                    <button className="btn" onClick={()=>setGridMode("list")} style={{background:gridMode==="list"?"#1c146d":"#ebeeff",color:gridMode==="list"?"white":"#1c146d",padding:"7px",borderRadius:7}}><Icon name="list" size={14} color={gridMode==="list"?"white":"#1c146d"}/></button>
                  </div>
                </div>
                {loading?<Spinner/>:filtered.length===0?(
                  <div style={{textAlign:"center",padding:"70px 20px",color:"#7a7590"}}>
                    <Icon name="photo" size={44} color="#ebeeff"/>
                    <div style={{fontSize:19,fontFamily:"'Cormorant Garamond',serif",color:"#1c146d",marginTop:14}}>Sin resultados</div>
                    <div style={{fontSize:13,marginTop:5}}>Modifica los filtros o el término de búsqueda</div>
                    <button className="btn" onClick={fetchAll} style={{marginTop:14,background:"#1c146d",color:"white",padding:"9px 22px",borderRadius:8,fontSize:13,display:"inline-flex",alignItems:"center",gap:7}}><Icon name="refresh" size={13} color="white"/> Recargar</button>
                  </div>
                ):gridMode==="grid"?(
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:18}} className="fade-in">
                    {filtered.map(col=><ColCard key={col.id} col={col} onClick={handleColClick}/>)}
                  </div>
                ):(
                  <div style={{display:"flex",flexDirection:"column",gap:10}} className="fade-in">
                    {filtered.map(col=>(
                      <div key={col.id} className="card-hover" onClick={()=>handleColClick(col)} style={{background:"white",borderRadius:12,overflow:"hidden",cursor:"pointer",display:"flex",border:"1px solid rgba(28,20,109,.08)"}}>
                        <div className="img-zoom" style={{width:135,height:100,flexShrink:0,background:"#ebeeff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          {storageUrl(col.portada_url)?<img src={storageUrl(col.portada_url)} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<Icon name="photo" size={26} color="#7a7590"/>}
                        </div>
                        <div style={{padding:"13px 17px",flex:1}}>
                          <div style={{display:"flex",gap:7,alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap"}}>
                            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"#1c146d",fontWeight:600}}>{col.titulo}</h3>
                            {col.tipo&&<span className="poster-badge">{col.tipo}</span>}
                          </div>
                          <div style={{fontSize:11,color:"#7a7590",margin:"3px 0 7px",display:"flex",gap:8,flexWrap:"wrap"}}>
                            {col.lugar&&<span>{col.lugar}</span>}{col.anio&&<><span>·</span><span>{col.anio}</span></>}{col.autor&&<><span>·</span><span style={{color:"#916c3f"}}>{col.autor}</span></>}
                            <span>·</span><span>{col.fotos_reales||col.total_fotos||0} fotos</span>
                          </div>
                          <p style={{fontSize:12,color:"#7a7590",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{col.descripcion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {view==="collection"&&activeCol&&(
              <ColView col={activeCol} fotos={fotos} loading={colLoading} onFotoClick={setLightbox} onBack={()=>{setView("home");setActiveCol(null);}}/>
            )}
          </main>
        </div>
      )}

      <footer style={{background:"#1c146d",color:"rgba(255,255,255,.5)",padding:"26px 22px",marginTop:44,textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:7}}>
          <LogoImg height={34} style={{opacity:.75}}/>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"white"}}>Fototeca Digital · Instituto Tecnológico de Zacatecas</span>
        </div>
        <div style={{fontSize:11}}>© {new Date().getFullYear()} · 50 Aniversario 1976–2026 · Las imágenes están protegidas por derechos de autor</div>
        <div style={{marginTop:5,fontSize:10,color:"rgba(103,156,188,.35)"}}>Supabase · PostgreSQL · Storage CDN</div>
      </footer>
      <GobFooter />

      {lightbox&&<Lightbox foto={lightbox} fotos={fotos} onClose={()=>setLightbox(null)} onNav={handleNav}/>}

      {showAdmin&&!adminOk&&(
        <div style={{position:"fixed",inset:0,zIndex:900,background:"rgba(10,8,35,.8)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:16,padding:34,width:350,boxShadow:"0 30px 80px rgba(28,20,109,.3)",textAlign:"center"}}>
            <LogoImg height={70} style={{margin:"0 auto 16px",display:"block",filter:"drop-shadow(0 2px 8px rgba(28,20,109,.2))"}}/>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:21,color:"#1c146d",marginBottom:4}}>Acceso administrativo</h3>
            <p style={{fontSize:12,color:"#7a7590",marginBottom:18}}>Fototeca ITZ · Supabase</p>
            {passErr&&<div style={{background:"rgba(193,23,32,.08)",color:"#c11720",border:"1px solid rgba(193,23,32,.2)",borderRadius:8,padding:"7px 11px",fontSize:12,marginBottom:13}}>{passErr}</div>}
            <input type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryLogin()} placeholder="Contraseña de administrador" style={{...INP,textAlign:"center",marginBottom:14}}/>
            <div style={{display:"flex",gap:7}}>
              <button className="btn" onClick={()=>{setShowAdmin(false);setAdminPass("");setPassErr("");}} style={{flex:1,padding:"9px",border:"1.5px solid #ebeeff",borderRadius:8,fontSize:13,color:"#7a7590",background:"white"}}>Cancelar</button>
              <button className="btn" onClick={tryLogin} style={{flex:1,padding:"9px",background:"#1c146d",color:"white",borderRadius:8,fontSize:13}}>Entrar</button>
            </div>
          </div>
        </div>
      )}
      {showAdmin&&adminOk&&(
        <AdminPanel onClose={()=>{setShowAdmin(false);setAdminOk(false);setAdminPass("");}} onRefresh={fetchAll}/>
      )}
    </>

  );
}
