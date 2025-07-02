import React, { useState, useEffect } from "react";
import "./App.css";
import MemeEditor from "./MemeEditor";
import { createClient } from "@supabase/supabase-js";

// Supabase client init (PUBLIC_INTERFACE)
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || "https://pyrpvfturylxekqkfjyr.supabase.co",
  process.env.REACT_APP_SUPABASE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cnB2ZnR1cnlseGVrcWtmanlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NzM2OTAsImV4cCI6MjA2NzA0OTY5MH0.vNZ-zwrM3bwVpgxk-A4qYahNSa0SD3zk69Q_etBHe5I"
);

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <header className="App-header" style={{ height: "auto", minHeight: "100vh" }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <h1
          style={{
            marginTop: "30px",
            marginBottom: "8px",
            color: "#1e88e5",
            fontWeight: "bold",
            fontSize: "2rem",
            letterSpacing: "1px"
          }}
        >
          Meme Generator
        </h1>
        <div
          style={{
            width: "100%",
            maxWidth: 1000,
            margin: "0 auto",
            background: "var(--bg-primary)",
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(30,136,229,0.08)",
            padding: 24,
            marginBottom: 40
          }}
        >
          <MemeEditor />
        </div>
        <p style={{ color: "#43a047", marginTop: 16 }}>Made with Supabase & React</p>
      </header>
    </div>
  );
}

export default App;
