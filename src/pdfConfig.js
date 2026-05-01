import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import worker from "pdfjs-dist/legacy/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

export default pdfjsLib;