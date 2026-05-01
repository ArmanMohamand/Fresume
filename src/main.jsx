import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import * as pdfjsLib from "pdfjs-dist";

// ✅ Vite-safe worker setup (no import needed)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
