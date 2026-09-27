import { generateWaveformData } from '../utils/signalUtils';
import { WaveformDataPoint } from '../types/signal';

// Pre-generated realistic waveform points for signal_042
export const mockWaveformData: WaveformDataPoint[] = generateWaveformData(240, 32.4, 18.7, true);

// Fast downsampled dataset for thumbnail previews
export const mockWaveformPreview: WaveformDataPoint[] = generateWaveformData(40, 32.4, 18.7, false);
