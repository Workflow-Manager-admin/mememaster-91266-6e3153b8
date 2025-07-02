import React from "react";
import { Picker } from "emoji-mart";

/**
 * StickerEmojiPicker
 * emoji-mart v3 Picker for emojis/stickers (PUBLIC_INTERFACE).
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
        set="apple"
        theme="light"
        emojiSize={28}
        showPreview={false}
        showSkinTones={false}
        onSelect={emoji => onSelect(emoji.native)}
        style={{ borderRadius: 8 }}
        title="Pick an emoji"
      />
    </div>
  );
};
export default StickerEmojiPicker;
