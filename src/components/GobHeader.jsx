import { useState } from "react";

const ROLES = [
  { label: "Estudiantes",                  icon: "/logos/icon-estudiantes.png" },
  { label: "Académicos",                   icon: "/logos/icon-academicos.png" },
  { label: "Egresados y Egresadas",        icon: "/logos/icon-egresados.png" },
  { label: "Estadística",                  icon: "/logos/icon-estadistica.png" },
  { label: "Transparencia TecNM",          icon: "/logos/icon-transparencia.png" },
  { label: "Protección de Datos Personales", icon: "/logos/icon-datos.png" },
  { label: "Personal de Apoyo",            icon: "/logos/icon-personal.png" },
];

const NAV = [
  "Conócenos", "Admisión", "Oferta Educativa",
  "TecNM Virtual", "Vinculación",
  "Eventos y Reconocimientos", "Agendas Estratégicas",
];

/* ── Ícono lupa SVG ── */
function IconSearch({ size = 18, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  );
}

/* ── Ícono Casa SVG ── */
function IconHome({ size = 18, color = "rgba(255,255,255,0.85)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,11 12,2 21,11" />
      <rect x="5" y="11" width="14" height="11" />
      <rect x="9" y="15" width="6" height="7" />
    </svg>
  );
}

/* ── Menú desplegable del Home ── */
const HOME_MENU = [
  { label: "Inicio",       href: "/" },
  { label: "Mapa del sitio", href: "/mapa" },
  { label: "Contacto",       href: "/contacto" },
];

export default function GobHeader() {
  const [expanded, setExpanded] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);

  return (
    <header
      style={{ fontFamily: "'Montserrat', 'Open Sans', Arial, sans-serif" }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setHomeOpen(false); }}
    >

      {/* ── 1. BARRA SUPERIOR: Gobierno de México ── */}
      <div style={{
        background: "#98989A",
        padding: "6px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        maxHeight: expanded ? "60px" : "0px",
        transition: "max-height 0.3s ease",
      }}>
        {/* Contenedor interno que escala y se desvanece
          para que el texto guinda no se vea cortado de golpe.
        */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          transform: expanded ? "scale(1)" : "scale(0.8)",
          opacity: expanded ? 1 : 0,
          transformOrigin: "left center",
          transition: "transform 0.3s ease, opacity 0.2s ease"
        }}>
          <a
            href="https://www.gob.mx/"
            target="_blank"
            rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            <img
              src="/logos/escudo-gob.png"
              alt="Escudo Nacional"
              style={{ height: 40 }}
              onError={e => e.target.style.display = "none"}
            />
            <div style={{ color: "rgba(98, 19, 51, .85)", lineHeight: 1.2, whiteSpace: "nowrap" }}>
              <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.02em" }}>Gobierno de</div>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.01em" }}>México</div>
            </div>
          </a>
        </div>

        {/* Mismo tratamiento de ajuste para los enlaces derechos */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          transform: expanded ? "scale(1)" : "scale(0.8)",
          opacity: expanded ? 1 : 0,
          transformOrigin: "right center",
          transition: "transform 0.3s ease, opacity 0.2s ease"
        }}>
          <a href="https://www.gob.mx/tramites" target="_blank" rel="noreferrer"
            style={{ color: "rgba(98, 19, 51, .85)", fontSize: 14, textDecoration: "none", fontWeight: 400, letterSpacing: "0.01em" }}>
            Trámites
          </a>
          <a href="https://www.gob.mx/gobierno" target="_blank" rel="noreferrer"
            style={{ color: "rgba(98, 19, 51, .85)", fontSize: 14, textDecoration: "none", fontWeight: 400, letterSpacing: "0.01em" }}>
            Gobierno
          </a>
          <a
            href="https://www.gob.mx/"
            aria-label="Buscar"
            style={{
              display: "flex", alignItems: "center",
              padding: "4px 2px", textDecoration: "none",
            }}>
            <IconSearch size={19} color="rgba(98, 19, 51, .85)" />
          </a>
        </div>
      </div>

      {/* ── 2. BARRA DE ROLES ── */}
      <div style={{
        background: "#1B396A",
        padding: "0 24px",
        display: "flex",
        overflowX: "auto",
        scrollbarWidth: "none",
        maxHeight: expanded ? "60px" : "0px",
        transition: "max-height 0.3s ease",
        overflow: "hidden",
      }}>
        {ROLES.map(r => (
          <a key={r.label} href="#"
            style={{
              color: "rgba(255,255,255,.85)", fontSize: 12,
              padding: "6px 10px", whiteSpace: "nowrap",
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: 6,
              fontWeight: 500, letterSpacing: "0.01em",
            }}>
            <img
              src={r.icon}
              alt=""
              aria-hidden="true"
              style={{
                width: 26, height: 26,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
              onError={e => e.target.style.display = "none"}
            />
            {r.label}
            <span style={{ fontSize: 8, marginLeft: 1 }}>▾</span>
          </a>
        ))}
      </div>

      {/* ── 3. BARRA DE NAVEGACIÓN PRINCIPAL ITZ ── */}
      <div style={{
        background: "#1B396A",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        gap: 2,
        overflowX: "auto",
        scrollbarWidth: "none",
        maxHeight: expanded ? "60px" : "0px",
        transition: "max-height 0.3s ease",
        overflow: "hidden",
      }}>
        <img
          src="/logos/logo-itz-blanco.png"
          alt="TecNM — Instituto Tecnológico de Zacatecas"
          style={{ height: 36, marginRight: 8, flexShrink: 0 }}
          onError={e => e.target.style.display = "none"}
        />

        {/* ── Ícono Home con dropdown ── */}
        <div
          style={{ position: "relative", flexShrink: 0 }}
          onMouseEnter={() => setHomeOpen(true)}
          onMouseLeave={() => setHomeOpen(false)}
        >
          <a href="/"
            aria-label="Inicio"
            style={{
              padding: "11px 10px", textDecoration: "none",
              display: "flex", alignItems: "center", flexShrink: 0,
            }}>
            <IconHome size={18} />
          </a>

          {homeOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              borderTop: "3px solid #1c2b6b",
              minWidth: 160,
              zIndex: 999,
            }}>
              {HOME_MENU.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "10px 16px",
                    fontSize: 13,
                    color: "#1c2b6b",
                    textDecoration: "none",
                    fontWeight: 500,
                    borderBottom: "1px solid #f0f0f0",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f7ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

       
        {NAV.map(item => (
          <a key={item} href="#"
            style={{
              color: "rgba(255,255,255,.9)", fontSize: 12, fontWeight: 600,
              padding: "12px 9px", whiteSpace: "nowrap",
              textDecoration: "none", display: "flex", alignItems: "center", gap: 3,
              flexShrink: 0, letterSpacing: "0.02em", textTransform: "uppercase",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.9)"}>
            {item} <span style={{ fontSize: 8 }}>▾</span>
          </a>
        ))}
      </div>

    </header>
  );
}