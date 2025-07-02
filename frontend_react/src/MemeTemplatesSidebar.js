import React, { useState, useEffect } from "react";
import { supabase } from "./App";
import { useDropzone } from "react-dropzone";

// Some meme templates (you can add more!)
const defaultTemplates = [
  // CC images or placeholders
  "https://i.imgflip.com/1ur9b0.jpg",
  "https://i.imgflip.com/26am.jpg",
  "https://i.imgflip.com/345v97.jpg",
  "https://i.imgflip.com/2gmz3t.jpg",
  "https://i.imgflip.com/9ehk.jpg",
];

// PUBLIC_INTERFACE
/**
 * MemeTemplatesSidebar
 * Shows meme templates from a static list and fetches any Supabase templates.
 * Allows user to upload custom images.
 */
const MemeTemplatesSidebar = ({ onTemplateSelect, onImageUpload }) => {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [loading, setLoading] = useState(false);

  // Fetch templates from Supabase (if any)
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("meme_templates")
          .select("url")
          .limit(10);
        if (!error && data) {
          setTemplates([
            ...defaultTemplates,
            ...data.map((t) => t.url)
              .filter((url) => !!url)
          ]);
        }
      } catch {
        /* Fallback to defaults */
      }
      setLoading(false);
    };
    // Do not block UI on error.
    fetchTemplates();
    // eslint-disable-next-line
  }, []);

  // Handle upload
  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles[0]) return;
    const file = acceptedFiles[0];
    // Optional: upload to Supabase Storage or just use local preview
    const url = URL.createObjectURL(file);
    onImageUpload(url);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    maxFiles: 1
  });

  return (
    <aside
      style={{
        width: 170,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        padding: "8px 0"
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 5 }}>Templates</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 10
        }}
      >
        {loading ? <span style={{ color: "#1e88e5" }}>Loading...</span> : null}
        {templates.map((url, i) => (
          <button
            key={url + i}
            style={{
              border: "none",
              background: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer"
            }}
            onClick={() => onTemplateSelect(url)}
          >
            <img
              src={url}
              alt="meme-template"
              style={{
                width: 135,
                height: 80,
                objectFit: "cover",
                borderRadius: 6,
                border: "2px solid #e9ecef"
              }}
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <div
        {...getRootProps()}
        style={{
          marginTop: 15,
          border: "2px dashed #43a047",
          borderRadius: 7,
          width: 145,
          minHeight: 60,
          padding: "7px 4px",
          background: isDragActive ? "#e3f7ea" : "#fcfcfc",
          color: "#43a047",
          textAlign: "center",
          fontSize: 14,
          cursor: "pointer"
        }}
      >
        <input {...getInputProps()} />
        {isDragActive
          ? "Drop image here..."
          : <>Upload Image</>}
      </div>
    </aside>
  );
};

export default MemeTemplatesSidebar;
