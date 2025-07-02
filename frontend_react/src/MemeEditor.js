import React, { useState, useRef } from "react";
import MemeTemplatesSidebar from "./MemeTemplatesSidebar";
import MemeCanvas from "./MemeCanvas";
import TextOverlayToolbar from "./TextOverlayToolbar";
import StickerEmojiPicker from "./StickerEmojiPicker";
import BottomControls from "./BottomControls";

// PUBLIC_INTERFACE
/**
 * MemeEditor
 * The main component providing meme editing UI: template picker, image upload,
 * text overlays, stickers/emojis, drag/drop/resize, preview, and actions.
 */
const MemeEditor = () => {
  // States
  const [baseImage, setBaseImage] = useState(null); // uploaded or template image
  const [overlays, setOverlays] = useState([]); // text and sticker overlays
  const [activeOverlay, setActiveOverlay] = useState(null); // id of currently selected overlay
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const canvasRef = useRef();

  // Handle template chosen
  const handleTemplateSelect = (imgUrl) => {
    setBaseImage(imgUrl);
    setOverlays([]);
    setActiveOverlay(null);
  };

  // Handle image upload
  const handleImageUpload = (imgUrl) => {
    setBaseImage(imgUrl);
    setOverlays([]);
    setActiveOverlay(null);
  };

  // Add text overlay
  const handleAddText = (overlayConfig) => {
    setOverlays((ov) => [
      ...ov,
      {
        type: "text",
        ...overlayConfig,
        id: `text-${Date.now()}`
      }
    ]);
  };

  // Update overlay
  const handleOverlayUpdate = (id, update) => {
    setOverlays((prev) =>
      prev.map((ov) => (ov.id === id ? { ...ov, ...update } : ov))
    );
  };

  // Add sticker/emoji
  const handleAddSticker = (emojiOrUrl) => {
    setOverlays((ov) => [
      ...ov,
      {
        type: "sticker",
        value: emojiOrUrl,
        x: 80,
        y: 80,
        scale: 1,
        rotation: 0,
        id: `sticker-${Date.now()}`
      }
    ]);
    setShowEmojiPicker(false);
  };

  // Move overlay (drag)
  const handleMoveOverlay = (id, x, y) => {
    setOverlays((prev) =>
      prev.map((ov) => (ov.id === id ? { ...ov, x, y } : ov))
    );
  };

  // Remove overlay
  const handleRemoveOverlay = (id) => {
    setOverlays((prev) => prev.filter((ov) => ov.id !== id));
    if (activeOverlay === id) setActiveOverlay(null);
  };

  // Reset meme
  const handleReset = () => {
    setBaseImage(null);
    setOverlays([]);
    setActiveOverlay(null);
  };

  // Download meme
  const handleDownload = (format = "png") => {
    if (!canvasRef.current) return;
    // exports canvas to PNG/JPEG using html2canvas
    import("html2canvas").then(({ default: html2canvas }) => {
      html2canvas(canvasRef.current, { useCORS: true }).then((canvas) => {
        canvas.toBlob((blob) => {
          import("file-saver").then(({ saveAs }) => {
            saveAs(blob, `meme.${format}`);
          });
        }, `image/${format}`);
      });
    });
  };

  const handleOverlaySelect = (id) => setActiveOverlay(id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 18,
        width: "100%"
      }}
    >
      <MemeTemplatesSidebar
        onTemplateSelect={handleTemplateSelect}
        onImageUpload={handleImageUpload}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <MemeCanvas
          baseImage={baseImage}
          overlays={overlays}
          setActiveOverlay={handleOverlaySelect}
          activeOverlay={activeOverlay}
          onMoveOverlay={handleMoveOverlay}
          onRemoveOverlay={handleRemoveOverlay}
          canvasRef={canvasRef}
        />
        <BottomControls
          onDownload={handleDownload}
          onReset={handleReset}
          disabled={!baseImage}
        />
      </div>
      <div style={{ minWidth: 210, display: "flex", flexDirection: "column", gap: 16 }}>
        <TextOverlayToolbar
          onAddText={handleAddText}
          disabled={!baseImage}
        />
        <StickerEmojiPicker
          open={showEmojiPicker}
          setOpen={setShowEmojiPicker}
          onSelect={handleAddSticker}
          disabled={!baseImage}
        />
        <button
          type="button"
          style={{
            marginTop: 8,
            background: "#43a047",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 6,
            padding: "8px 12px",
            cursor: baseImage ? "pointer" : "not-allowed",
            opacity: baseImage ? 1 : 0.5
          }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          disabled={!baseImage}
        >
          {showEmojiPicker ? "Hide Stickers/Emoji" : "Add Sticker / Emoji"}
        </button>
      </div>
    </div>
  );
};

export default MemeEditor;
