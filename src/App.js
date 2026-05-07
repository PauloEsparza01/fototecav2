/* eslint-disable react-hooks/exhaustive-deps */
import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";

const SUPABASE_URL = "https://iqyytvzlsquwkeimtein.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeXl0dnpsc3F1d2tlaW10ZWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDYyODEsImV4cCI6MjA5MDEyMjI4MX0.l-VPzdyKsYKVHrGxYG8_JwE97-ieAdIBLyh4jcBWj30";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

//LGO
const LOGO_ITZ = "data:image/png;base64,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";

const C = {
  navy:"#1c146d", cream:"#f2ebe3", bronze:"#916c3f",
  lavender:"#ebeeff", crimson:"#c11720", steel:"#679cbc",
  mid:"#2e2580", text:"#1a1630", muted:"#7a7590",
};

// Fotos del carrusel
const CARRUSEL = [
  { src:"/carrusel/foto1.jpg", titulo:"50 Aniversario ITZ", sub:"Instituto Tecnológico de Zacatecas 1976–2026" },
  { src:"/carrusel/foto2.jpg", titulo:"Campus ITZ",         sub:"Patrimonio educativo de Zacatecas" },
  { src:"/carrusel/foto3.jpg", titulo:"Comunidad ITZ",      sub:"Formando profesionistas desde 1976" },
  { src:"/carrusel/foto4.jpg", titulo:"Historia y Futuro",  sub:"Tecnología · Innovación · Tradición" },
];

const GS = `
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
  .btn { background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
  .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(28,20,109,0.12); }
  .img-zoom img { transition: transform 0.3s ease; }
  .img-zoom:hover img { transform: scale(1.02); }
  .drag-over { border-color: #1c146d !important; background: rgba(28,20,109,0.05) !important; }
  .poster-badge { background: #916c3f; color: white; font-size: 11px; padding: 3px 10px; border-radius: 30px; font-weight: 500; letter-spacing: 0.3px; backdrop-filter: blur(2px); }
  .tag { display: inline-block; padding: 3px 8px; border-radius: 20px; font-size: 10px; font-weight: 500; }
  .cb { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
  .cb label { font-size: 12px; color: #1a1630; cursor: pointer; }
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

const LogoImg = ({ height=44, style={} }) => (
  <img src={LOGO_ITZ} alt="ITZ" height={height} style={{objectFit:"contain",...style}}/>
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
              style={{background:"rgba(145,108,63,.4)",color:"white",padding:"7px 14px",borderRadius:8,fontSize:12,display:"flex",alignItems:"center",gap:6,fontWeight:500,opacity:descargando ? 0.6 : 1}}>
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

// ── PANEL ADMIN (completo) ───────────────────────────────────────────────
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
            <LogoImg height={42} style={{filter:"brightness(0) invert(1)",opacity:.9}}/>
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
              <button className="btn" onClick={doUpload} disabled={saving} style={{marginTop:18,background:"linear-gradient(135deg,#1c146d,#2e2580)",color:"white",padding:"11px 26px",borderRadius:10,fontSize:14,display:"flex",alignItems:"center",gap:7,opacity:saving ? 0.6 : 1}}>
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
              <button className="btn" onClick={doNewCol} disabled={saving} style={{marginTop:18,background:"linear-gradient(135deg,#1c146d,#2e2580)",color:"white",padding:"11px 26px",borderRadius:10,fontSize:14,display:"flex",alignItems:"center",gap:7,opacity:saving ? 0.6 : 1}}>
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

// ── APP PRINCIPAL (con búsqueda mejorada) ─────────────────────────────
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
  // Nuevos estados para búsqueda de fotos individuales
  const [searchPhotoResults, setSearchPhotoResults] = useState([]);
  const [searchPhotoLoading, setSearchPhotoLoading] = useState(false);

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

  // Búsqueda mejorada: colecciones por keywords + fotos individuales
  useEffect(()=>{
    if(!search.trim()){
      setKwColIds(null);
      setSearchPhotoResults([]);
      return;
    }
    const q = search.trim().toLowerCase();
    const timer = setTimeout(async () => {
      // 1. Keywords para colecciones
      const { data: kwData } = await supabase
        .from("keywords")
        .select("keyword, fotografias(coleccion_id)")
        .ilike("keyword", `%${q}%`);
      if(kwData && kwData.length>0){
        const ids = [...new Set(kwData.flatMap(r=>r.fotografias?[r.fotografias.coleccion_id]:[]).filter(Boolean))];
        setKwColIds(ids);
      } else {
        setKwColIds([]);
      }

      // 2. Búsqueda directa en fotografías
      setSearchPhotoLoading(true);
      const { data: fotosEncontradas, error } = await supabase
        .from("v_fotografias")
        .select("*")
        .or(`titulo.ilike.%${q}%,autor.ilike.%${q}%,lugar.ilike.%${q}%,edificio.ilike.%${q}%,descripcion.ilike.%${q}%`)
        .order("creado_en", { ascending: false })
        .limit(50);
      if (!error && fotosEncontradas) {
        setSearchPhotoResults(fotosEncontradas);
      } else {
        setSearchPhotoResults([]);
      }
      setSearchPhotoLoading(false);
    }, 400);
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

  // Filtrado de colecciones
  const filteredCollections = cols.filter(col=>{
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
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(28,20,109,.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{maxWidth:1380,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",gap:14,height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:11,flexShrink:0}}>
            <LogoImg height={44} style={{filter:"brightness(0) invert(1)",opacity:.92}}/>
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
            <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
              <LogoImg height={68} style={{filter:"brightness(0) invert(1)",opacity:.85}}/>
            </div>
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
                {search&&<button className="btn" onClick={()=>{setSearch("");setKwColIds(null);setSearchPhotoResults([]);}} style={{background:"transparent",padding:4,color:"#7a7590"}}><Icon name="x" size={14}/></button>}
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
                    {loading?"Cargando…":`${filteredCollections.length} colecciones`}
                    {activeFilters>0&&<span style={{marginLeft:8,color:"#916c3f",fontSize:12}}>({activeFilters} filtro{activeFilters!==1?"s":""} activo{activeFilters!==1?"s":""})</span>}
                    {search && searchPhotoResults.length > 0 && <span style={{marginLeft:8,color:"#679cbc",fontSize:12}}> + {searchPhotoResults.length} fotos encontradas</span>}
                  </span>
                  <div style={{display:"flex",gap:5}}>
                    <button className="btn" onClick={fetchAll} style={{background:"#ebeeff",color:"#1c146d",padding:"7px",borderRadius:7}}><Icon name="refresh" size={14} color="#1c146d"/></button>
                    <button className="btn" onClick={()=>setGridMode("grid")} style={{background:gridMode==="grid"?"#1c146d":"#ebeeff",color:gridMode==="grid"?"white":"#1c146d",padding:"7px",borderRadius:7}}><Icon name="grid" size={14} color={gridMode==="grid"?"white":"#1c146d"}/></button>
                    <button className="btn" onClick={()=>setGridMode("list")} style={{background:gridMode==="list"?"#1c146d":"#ebeeff",color:gridMode==="list"?"white":"#1c146d",padding:"7px",borderRadius:7}}><Icon name="list" size={14} color={gridMode==="list"?"white":"#1c146d"}/></button>
                  </div>
                </div>

                {/* Colecciones encontradas */}
                {loading?<Spinner/>:filteredCollections.length===0 && searchPhotoResults.length===0 ? (
                  <div style={{textAlign:"center",padding:"70px 20px",color:"#7a7590"}}>
                    <Icon name="photo" size={44} color="#ebeeff"/>
                    <div style={{fontSize:19,fontFamily:"'Cormorant Garamond',serif",color:"#1c146d",marginTop:14}}>Sin resultados</div>
                    <div style={{fontSize:13,marginTop:5}}>Modifica los filtros o el término de búsqueda</div>
                    <button className="btn" onClick={fetchAll} style={{marginTop:14,background:"#1c146d",color:"white",padding:"9px 22px",borderRadius:8,fontSize:13,display:"inline-flex",alignItems:"center",gap:7}}><Icon name="refresh" size={13} color="white"/> Recargar</button>
                  </div>
                ) : (
                  <>
                    {filteredCollections.length > 0 && (
                      <>
                        <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"#1c146d",margin:"20px 0 12px"}}>📁 Colecciones</h3>
                        {gridMode==="grid"?(
                          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:18}} className="fade-in">
                            {filteredCollections.map(col=><ColCard key={col.id} col={col} onClick={handleColClick}/>)}
                          </div>
                        ):(
                          <div style={{display:"flex",flexDirection:"column",gap:10}} className="fade-in">
                            {filteredCollections.map(col=>(
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

                    {/* Fotografías individuales encontradas */}
                    {searchPhotoResults.length > 0 && (
                      <>
                        <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"#1c146d",margin:"30px 0 12px"}}>🖼️ Fotografías encontradas ({searchPhotoResults.length})</h3>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
                          {searchPhotoResults.map(foto=>{
                            const s=storageUrl(foto.url_web||foto.url_original);
                            return(
                              <div key={foto.id} className="card-hover img-zoom" onClick={()=>setLightbox(foto)} style={{background:"white",borderRadius:10,overflow:"hidden",cursor:"pointer",border:"1px solid rgba(28,20,109,.06)"}}>
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
                      </>
                    )}
                  </>
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
          <LogoImg height={30} style={{filter:"brightness(0) invert(1)",opacity:.6}}/>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"white"}}>Fototeca Digital · Instituto Tecnológico de Zacatecas</span>
        </div>
        <div style={{fontSize:11}}>© {new Date().getFullYear()} · 50 Aniversario 1976–2026 · Las imágenes están protegidas por derechos de autor</div>
        <div style={{marginTop:5,fontSize:10,color:"rgba(103,156,188,.35)"}}>Supabase · PostgreSQL · Storage CDN</div>
      </footer>

      {lightbox&&<Lightbox foto={lightbox} fotos={[...fotos, ...searchPhotoResults]} onClose={()=>setLightbox(null)} onNav={handleNav}/>}

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

      {showAdmin && adminOk && (
        <AdminPanel onClose={() => { setShowAdmin(false); setAdminOk(false); setAdminPass(""); }} onRefresh={fetchAll}/>
      )}
    </>
  );
}
