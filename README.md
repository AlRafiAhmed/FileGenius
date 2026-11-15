# FileGenius — Client-Side File Utility Platform

**FileGenius** is a modern, high-performance, 100% frontend-only file utility suite. It provides 29 professional tools for editing images, manipulating PDF documents, and converting data formats—**executed entirely inside the visitor's web browser**.

---

## 🔒 Privacy & Architecture Overview

Traditional file utility websites upload your private photos, legal contracts, and financial spreadsheets to remote servers or cloud buckets for processing. 

**FileGenius eliminates this security risk completely:**
- **Zero Server Uploads:** Files are read directly into browser memory using HTML5 `FileReader`, Canvas 2D, and WebAssembly.
- **Zero Backend Required:** No PHP, Node.js, Python, or database servers.
- **Zero Account Creation:** No login, registration, tracking cookies, or user history.
- **Complete Privacy:** Files never leave your local machine or traverse the network.
- **Offline Capable:** Once loaded, operations function even without an active internet connection.

---

## 🛠️ Technology Stack

- **Markup & Layout:** HTML5 Semantic Markup
- **Styling & Theming:** Tailwind CSS with comprehensive Class-Based Dark/Light Theme System
- **Core Engine:** Vanilla JavaScript (ES6+), Web Workers, and Web APIs (Canvas 2D, Web Crypto API, TypedArrays, Blob, FileReader)
- **Local Client Libraries:**
  - `pdf-lib` (v1.17.1): Browser-side PDF generation, page merging, splitting, watermarking, and rotation.
  - `pdf.js` (v3.11.174): High-fidelity client-side PDF rendering, thumbnail extraction, and selectable text parsing.
  - `jszip` (v3.10.1): In-memory ZIP archive generation, DEFLATE compression, and multi-file extraction.
  - `papaparse` (v5.4.1): Robust in-browser CSV parsing, RFC-4180 delimiter handling, dynamic typing, and unparsing.
  - `marked` (v11.1.1): Fast Markdown parser with custom DOMParser sanitization.
  - `mammoth.js` (v1.6.0): Client-side DOCX document extraction and structural HTML translation.
  - `spark-md5` (v3.0.2): Fast ArrayBuffer MD5 cryptographic checksum generation.
  - `Font Awesome` (v6.4.0): Crisp vector iconography with local webfonts.

All libraries are hosted locally in `libraries/` and `assets/libraries/` to guarantee zero third-party telemetry, zero external CDN dependencies, and offline resilience.

---

## 📂 Project Structure

```
FileGenius/
│
├── index.html                  # Main landing page with tool grid, search, and category filters
├── contact.html                # Professional administrator contact page with theme support
├── README.md                   # Comprehensive platform documentation
├── TESTING_REPORT.md           # 100% Passed QA Verification Matrix
│
├── assets/
│   ├── css/
│   │   └── style.css           # Custom styles (checkered patterns, drag-over animations, scrollbars)
│   ├── js/
│   │   ├── app.js              # Global initialization and connectivity listeners
│   │   ├── theme.js            # Theme manager (dark/light, localStorage persistence, FOUC prevention)
│   │   ├── navigation.js       # Mobile navigation drawer and interactive controls
│   │   ├── search.js           # Real-time search filter and category tab switcher
│   │   └── utils.js            # Reusable utilities (formatBytes, downloadBlob, SHA-256, sanitizeHtml)
│   └── webfonts/               # Font Awesome vector fonts
│
├── libraries/                  # Standalone client-side JS libraries (100% offline)
│   ├── tailwind.js
│   ├── pdf-lib.min.js
│   ├── pdf.min.js & pdf.worker.min.js
│   ├── jszip.min.js
│   ├── papaparse.min.js
│   ├── marked.min.js
│   ├── mammoth.browser.min.js
│   ├── spark-md5.min.js
│   └── font-awesome.min.css
│
├── operations/
│   ├── image/                  # Category A: 10 Image Tools
│   │   ├── image-resize.html
│   │   ├── image-compress.html
│   │   ├── image-convert.html
│   │   ├── image-crop.html
│   │   ├── image-rotate.html
│   │   ├── image-watermark.html
│   │   ├── image-background-remove.html
│   │   ├── passport-photo.html
│   │   ├── bulk-image-resize.html
│   │   └── image-to-pdf.html
│   │
│   ├── pdf/                    # Category B: 11 PDF Tools
│   │   ├── pdf-merge.html
│   │   ├── pdf-split.html
│   │   ├── pdf-compress.html
│   │   ├── pdf-rotate.html
│   │   ├── pdf-reorder.html
│   │   ├── pdf-delete-pages.html
│   │   ├── pdf-watermark.html
│   │   ├── pdf-extract-text.html
│   │   ├── pdf-to-jpg.html
│   │   ├── jpg-to-pdf.html
│   │   └── word-to-pdf.html
│   │
│   └── file/                   # Category C: 8 File and Data Tools
│       ├── file-zip.html
│       ├── file-unzip.html
│       ├── file-size-checker.html
│       ├── csv-to-json.html
│       ├── json-to-csv.html
│       ├── txt-to-pdf.html
│       ├── markdown-to-html.html
│       └── markdown-to-pdf.html
│
└── tests/
    └── data/                   # Real sample verification fixtures (PDF, JPG, PNG, DOCX, CSV, JSON, MD, TXT, ZIP)
```

---

## 📋 Comprehensive Tool Catalog (All 29 Operations)

### Category A: Image Tools (10)
1. **Image Resize (`operations/image/image-resize.html`)**: Resize JPG, PNG, and WebP by explicit pixel dimensions or percentage scaling with an aspect-ratio lock and real-time canvas preview.
2. **Image Compress (`operations/image/image-compress.html`)**: Interactive quality slider (0.1–1.0) and target KB estimator. Displays genuine before/after byte sizes and reduction ratios.
3. **Image Convert (`operations/image/image-convert.html`)**: Seamless client-side transcoding between JPG, PNG, and WebP with alpha transparency preservation.
4. **Image Crop (`operations/image/image-crop.html`)**: Interactive draggable and resizable crop selection with aspect ratio presets (1:1, 4:3, 16:9, 3:2, Freeform).
5. **Image Rotate (`operations/image/image-rotate.html`)**: Rotate 90°, 180°, 270° clockwise or counter-clockwise, with horizontal and vertical mirror flipping.
6. **Image Watermark (`operations/image/image-watermark.html`)**: Add custom text watermarks with customizable font size, color, opacity, and a 9-quadrant positioning grid.
7. **Image Background Remove (`operations/image/image-background-remove.html`)**: Client-side background extraction utilizing color sampling, tolerance controls, and flood-fill transparency algorithms.
8. **Passport Photo Maker (`operations/image/passport-photo.html`)**: Produces official biometric standards (US 2×2 inches, UK/EU 35×45 mm) with positioning zoom, single-photo export, and printable 2×2 photo grids on a 4×6-inch canvas.
9. **Bulk Image Resize (`operations/image/bulk-image-resize.html`)**: Process dozens of images simultaneously with per-file progress tracking, individual downloads, and bulk ZIP download.
10. **Image to PDF (`operations/image/image-to-pdf.html`)**: Package multiple images into a multi-page PDF with sequence reordering, A4/Letter formats, and orientation controls.

### Category B: PDF Tools (11)
11. **PDF Merge (`operations/pdf/pdf-merge.html`)**: Combine multiple PDF files into a single unified document with visual sequence reordering via `pdf-lib`.
12. **PDF Split (`operations/pdf/pdf-split.html`)**: Extract arbitrary page ranges (e.g. `1-3, 5, 8-10`) or explode the entire document into individual page PDFs bundled in a ZIP.
13. **PDF Compress (`operations/pdf/pdf-compress.html`)**: Genuine browser-side optimization leveraging object-stream repackaging and optional raster downsampling (150 DPI). Honest metric reporting without simulated compression.
14. **PDF Rotate (`operations/pdf/pdf-rotate.html`)**: Rotate all pages or specific page numbers by 90°, 180°, or 270° without raster quality loss.
15. **PDF Reorder (`operations/pdf/pdf-reorder.html`)**: Generates page thumbnails with PDF.js and lets users move pages left or right before saving the reorganized PDF.
16. **PDF Delete Pages (`operations/pdf/pdf-delete-pages.html`)**: Interactive page gallery allowing users to click and strike out unwanted pages, verifying at least one page remains before compiling.
17. **PDF Watermark (`operations/pdf/pdf-watermark.html`)**: Stamp diagonal or horizontal text watermarks with custom opacity, color, and font size across all document pages.
18. **PDF Extract Text (`operations/pdf/pdf-extract-text.html`)**: Uses PDF.js to extract all selectable textual content, displaying live character counts, clipboard copy, and `.txt` file export. Scanned document limitations clearly communicated.
19. **PDF to JPG (`operations/pdf/pdf-to-jpg.html`)**: High-resolution rendering of PDF pages to crisp JPEG images (150–300 DPI) with individual page downloads or one-click ZIP packaging.
20. **JPG to PDF (`operations/pdf/jpg-to-pdf.html`)**: Convert JPEG images into standard PDF documents with custom margins (None, Small, Normal) and page dimensions.
21. **Word to PDF (`operations/pdf/word-to-pdf.html`)**: Browser-compatible DOCX conversion using Mammoth.js to parse document headings, paragraphs, and tables into structured PDF pagination.

### Category C: File and Data Tools (8)
22. **File ZIP (`operations/file/file-zip.html`)**: In-memory archive creation for arbitrary files using JSZip with custom archive naming.
23. **File Unzip (`operations/file/file-unzip.html`)**: Inspects archive contents, defends against directory traversal (`..` path attacks), and extracts individual files or sanitized re-zipped bundles.
24. **File Size Checker (`operations/file/file-size-checker.html`)**: Instant byte-accurate measurement in Bytes, KB, MB, and GB, accompanied by cryptographic SHA-256 (Web Crypto) and MD5 (SparkMD5) checksums.
25. **CSV to JSON (`operations/file/csv-to-json.html`)**: Transmutes tabular CSV into formatted JSON with header toggles, type auto-detection, live preview, and one-click copy.
26. **JSON to CSV (`operations/file/json-to-csv.html`)**: Validates JSON objects/arrays, handles nested records, and produces RFC-4180 compliant CSV files.
27. **TXT to PDF (`operations/file/txt-to-pdf.html`)**: Multi-page text typesetter with automatic line wrapping, custom margins, page numbers, and standard A4/Letter dimensions.
28. **Markdown to HTML (`operations/file/markdown-to-html.html`)**: Live Markdown editor with side-by-side HTML preview, XSS sanitization (scripts and event handler stripping), and `.html` document export.
29. **Markdown to PDF (`operations/file/markdown-to-pdf.html`)**: Converts Markdown documents with headings, blockquotes, code blocks, and lists into paginated PDF documents.

---

## 🚀 How to Run & Deploy

Because FileGenius is completely static and frontend-only, **no build step, no npm install, and no backend configuration are required**.

### Running Locally
1. **Direct File Opening:**  
   Double-click `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
2. **Local HTTP Server:**  
   To enable cross-origin worker features (such as PDF.js web workers):
   ```bash
   # Using Python
   python -m http.server 8080

   # Or using Node
   npx serve .
   ```
   Navigate to `http://localhost:8080`.

### Deploying to Static Hosting Platforms
Deploying FileGenius is as simple as uploading the repository folder:

- **GitHub Pages:**
  1. Push this repository to GitHub.
  2. Go to **Settings** > **Pages**.
  3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
  4. Click **Save**. Your site is live!

- **Cloudflare Pages:**
  1. Connect your Git repository.
  2. Set **Build command** to empty.
  3. Set **Build output directory** to `/`.
  4. Click **Deploy**.

- **Netlify:**
  1. Drag and drop the `FileGenius` folder directly into the Netlify Drop dashboard, or connect the Git repository.
  2. Leave build commands blank; publish directory is `.`.

- **Vercel:**
  1. Import the repository.
  2. Select **Other** as the framework preset and deploy.

---

## 🎨 Theme System (Dark & Light Mode)

FileGenius features a comprehensive, class-based theme system:
- **Instant FOUC Prevention:** `theme.js` executes synchronously in the `<head>` before page rendering.
- **System Preference Detection:** Automatically detects `prefers-color-scheme: dark` on first visit.
- **Persistent State:** Saves your preference to `localStorage['filegenius_theme']`, persisting seamlessly across all 29 tools.
- **Accessible Contrast:** Custom color palettes ensure high contrast and readability in both modes.

---

## 💡 Technical Limitations & Browser Constraints

Operating 100% inside the browser provides unmatched privacy, with a few inherent technical boundaries:
1. **Browser Memory Caps:** Modern browsers limit single-tab memory allocation (typically 1.5GB–4GB). Very large files (>500MB) may encounter memory thresholds.
2. **Client-Side DOCX Conversion:** Mammoth.js translates document structure, headings, paragraphs, and tables. Advanced proprietary Microsoft Word features (smart art, macros, complex floating shapes) cannot be fully reconstructed without server-side LibreOffice.
3. **Scanned PDF OCR:** PDF.js extracts embedded selectable text. Scanned photo PDFs contain pixel data rather than font glyphs and require native OCR.
4. **PDF Compression Realities:** PDF files consisting entirely of already-compressed JPEG/PNG images cannot be losslessly reduced further. The compression tool explains this honestly rather than displaying fabricated numbers.

---

## 📄 License & Attribution

Designed and engineered for speed, privacy, and simplicity. Free to use for personal and commercial file management.
