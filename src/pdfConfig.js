import * as pdfjsLib from "pdfjs-dist";

// ✅ FORCE CDN WORKER (100% RELIABLE)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js";

export default pdfjsLib;