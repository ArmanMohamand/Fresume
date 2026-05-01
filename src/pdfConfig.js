import * as pdfjsLib from "pdfjs-dist";

// ✅ Vite-safe worker (FINAL FIX)
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export default pdfjsLib;