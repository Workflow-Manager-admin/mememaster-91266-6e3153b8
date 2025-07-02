import React from "react";
import Draggable from "react-draggable";
import { Rnd } from "react-rnd";

// Fallback: use simple Draggable for stickers. Rnd can be used for more advanced resizable/rotate overlays if desired.

/**
 * MemeCanvas
 * Renders meme base image and all overlays; supports drag, removal, and selection.
 * @param {Object} props
 */
const MEME_CANVAS_WIDTH = 540, MEME_CANVAS_HEIGHT = 540;

const MemeCanvas = ({
  baseImage,
  overlays,
  setActiveOverlay,
  activeOverlay,
  onMoveOverlay,
  onRemoveOverlay,
  canvasRef
}) => {
  return (
    <div
      ref={canvasRef}
      id="meme-canvas"
      style={{
        width: MEME_CANVAS_WIDTH,
        height: MEME_CANVAS_HEIGHT,
        position: "relative",
        background: "#eee",
        border: "2px solid #e9ecef",
        borderRadius: 10,
        margin: "0 auto",
        overflow: "hidden",
        boxShadow: "0 1px 8px rgba(43,160,71,0.08)"
      }}
    >
      {baseImage ? (
        <img
          src={baseImage}
          alt="Meme Base"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none"
          }}
        />
      ) : (
        <span
          style={{
            color: "#ccc",
            fontSize: 27,
            position: "absolute",
            top: "39%",
            width: "100%"
          }}
        >
          Choose a template or upload an image
        </span>
      )}
      {overlays.map((ov) =>
        ov.type === "text" ? (
          <Draggable
            key={ov.id}
            defaultPosition={{ x: ov.x || 90, y: ov.y || 90 }}
            position={ov.x !== undefined && ov.y !== undefined
              ? { x: ov.x, y: ov.y }
              : undefined}
            onStop={(_, data) =>
              onMoveOverlay(ov.id, data.x, data.y)
            }
            onStart={() => setActiveOverlay(ov.id)}
          >
            <div
              style={{
                position: "absolute",
                left: 0, top: 0,
                minWidth: 60,
                minHeight: 30,
                padding: "2px 3px",
                fontFamily: ov.fontFamily || "Impact, Arial, sans-serif",
                fontSize: ov.fontSize || 36,
                fontWeight: ov.fontWeight || "bold",
                color: ov.color || "#fff",
                textShadow:
                  "1.5px 1.5px 0 #222, -1.5px -1.5px 0 #111",
                cursor: "move",
                border: ov.id === activeOverlay ? "2px dashed #fbc02d" : "none",
                borderRadius: 6,
                userSelect: "none",
                background: ov.bgColor || "rgba(0,0,0,0)"
              }}
              tabIndex={0}
              onClick={() => setActiveOverlay(ov.id)}
              onDoubleClick={() => onRemoveOverlay(ov.id)}
              role="textbox"
              aria-label="meme text"
            >
              {ov.text}
            </div>
          </Draggable>
        ) : ov.type === "sticker" ? (
          <Draggable
            key={ov.id}
            defaultPosition={{ x: ov.x || 50, y: ov.y || 50 }}
            position={ov.x !== undefined && ov.y !== undefined
              ? { x: ov.x, y: ov.y }
              : undefined}
            onStop={(_, data) =>
              onMoveOverlay(ov.id, data.x, data.y)
            }
            onStart={() => setActiveOverlay(ov.id)}
          >
            <div
              style={{
                fontSize: 42 * (ov.scale || 1),
                cursor: "grab",
                position: "absolute",
                left: 0, top: 0,
                border: ov.id === activeOverlay ? "2px solid #fbc02d" : "none",
                borderRadius: 7,
                userSelect: "none"
              }}
              onClick={() => setActiveOverlay(ov.id)}
              onDoubleClick={() => onRemoveOverlay(ov.id)}
              tabIndex={0}
            >
              {/* emoji or sticker url */}
              {ov.value.startsWith("http") ? (
                <img
                  src={ov.value}
                  alt="emoji-sticker"
                  style={{
                    width: 44 * (ov.scale || 1),
                    height: 44 * (ov.scale || 1),
                    objectFit: "contain"
                  }}
                />
              ) : (
                <span>{ov.value}</span>
              )}
            </div>
          </Draggable>
        ) : null
      )}
    </div>
  );
};

export default MemeCanvas;
