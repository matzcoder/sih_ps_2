import { WaveformDataPoint, SpectrumDataPoint, SpectrogramBin } from '../types/signal';

// Format bytes into human readable size
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Format frequency in Hz/kHz/MHz/GHz
export function formatFrequency(hz: number): string {
  if (hz >= 1e9) return (hz / 1e9).toFixed(2) + ' GHz';
  if (hz >= 1e6) return (hz / 1e6).toFixed(2) + ' MHz';
  if (hz >= 1e3) return (hz / 1e3).toFixed(2) + ' kHz';
  return hz.toFixed(1) + ' Hz';
}

// Format duration
export function formatDuration(seconds: number): string {
  if (seconds < 1) return (seconds * 1000).toFixed(0) + ' ms';
  if (seconds < 60) return seconds.toFixed(1) + ' s';
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1);
  return `${mins}m ${secs}s`;
}

// Generate realistic Time Domain I/Q Waveform Data
export function generateWaveformData(
  sampleCount: number = 200,
  durationSec: number = 32.4,
  snrDb: number = 18.7,
  hasAnomalies: boolean = true
): WaveformDataPoint[] {
  const points: WaveformDataPoint[] = [];
  const baseFreq1 = 4.2; // Hz normalized for visualization
  const baseFreq2 = 8.5;
  const noiseAmp = Math.pow(10, -snrDb / 20) * 0.45;

  for (let i = 0; i < sampleCount; i++) {
    const tNorm = i / sampleCount;
    const time = parseFloat((tNorm * durationSec).toFixed(2));
    
    // Normal sinusoids for In-Phase and Quadrature
    let iVal = Math.sin(2 * Math.PI * baseFreq1 * tNorm) * 0.65 + 
               Math.sin(2 * Math.PI * baseFreq2 * tNorm) * 0.25;
    let qVal = Math.cos(2 * Math.PI * baseFreq1 * tNorm) * 0.65 + 
               Math.cos(2 * Math.PI * baseFreq2 * tNorm) * 0.25;

    // Simulated Noise
    const noiseI = (Math.random() - 0.5) * noiseAmp;
    const noiseQ = (Math.random() - 0.5) * noiseAmp;
    iVal += noiseI;
    qVal += noiseQ;

    // Inject realistic anomaly events
    if (hasAnomalies) {
      // 1. Frequency shift anomaly around 17.8s (normalized ~0.55)
      if (tNorm >= 0.53 && tNorm <= 0.57) {
        iVal = Math.sin(2 * Math.PI * (baseFreq1 * 2.8) * tNorm) * 0.85 + (Math.random() - 0.5) * 0.1;
        qVal = Math.cos(2 * Math.PI * (baseFreq1 * 2.8) * tNorm) * 0.85 + (Math.random() - 0.5) * 0.1;
      }
      // 2. Spectral expansion/burst around 24.1s (normalized ~0.74)
      if (tNorm >= 0.72 && tNorm <= 0.76) {
        iVal += (Math.random() - 0.5) * 0.6;
        qVal += (Math.random() - 0.5) * 0.6;
      }
      // 3. Signal dropout around 28.9s (normalized ~0.89)
      if (tNorm >= 0.88 && tNorm <= 0.91) {
        iVal *= 0.08;
        qVal *= 0.08;
      }
    }

    const magnitude = Math.sqrt(iVal * iVal + qVal * qVal);
    const phase = Math.atan2(qVal, iVal);

    points.push({
      time,
      inPhase: parseFloat(iVal.toFixed(4)),
      quadrature: parseFloat(qVal.toFixed(4)),
      magnitude: parseFloat(magnitude.toFixed(4)),
      phase: parseFloat(phase.toFixed(4)),
    });
  }

  return points;
}

// Generate realistic Frequency Spectrum (FFT) Data
export function generateSpectrumData(
  centerFreqMhz: number = 2.41,
  bandwidthMhz: number = 2.04,
  bins: number = 160
): SpectrumDataPoint[] {
  const points: SpectrumDataPoint[] = [];
  const startFreq = centerFreqMhz - bandwidthMhz * 0.8;
  const endFreq = centerFreqMhz + bandwidthMhz * 0.8;
  const step = (endFreq - startFreq) / bins;

  for (let i = 0; i <= bins; i++) {
    const freq = parseFloat((startFreq + i * step).toFixed(3));
    const deltaFromCenter = Math.abs(freq - centerFreqMhz);
    
    // Baseline noise floor between -85 and -75 dBm
    let amp = -80 + (Math.random() - 0.5) * 4;

    // Main carrier / modulation envelope (Sinc / Raised Cosine shape)
    if (deltaFromCenter < bandwidthMhz / 2) {
      const x = (deltaFromCenter / (bandwidthMhz / 2)) * Math.PI;
      const sinc = x === 0 ? 1 : Math.sin(x) / x;
      amp = -15 + 55 * Math.pow(sinc, 2) + (Math.random() - 0.5) * 3;
    }

    // Secondary subcarrier peak 1
    const sub1 = Math.abs(freq - (centerFreqMhz - 0.45));
    if (sub1 < 0.12) {
      amp = Math.max(amp, -28 + (1 - sub1 / 0.12) * 22 + (Math.random() - 0.5) * 2);
    }

    // Secondary subcarrier peak 2
    const sub2 = Math.abs(freq - (centerFreqMhz + 0.45));
    if (sub2 < 0.12) {
      amp = Math.max(amp, -28 + (1 - sub2 / 0.12) * 22 + (Math.random() - 0.5) * 2);
    }

    // Harmonic spike
    const harmonic = Math.abs(freq - (centerFreqMhz + 0.82));
    if (harmonic < 0.05) {
      amp = Math.max(amp, -42 + (1 - harmonic / 0.05) * 25);
    }

    const isPeak = Math.abs(freq - centerFreqMhz) < 0.02;

    points.push({
      frequency: freq,
      amplitude: parseFloat(amp.toFixed(2)),
      noiseFloor: -78,
      peakMarker: isPeak,
    });
  }

  return points;
}

// Generate 2D Spectrogram Matrix (Time x Frequency)
export function generateSpectrogramData(
  timeSteps: number = 32,
  freqBins: number = 24
): { timeLabels: string[]; freqLabels: string[]; matrix: number[][] } {
  const timeLabels: string[] = [];
  const freqLabels: string[] = [];
  const matrix: number[][] = [];

  for (let t = 0; t < timeSteps; t++) {
    timeLabels.push(`${(t * 1.0).toFixed(0)}s`);
  }

  for (let f = 0; f < freqBins; f++) {
    const fMhz = (2.41 - 1.0 + (f / freqBins) * 2.0).toFixed(2);
    freqLabels.push(`${fMhz}M`);
  }

  for (let t = 0; t < timeSteps; t++) {
    const row: number[] = [];
    for (let f = 0; f < freqBins; f++) {
      const centerDist = Math.abs(f - freqBins / 2) / (freqBins / 2);
      
      // Base intensity higher around center frequency
      let val = Math.max(0, 1 - centerDist * 1.4) * 0.85 + Math.random() * 0.15;

      // Anomaly 1: Frequency Shift around time t = 17s ~ 18s
      if (t >= 17 && t <= 18) {
        if (f > freqBins * 0.75) {
          val = 0.95 + Math.random() * 0.05;
        } else {
          val *= 0.3;
        }
      }

      // Anomaly 2: Spectral Burst around t = 24s
      if (t >= 24 && t <= 25) {
        val = 0.8 + Math.random() * 0.2;
      }

      // Anomaly 3: Dropout around t = 29s
      if (t >= 28 && t <= 29) {
        val = Math.random() * 0.08;
      }

      row.push(parseFloat(val.toFixed(3)));
    }
    matrix.push(row);
  }

  return { timeLabels, freqLabels, matrix };
}
