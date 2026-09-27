# SIGNAL-X Stitch Design System (v2.0)
*Bright Orange & Dark Navy Mission Control Architecture*

## 1. Visual Foundation & Philosophy
The SIGNAL-X user experience is engineered as a high-density, mission-critical signal intelligence and neural DSP dashboard. It merges the ergonomics of a premier aerospace telemetry workstation with the refined aesthetics of a state-of-the-art SaaS platform.

### Core Visual Principles:
- **No White or Light Gray Backgrounds:** Foundation is built on deep navy, midnight obsidian, and layered charcoal (`#080B12`, `#04060A`, `#0F1523`).
- **No Green As Primary Accent:** The legacy monochromatic military green has been completely replaced with a warm, energetic, and commanding **Bright Orange** identity.
- **Harmonious Warm Spectrum:** Primary `#FF6B00`, Secondary `#FF8A00`, Amber `#F59E0B`, Golden Yellow `#FFB000`, and Coral Highlight `#FF4D4D`.
- **Layered Visual Depth:** Subtle translucent card backings, optical hairline borders (`rgba(255, 107, 0, 0.15)`), and multi-layered elevation shadows with warm ambient specular glows.
- **Micro-Interactions:** Tactile button states, responsive tooltips, subtle radar sweeps, signal heartbeat indicators, and accessible focus rings (`:focus-visible`).

---

## 2. Color Palette Tokens

| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `sig.bg` | `#080B12` | Main page canvas background |
| `sig.bg-deep` | `#04060A` | Deep contrast background, code blocks, sidebar headers |
| `sig.surface` | `#0F1523` | Default card & widget surface |
| `sig.surface-elevated` | `#161F33` | Modals, elevated dialogs, floating action sheets |
| `sig.surface-hover` | `#1C273F` | Interactive card hover state |
| `sig.primary` | `#FF6B00` | Bright Orange primary brand & key CTA |
| `sig.primary-hover` | `#FF8A00` | Vibrant Orange active/hover states |
| `sig.accent` | `#FFB000` | Golden Amber highlights, live badge pings, metric callouts |
| `sig.highlight` | `#FF4D4D` | Coral red alert state, critical threshold marker |
| `sig.border` | `rgba(255, 107, 0, 0.15)` | Primary container border |
| `sig.border-hover` | `rgba(255, 107, 0, 0.45)` | Interactive focus & hover perimeter |
| `sig.border-active` | `rgba(255, 107, 0, 0.8)` | Selected state boundary |
| `sig.border-subtle` | `rgba(255, 255, 255, 0.08)` | Internal dividers and table row lines |
| `sig.text` | `#F8FAFC` | Primary text (98% lightness crisp off-white) |
| `sig.text-muted` | `#94A3B8` | Technical labels, descriptions, secondary values |
| `sig.text-dim` | `#64748B` | Subtle timestamps, telemetry metadata |
| `sig.warning` | `#F59E0B` | Anomalies, warning events, medium severity |
| `sig.danger` | `#EF4444` | Critical errors, deep signal nulls, dropouts |
| `sig.info` | `#38BDF8` | Ingest status, neutral protocol metadata |

---

## 3. Typography Scale & Hierarchy

- **Sans:** `Inter`, system-ui, sans-serif (Body text, narrative descriptions, modal copy)
- **Mono:** `JetBrains Mono`, Consolas, monospace (Frequencies, coordinates, SNR values, hexadecimal hashes, technical badges)

| Scale | Tailwind Spec | Application |
| :--- | :--- | :--- |
| **Hero Title** | `text-4xl sm:text-5xl font-black tracking-tight` | Landing page hero, primary mission statements |
| **Section H1** | `text-xl sm:text-2xl font-bold font-mono tracking-wider` | Page header titles (Dashboard, Workspace, DNA) |
| **Widget H2** | `text-sm sm:text-base font-bold font-mono tracking-wide` | Card headers, table section titles |
| **Body Text** | `text-sm font-sans text-slate-300 leading-relaxed` | Descriptions, AI consensus summaries, report text |
| **Telemetry Mono** | `text-xs font-mono text-slate-200 tracking-tight` | Waveform coordinates, FFT frequency labels, EVM |
| **Badge / Label** | `text-[10px] font-mono font-bold uppercase tracking-widest` | Category pills, status indicators, hardware metrics |

---

## 4. Component Primitives

1. **Button (`src/components/common/Button.tsx`)**:
   - `primary`: Solid `#FF6B00` with dark `#080B12` text, radiant orange glow, scaling micro-interaction on click.
   - `secondary`: Deep slate surface `#161F33` with orange border, white text, and orange hover glow.
   - `outline`: Translucent backing with crisp `#FF6B00` border and text.
   - `warning` / `danger`: High-visibility coral/amber warning states.
   - Accessible `:focus-visible` ring with 2px offset.

2. **Card (`src/components/common/Card.tsx`) & Tactical Panels**:
   - Background `#0F1523` with subtle gradient overlay (`bg-gradient-to-b from-[#131B2D] to-[#0F1523]`).
   - Hairline perimeter border with corner bracket accents in brand orange.
   - Hover states elevate card by `-1px` with glowing orange rim `rgba(255, 107, 0, 0.25)`.

3. **Badge (`src/components/common/Badge.tsx`)**:
   - Monospace typography with optional pulsing live status dot.
   - Variants for IQ, WAV, CRITICAL, HIGH, MEDIUM, LOW, and COMPLETED.

4. **Telemetry Visualizers**:
   - Real-time Waveform, Spectrogram Waterfall, I/Q Constellation Scatter, and 7-Dimensional Radar charts rendered with vibrant orange and golden-amber traces against midnight grids.
