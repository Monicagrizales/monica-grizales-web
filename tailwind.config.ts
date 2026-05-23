import { useState } from "react";

const palette = {
  malva: {
    50:  { hex: "#fff6f0", label: "malva-50" },
    100: { hex: "#ffedd3", label: "malva-100" },
    200: { hex: "#f2d1ae", label: "malva-200" },
    300: { hex: "#fd9139", label: "malva-300" },
    400: { hex: "#f28042", label: "malva-400" },
    500: { hex: "#e86f38", label: "malva-500" },
    600: { hex: "#cc5a25", label: "malva-600" },
    700: { hex: "#a14318", label: "malva-700" },
    800: { hex: "#752e0e", label: "malva-800" },
    900: { hex: "#4a1b05", label: "malva-900" },
  },
  ciruela: {
    50:  { hex: "#f6f3f8", label: "ciruela-50" },
    100: { hex: "#eddfe9", label: "ciruela-100" },
    200: { hex: "#dac9ed", label: "ciruela-200" },
    300: { hex: "#c2add7", label: "ciruela-300" },
    400: { hex: "#aa91c1", label: "ciruela-400" },
    500: { hex: "#9667ad", label: "ciruela-500" },
    600: { hex: "#7e5294", label: "ciruela-600" },
    700: { hex: "#663f7a", label: "ciruela-700" },
    800: { hex: "#4f2d5e", label: "ciruela-800" },
    900: { hex: "#381c44", label: "ciruela-900" },
  },
  arena: {
    50:  { hex: "#faf9f8", label: "arena-50" },
    100: { hex: "#f5f2ee", label: "arena-100" },
    200: { hex: "#ebe7e1", label: "arena-200" },
    300: { hex: "#ded9d0", label: "arena-300" },
    400: { hex: "#c7bfb4", label: "arena-400" },
    500: { hex: "#aba195", label: "arena-500" },
    600: { hex: "#8c8276", label: "arena-600" },
    700: { hex: "#70675c", label: "arena-700" },
    800: { hex: "#544d45", label: "arena-800" },
    900: { hex: "#3b3630", label: "arena-900" },
  },
  humo: {
    50:  { hex: "#f7f7f8", label: "humo-50" },
    100: { hex: "#eeeff1", label: "humo-100" },
    200: { hex: "#d8dadf", label: "humo-200" },
    300: { hex: "#b5b9c3", label: "humo-300" },
    400: { hex: "#8d93a1", label: "humo-400" },
    500: { hex: "#6c7281", label: "humo-500" },
    600: { hex: "#545967", label: "humo-600" },
    700: { hex: "#404450", label: "humo-700" },
    800: { hex: "#2a2d36", label: "humo-800" },
    900: { hex: "#171921", label: "humo-900" },
  },
};

const tailwindConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        malva: {
          50:  "#fff6f0",
          100: "#ffedd3",
          200: "#f2d1ae",
          300: "#fd9139",
          400: "#f28042",
          500: "#e86f38",
          600: "#cc5a25",
          700: "#a14318",
          800: "#752e0e",
          900: "#4a1b05",
        },
        ciruela: {
          50:  "#f6f3f8",
          100: "#eddfe9",
          200: "#dac9ed",
          300: "#c2add7",
          400: "#aa91c1",
          500: "#9667ad",
          600: "#7e5294",
          700: "#663f7a",
          800: "#4f2d5e",
          900: "#381c44",
        },
        arena: {
          50:  "#faf9f8",
          100: "#f5f2ee",
          200: "#ebe7e1",
          300: "#ded9d0",
          400: "#c7bfb4",
          500: "#aba195",
          600: "#8c8276",
          700: "#70675c",
          800: "#544d45",
          900: "#3b3630",
        },
        humo: {
          50:  "#f7f7f8",
          100: "#eeeff1",
          200: "#d8dadf",
          300: "#b5b9c3",
          400: "#8d93a1",
          500: "#6c7281",
          600: "#545967",
          700: "#404450",
          800: "#2a2d36",
          900: "#171921",
        },
      },
      fontFamily: {
        sans: ["var(--font-yoonche)", "YDYoonche UL", "var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-soft": "linear-gradient(135deg, #f6f3f8 0%, #eddfe9 50%, #faf9f8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;`;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function ContrastBadge({ hex }) {
  const onWhite = getContrastRatio(hex, "#ffffff");
  const onBlack = getContrastRatio(hex, "#000000");
  const best = Math.max(onWhite, onBlack);
  const label = best >= 7 ? "AAA" : best >= 4.5 ? "AA" : best >= 3 ? "AA lg" : "✗";
  const color = best >= 4.5 ? "#16a34a" : best >= 3 ? "#ca8a04" : "#dc2626";
  return (
    <span style={{
      fontSize: "9px",
      fontWeight: 700,
      color,
      background: "rgba(255,255,255,0.85)",
      borderRadius: "3px",
      padding: "1px 4px",
      letterSpacing: "0.05em",
    }}>
      {label}
    </span>
  );
}

function ColorSwatch({ hex, label, onClick, copied }) {
  const lum = getLuminance(hex);
  const textColor = lum > 0.35 ? "#2a2d36" : "#f7f7f8";

  return (
    <div
      onClick={() => onClick(hex)}
      title={`Copiar ${hex}`}
      style={{
        background: hex,
        flex: 1,
        minWidth: 0,
        cursor: "pointer",
        padding: "10px 6px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        transition: "transform 0.15s, box-shadow 0.15s",
        position: "relative",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scaleY(1.06)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scaleY(1)"}
    >
      <span style={{ fontSize: "9px", fontWeight: 700, color: textColor, opacity: 0.7, letterSpacing: "0.04em" }}>
        {label.split("-")[1]}
      </span>
      <span style={{ fontSize: "9px", fontFamily: "monospace", color: textColor, opacity: copied ? 1 : 0.85 }}>
        {copied ? "✓" : hex}
      </span>
      <ContrastBadge hex={hex} />
    </div>
  );
}

function PaletteRow({ name, swatches, onCopy, copiedHex }) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#2a2d36", minWidth: "64px", letterSpacing: "0.03em" }}>
          {displayName}
        </span>
        <span style={{ fontSize: "11px", color: "#8c8276" }}>
          {Object.values(swatches).length} tonos
        </span>
      </div>
      <div style={{ display: "flex", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        {Object.entries(swatches).map(([key, { hex, label }]) => (
          <ColorSwatch
            key={key}
            hex={hex}
            label={label}
            onClick={onCopy}
            copied={copiedHex === hex}
          />
        ))}
      </div>
    </div>
  );
}

function PreviewSection() {
  return (
    <div style={{ marginTop: "32px", borderTop: "1px solid #ebe7e1", paddingTop: "24px" }}>
      <p style={{ fontSize: "12px", fontWeight: 700, color: "#8c8276", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
        Vista previa de uso
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        {/* Botón primario */}
        <button style={{ background: "#9667ad", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em" }}>
          Botón ciruela
        </button>
        {/* Botón acento */}
        <button style={{ background: "#e86f38", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          Botón malva
        </button>
        {/* Botón outline */}
        <button style={{ background: "transparent", color: "#9667ad", border: "2px solid #9667ad", borderRadius: "8px", padding: "9px 20px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          Outline
        </button>
        {/* Badge */}
        <span style={{ background: "#dac9ed", color: "#663f7a", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600 }}>
          Badge lavanda
        </span>
        <span style={{ background: "#f2d1ae", color: "#a14318", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600 }}>
          Badge durazno
        </span>
      </div>

      {/* Card ejemplo */}
      <div style={{ background: "linear-gradient(135deg, #f6f3f8 0%, #eddfe9 50%, #faf9f8 100%)", borderRadius: "12px", padding: "20px", border: "1px solid #dac9ed" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
          <div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#381c44", margin: 0 }}>Título de tarjeta</p>
            <p style={{ fontSize: "12px", color: "#7e5294", margin: "2px 0 0" }}>Subtítulo en ciruela</p>
          </div>
          <span style={{ background: "#e86f38", color: "#fff", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: 700 }}>
            Nuevo
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "#545967", margin: "0 0 14px", lineHeight: 1.6 }}>
          Así se ve el texto de cuerpo usando <strong style={{ color: "#171921" }}>humo-900</strong> sobre el fondo degradado suave.
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{ background: "#9667ad", color: "#fff", border: "none", borderRadius: "6px", padding: "7px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", flex: 1 }}>
            Acción principal
          </button>
          <button style={{ background: "transparent", color: "#8c8276", border: "1px solid #c7bfb4", borderRadius: "6px", padding: "7px 16px", fontSize: "12px", cursor: "pointer", flex: 1 }}>
            Secundaria
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaletaColores() {
  const [copiedHex, setCopiedHex] = useState(null);
  const [activeTab, setActiveTab] = useState("paleta");

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#faf9f8",
      display: "flex",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "Georgia, serif",
    }}>
      <div style={{ width: "100%", maxWidth: "780px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#381c44", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
            Sistema de color
          </h1>
          <p style={{ fontSize: "13px", color: "#8c8276", margin: 0 }}>
            Haz clic en cualquier swatch para copiar el hex · Los badges indican nivel de contraste WCAG
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "#ebe7e1", borderRadius: "8px", padding: "4px" }}>
          {["paleta", "código"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "7px",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                background: activeTab === tab ? "#fff" : "transparent",
                color: activeTab === tab ? "#381c44" : "#8c8276",
                boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
              }}
            >
              {tab === "paleta" ? "🎨 Paleta" : "{ } Tailwind config"}
            </button>
          ))}
        </div>

        {activeTab === "paleta" ? (
          <>
            {Object.entries(palette).map(([name, swatches]) => (
              <PaletteRow
                key={name}
                name={name}
                swatches={swatches}
                onCopy={handleCopy}
                copiedHex={copiedHex}
              />
            ))}
            <PreviewSection />
          </>
        ) : (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => handleCopy(tailwindConfig)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: copiedHex === tailwindConfig ? "#9667ad" : "#eddfe9",
                color: copiedHex === tailwindConfig ? "#fff" : "#663f7a",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                zIndex: 1,
                transition: "all 0.2s",
              }}
            >
              {copiedHex === tailwindConfig ? "✓ Copiado" : "Copiar"}
            </button>
            <pre style={{
              background: "#171921",
              color: "#dac9ed",
              borderRadius: "10px",
              padding: "20px",
              fontSize: "11.5px",
              lineHeight: 1.7,
              overflowX: "auto",
              fontFamily: "monospace",
              margin: 0,
            }}>
              <code>{tailwindConfig}</code>
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}
