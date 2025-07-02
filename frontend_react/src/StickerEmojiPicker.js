import React from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

/**
 * StickerEmojiPicker
 * Emoji-mart v5 React picker for emojis/stickers (PUBLIC_INTERFACE).
 */
const StickerEmojiPicker = ({ open, setOpen, onSelect, disabled }) => {
  if (!open) return null;
  return (
    <div
      style={{
        marginTop: 8,
        marginBottom: 8,
        zIndex: 32
      }}
    >
      <Picker
        data={data}
        theme="light"
        emojiSize={28}
        previewPosition="none"
        skinTonePosition="none"
        onEmojiSelect={emoji => onSelect(emoji.native)}
        style={{ borderRadius: 8 }}
      />
    </div>
  );
};
export default StickerEmojiPicker;
