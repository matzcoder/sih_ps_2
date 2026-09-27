# SIGNAL-X // AI Signal Intelligence Platform

> **Smart India Hackathon (SIH) Prototype**  
> An autonomous signal intelligence command center and feature deconvolution platform for high-throughput analysis of `.IQ` and `.WAV` recordings.

---

## 🛰️ Project Overview

**SIGNAL-X** converts raw electromagnetic radio frequency (RF) and acoustic captures into actionable intelligence dossiers. It processes dual-channel In-Phase/Quadrature (`.IQ`) binary data streams and baseband audio (`.WAV`) files through an automated 8-stage digital signal processing (DSP) and machine learning pipeline:

```
Upload (.IQ / .WAV)
  → Preprocessing & Calibration
  → Feature Extraction (FFT, Cumulants, Entropy)
  → 7D Signal DNA Biometric Synthesis
  → Real-Time Anomaly Detection
  → AI Multi-Model Classification (CNN + Random Forest + Rules)
  → Explainable AI (SHAP & Feature Attribution)
  → Vector Similarity Search (k-NN Cosine Topologies)
  → Automated Intelligence Dossier Compilation
```

---

## 🎨 Strict Tactical Brand Identity

Built following military and aerospace telemetry workstation guidelines:

| Hex Code | Semantic Role |
|---|---|
| `#063B00` | Deep Tactical Base Background |
| `#266210` | Signal Panels, Cards & Secondary Backing |
| `#90B800` | Primary Cyber Lime Accent & Active States |
| `#E1E100` | Warning Highlights & Anomaly Markers |
| `#F8FAFC` / `#CBD5E1` | High-Legibility Technical Typography |

---

## ⚡ Key Features

1. **Mission Command Center Dashboard**
   - Live metrics: 1,284 Signals Analyzed, 87 Anomalies, 94.7% Mean Confidence, 18.6 dB SNR.
   - Live hardware DSP telemetry, CUDA GPU load, and sensor network indicators.
   - Interactive recent analysis table with instant signal drill-down.

2. **Full-Pipeline File Ingestion (`.IQ` & `.WAV`)**
   - Real drag-and-drop file ingestion zone with client-side container validation.
   - 8-stage interactive analysis simulator with live percentage feedback.

3. **Time & Frequency Domain Signal Workstation**
   - **Oscilloscope Waveform**: Multi-channel I-phase, Q-quadrature, and instantaneous magnitude traces with marked anomaly crosshairs.
   - **FFT Power Spectrum**: Welch PSD area visualization with carrier peaks, 99% OBW, and -78 dBm noise floor lines.
   - **Spectrogram Waterfall**: 2D STFT time-frequency intensity matrix heatmap mapped strictly to brand spectral colors.

4. **7-Dimensional Signal DNA Biometrics**
   - Radar manifold mapping **Temporal, Spectral, Statistical, Modulation, Noise, Harmonic, Transient** dimensions.
   - Extracted parameter cards: RMS, Peak Amplitude, Wiener Spectral Entropy, Dominant Frequency, Bandwidth, Crest Factor.

5. **Sub-Millisecond Anomaly Detection & Inspection**
   - Timeline track mapping exact timestamps:
     - `17.82 s` — Frequency Shift (+142.5 kHz LO drift) [MEDIUM]
     - `24.17 s` — Spectral Expansion (+37.7% regrowth) [LOW]
     - `28.93 s` — Signal Dropout (-24.6 dB deep fade null) [HIGH]
   - Working **View Event Modal** with baseline vs. observed statistical metrics and mitigation actions.

6. **AI Classification & Consensus**
   - Primary Verdict: `CLASS A (Tactical FHSS)` at `94.7%` confidence.
   - Consensus breakdown across 1D-CNN (91.4%), Random Forest (87.6%), and Rule Engine (98.2%).
   - Bayesian fusion decision: `93.7%`.

7. **Explainable AI (XAI)**
   - Transparent attribution matrix displaying supporting evidence (spectral profile, bandwidth, constellation clustering) alongside isolated contradictory noise deviations.

8. **Vector Similarity Topology Search**
   - Radial SVG embedding graph computing nearest-neighbors (`Signal #184: 96.2%`, `Signal #072: 91.7%`, `Signal #311: 88.4%`).
   - Dynamic threshold filtering and direct workspace comparison.

9. **Automated Intelligence Dossier Export**
   - Printable dossier with **Export PDF**, **Export JSON**, **Export CSV**, and **Share Report** functionality.

---

## 📂 Project Structure

```
signal-x/
├── public/
│   ├── favicon.svg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── RecentAnalysisTable.tsx
│   │   │   └── SystemStatus.tsx
│   │   ├── signal/
│   │   │   ├── UploadZone.tsx
│   │   │   ├── AnalysisPipeline.tsx
│   │   │   ├── WaveformChart.tsx
│   │   │   ├── FrequencySpectrum.tsx
│   │   │   ├── Spectrogram.tsx
│   │   │   ├── SignalDNA.tsx
│   │   │   ├── SignalTimeline.tsx
│   │   │   └── SignalParameterCard.tsx
│   │   ├── ai/
│   │   │   ├── ClassificationCard.tsx
│   │   │   ├── ModelConsensus.tsx
│   │   │   ├── ConfidenceChart.tsx
│   │   │   └── ExplainableAI.tsx
│   │   ├── anomaly/
│   │   │   ├── AnomalyCard.tsx
│   │   │   └── AnomalyModal.tsx
│   │   ├── similarity/
│   │   │   ├── SimilarityGraph.tsx
│   │   │   └── SimilarSignalCard.tsx
│   │   ├── reports/
│   │   │   └── ReportPreview.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Modal.tsx
│   │       ├── Toast.tsx
│   │       ├── LoadingState.tsx
│   │       └── EmptyState.tsx
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AnalyzeSignal.tsx
│   │   ├── SignalWorkspace.tsx
│   │   ├── SignalDNAPage.tsx
│   │   ├── AnomaliesPage.tsx
│   │   ├── ClassificationPage.tsx
│   │   ├── SimilarityPage.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── HistoryPage.tsx
│   │   └── SettingsPage.tsx
│   ├── data/
│   │   ├── mockSignals.ts
│   │   ├── mockWaveform.ts
│   │   ├── mockSpectrum.ts
│   │   ├── mockAnomalies.ts
│   │   └── mockSimilarity.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── signal.ts
│   ├── hooks/
│   │   └── useAnalysis.ts
│   ├── utils/
│   │   └── signalUtils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Technology Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with tactical design tokens
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Charts & DSP Visuals**: [Recharts](https://recharts.org/) + SVG Canvas
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```

---

## 🔮 Future Backend Architecture

This frontend is architected to seamlessly interface with a future Python / FastAPI production backend:

```
┌───────────────────────────────────────────────┐
│           React Frontend (SIGNAL-X)           │
└───────────────────────┬───────────────────────┘
                        │ REST / WebSocket Telemetry
┌───────────────────────▼───────────────────────┐
│                FastAPI Gateway                │
└───────────────────────┬───────────────────────┘
                        │ Async Task Queue (Celery/Redis)
┌───────────────────────▼───────────────────────┐
│        Python Signal Processing Engine        │
│  - NumPy / SciPy / CuPy I/Q Deconvolution    │
│  - GNU Radio / Liquid-DSP Demodulators        │
│  - PyFFTW / Welch Power Spectral Density      │
└───────────────────────┬───────────────────────┘
                        │ Extracted 7D Biometric Vectors
┌───────────────────────▼───────────────────────┐
│               ML Model Pipeline               │
│  - PyTorch 1D-ResNet Modulation Classifier    │
│  - Scikit-Learn Random Forest Cumulants       │
│  - SHAP / Integrated Gradients Explainability │
└───────────────────────┬───────────────────────┘
                        │ Vector Embeddings & Records
┌───────────────────────▼───────────────────────┐
│     PostgreSQL + pgvector / Milvus DB         │
└───────────────────────────────────────────────┘
```
