import { generateSpectrumData, generateSpectrogramData } from '../utils/signalUtils';
import { SpectrumDataPoint } from '../types/signal';

// Realistic FFT Frequency Spectrum Data
export const mockSpectrumData: SpectrumDataPoint[] = generateSpectrumData(2.41, 2.04, 180);

// Realistic 2D Spectrogram Data
export const mockSpectrogramData = generateSpectrogramData(32, 24);
