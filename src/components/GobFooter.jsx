import { useState } from "react";

/* ── Íconos redes sociales SVG ── */
function IconFacebook({ size = 22, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconX({ size = 22, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.53 3h3.47l-7.59 8.67L22 21h-6.99l-4.87-6.37L4.5 21H1l8.1-9.26L2 3h7.16l4.4 5.75L17.53 3zM16.5 19h1.93L7.58 5H5.52L16.5 19z" />
    </svg>
  );
}

function IconInstagram({ size = 22, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

function IconYoutube({ size = 22, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#98989A" />
    </svg>
  );
}

function IconStar({ size = 32, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

const ENLACES = [
  { label: "Datos abiertos de la SABG",            href: "#" },
  { label: "Marco Jurídico",                        href: "#" },
  { label: "Plataforma Nacional de Transparencia",  href: "#" },
  { label: "Transparencia para el pueblo",          href: "#" },
  { label: "Alerta",                                href: "#" },
];

const QUE_ES = [
  { label: "Portal de datos abiertos",     href: "#" },
  { label: "Declaración de accesibilidad", href: "#" },
  { label: "Términos y Condiciones",       href: "#" },
];

const REDES = [
  { icon: IconFacebook,  href: "https://www.facebook.com/gobmx", label: "Facebook" },
  { icon: IconX,         href: "https://twitter.com/GobiernoMX",  label: "X (Twitter)" },
  { icon: IconInstagram, href: "#",                               label: "Instagram" },
  { icon: IconYoutube,   href: "#",                               label: "YouTube" },
];

const BG         = "#98989A";
const GOLD       = "rgba(98, 19, 51, .85)";
const LINK_COLOR = "rgba(98, 19, 51, .85)";
const LINK_HOVER = "rgba(255, 255, 255, .85)";

export default function GobFooter() {
  const [expanded, setExpanded]     = useState(false);
  const [hovered, setHovered]       = useState(null);
  const [redHovered, setRedHovered] = useState(null);

  return (
    <footer
      style={{
        fontFamily: "'Montserrat', 'Open Sans', Arial, sans-serif",
        display: "flex",
        flexDirection: "column-reverse",
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >

      {/* ── FRANJA INFERIOR ── Minimalista y sin línea guinda ni texto */}
      <div style={{
        background: BG,
        padding: "8px 40px",
        display: "flex",
        alignItems: "center",
      }}>
        <img
          src="/logos/escudo-gob.png"
          alt="Desplegar información del Gobierno"
          aria-hidden="true"
          style={{ height: 22, opacity: 0.7 }}
          onError={e => e.target.style.display = "none"}
        />
      </div>

      {/* ── PANEL EXPANDIBLE ── */}
      <div style={{
        background: BG,
        overflow: "hidden",
        maxHeight: expanded ? "350px" : "0px",
        transition: "max-height 0.35s ease",
      }}>
        <div style={{
          transform: expanded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          opacity: expanded ? 1 : 0,
          transformOrigin: "bottom center",
          transition: "transform 0.35s ease, opacity 0.25s ease",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr 1fr 1fr",
            gap: "32px",
            maxWidth: 1100,
            margin: "0 auto",
            padding: "36px 40px 28px",
            alignItems: "start",
          }}>

            {/* ── COLUMNA 1: Logo Gobierno de México ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
              <img
                src="/logos/escudo-gob.png"
                alt="Escudo Nacional"
                style={{ height: 64 }}
                onError={e => e.target.style.display = "none"}
              />
              <div style={{ color: GOLD, lineHeight: 1.2, marginTop: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 400 }}>Gobierno de</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>México</div>
              </div>
            </div>

            {/* ── COLUMNA 2: Enlaces ── */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: GOLD }}>
                Enlaces
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ENLACES.map((e, i) => (
                  <a key={e.label} href={e.href}
                    onMouseEnter={() => setHovered(`e-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      color: hovered === `e-${i}` ? LINK_HOVER : LINK_COLOR,
                      fontSize: 13, textDecoration: "none",
                      transition: "color 0.2s",
                    }}>
                    {e.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ── COLUMNA 3: ¿Qué es gob.mx? ── */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: GOLD }}>
                ¿Qué es gob.mx?
              </div>
              <p style={{ fontSize: 13, color: LINK_COLOR, lineHeight: 1.6, margin: "0 0 16px 0" }}>
                Es el portal único de trámites, información y participación ciudadana.{" "}
                <a href="#" style={{ color: GOLD, textDecoration: "underline" }}>Leer más</a>
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {QUE_ES.map((e, i) => (
                  <a key={e.label} href={e.href}
                    onMouseEnter={() => setHovered(`q-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      color: hovered === `q-${i}` ? LINK_HOVER : LINK_COLOR,
                      fontSize: 13, textDecoration: "none",
                      transition: "color 0.2s",
                    }}>
                    {e.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ── COLUMNA 4: Denuncia + Redes + 079 ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a href="#"
                onMouseEnter={() => setHovered("denuncia")}
                onMouseLeave={() => setHovered(null)}
                style={{
                  color: hovered === "denuncia" ? LINK_HOVER : LINK_COLOR,
                  fontSize: 13, fontWeight: 700,
                  textDecoration: "underline",
                  transition: "color 0.2s",
                }}>
                Denuncia contra servidores públicos
              </a>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: GOLD }}>
                  Síguenos en
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  {REDES.map((r, i) => (
                    <a key={r.label} href={r.href} aria-label={r.label}
                      onMouseEnter={() => setRedHovered(i)}
                      onMouseLeave={() => setRedHovered(null)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 36, height: 36,
                        borderRadius: "50%",
                        background: redHovered === i ? "rgba(98,19,51,0.3)" : "rgba(98,19,51,0.15)",
                        transition: "background 0.2s",
                        textDecoration: "none",
                      }}>
                      <r.icon size={18} color={GOLD} />
                    </a>
                  ))}
                </div>
              </div>

              {/* 079 */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 40, height: 40,
                  borderRadius: "50%",
                  background: "rgba(98,19,51,0.15)",
                  flexShrink: 0,
                }}>
                  <IconStar size={22} color={GOLD} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 26, fontWeight: 700, color: GOLD }}>079</span>
                  <span style={{ fontSize: 11, color: LINK_COLOR, lineHeight: 1.3 }}>
                    Comunícate, estamos<br />para ayudarte
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}