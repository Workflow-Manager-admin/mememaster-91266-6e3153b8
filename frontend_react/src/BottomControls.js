import React from "react";

/**
 * BottomControls
 * Download as PNG/JPEG and Reset actions for Meme Generator (PUBLIC_INTERFACE).
 */
const BottomControls = ({ onDownload, onReset, disabled }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      gap: 20,
      marginTop: 21,
      justifyContent: "center"
    }}
  >
    <button
      style={{
        padding: "10px 28px",
        fontSize: 16,
        fontWeight: 700,
        background: "#43a047",
        color: "#fff",
        borderRadius: 6,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      }}
      onClick={() => onDownload("png")}
      disabled={disabled}
    >
      Download PNG
    </button>
    <button
      style={{
        padding: "10px 20px",
        fontSize: 16,
        fontWeight: 700,
        background: "#1e88e5",
        color: "#fff",
        borderRadius: 6,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1
      }}
      onClick={() => onDownload("jpeg")}
      disabled={disabled}
    >
      Download JPEG
    </button>
    <button
      style={{
        padding: "10px 20px",
        fontSize: 15,
        fontWeight: 500,
        background: "#fbc02d",
        color: "#222",
        borderRadius: 6,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.65 : 1,
        marginLeft: 20
      }}
      onClick={() => onReset()}
      disabled={disabled}
    >
      Reset
    </button>
  </div>
);

export default BottomControls;
