# Phase 4: High-Fidelity Visualization & Page Assembly via Stitch

## Objective
Implement complex data-heavy charting components that blend seamlessly with the professional, vibrant-light UI/UX generated via Stitch MCP.

## Execution Steps
1. **Install Viz Libraries:**
   Run in PowerShell: `npm install plotly.js react-plotly.js wavesurfer.js d3`
   Install types: `npm install -D @types/plotly.js @types/react-plotly.js @types/d3`

2. **Themed Visualization Components:**
   Create the following components in `frontend\src\components\visualization\`. All Plotly charts must be stripped of their default generic styles. Inject the vibrant light theme (e.g., paper_bgcolor and plot_bgcolor set to `rgba(240, 249, 255, 1)` for `sky-50`) via the layout prop:
   - `Spectrogram.tsx`: Plotly Heatmap optimized for WebGL.
   - `PSDPlot.tsx`: Plotly Line chart with customized gridlines (subtle opacity, no harsh black lines).
   - `ConstellationDiagram.tsx`: Plotly Scatter plot mapping I vs Q components.
   - `WaveformPlot.tsx`: Configure WaveSurfer.js to use wave colors that match the bespoke Tailwind palette (e.g., primary brand color).

3. **Complex Upload Interface:**
   - Create `frontend\src\components\upload\FileDropzone.tsx`: Implement a drag-and-drop zone with professional micro-interactions (e.g., border color transition on drag-enter, subtle background tint shift).
   - Create `frontend\src\components\upload\MetadataForm.tsx`: Build the required form (Sample Rate, Center Frequency, Dtype) using the accessible Radix UI primitives created in Phase 3.

4. **Page Assembly (Stitch Layouts):**
   - Reference the structural wireframes provided by Stitch MCP to build `frontend\src\pages\Dashboard.tsx`, `UploadPage.tsx`, and `AnalysisResultPage.tsx`.
   - Ensure the overarching layout (`frontend\src\App.tsx`) utilizes a vibrant light-colored background (e.g., `bg-amber-50/50`) and a professional CSS grid/flexbox structure. Avoid edge-to-edge content; use proper max-width containers and generous padding (e.g., `max-w-7xl px-8 py-12`).
