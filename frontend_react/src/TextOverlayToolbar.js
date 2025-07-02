import React, { useState } from "react";

/**
 * TextOverlayToolbar
 * UI to add text with style (font, color, size, bold) on meme.
 */
const fonts = [
  "Impact, Arial Black, sans-serif",
  "Comic Sans MS, cursive, sans-serif",
  "Arial, Helvetica, sans-serif",
  "Roboto, sans-serif",
  "Georgia, serif"
];

const colors = [
  "#ffffff", "#1e88e5", "#fbc02d", "#43a047", "#000000", "#ff1744", "#ba68c8"
];

// PUBLIC_INTERFACE
const TextOverlayToolbar = ({ onAddText, disabled }) => {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState(38);
  const [color, setColor] = useState("#fff");
  const [fontWeight, setFontWeight] = useState("bold");
  const [bgColor, setBgColor] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddText({
      text,
      fontFamily,
      fontSize,
      color,
      fontWeight,
      bgColor,
      x: 120,
      y: 92
    });
    setText("");
  };

  return (
    <section
      style={{
        border: "1px solid #e9ecef",
        borderRadius: 6,
        padding: 10,
        background: "#fff",
        boxShadow: "0 0.5px 2px rgba(30,136,229,0.08)"
      }}
    >
      <div
        style={{ marginBottom: 7, fontWeight: 500, color: "#1e88e5" }}
      >
        Add Meme Text
      </div>
      <input
        style={{
          marginBottom: 7,
          width: "90%",
          borderRadius: 4,
          fontSize: 15,
          padding: "3px 7px"
        }}
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength={60}
        placeholder="Top or bottom text"
        disabled={disabled}
      />
      <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
        <select
          value={fontFamily}
          onChange={e => setFontFamily(e.target.value)}
          disabled={disabled}
          style={{
            fontSize: 13,
            borderRadius: 3,
            background: "#f8f9fa"
          }}
        >
          {fonts.map((font) => (
            <option key={font} value={font}>{font.slice(0, 12)}…</option>
          ))}
        </select>
        <input
          type="number"
          min={18}
          max={90}
          value={fontSize}
          style={{ width: 50, borderRadius: 3 }}
          onChange={e => setFontSize(Number(e.target.value))}
          disabled={disabled}
        />
        <select
          value={fontWeight}
          onChange={e => setFontWeight(e.target.value)}
          style={{ fontSize: 13, borderRadius: 3 }}
          disabled={disabled}
        >
          <option value="normal">normal</option>
          <option value="bold">bold</option>
        </select>
        <select
          value={color}
          onChange={e => setColor(e.target.value)}
          disabled={disabled}
          style={{ background: color, color: "#000", borderRadius: 3, marginLeft: 4 }}
        >
          {colors.map((c) => (
            <option key={c} style={{ background: c, color: "#111" }} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="color"
          value={bgColor}
          onChange={e => setBgColor(e.target.value)}
          disabled={disabled}
          style={{ width: 24, height: 22, border: "none" }}
          title="Background color"
        />
      </div>
      <button
        style={{
          padding: "5px 12px",
          color: "#fff",
          background: "#1e88e5",
          fontWeight: 700,
          border: "none",
          borderRadius: 6,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1
        }}
        onClick={handleAdd}
        disabled={disabled}
      >
        Add Text
      </button>
    </section>
  );
};

export default TextOverlayToolbar;
