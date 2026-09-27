import { AnomalyEvent } from '../types/signal';

export const mockAnomalies: AnomalyEvent[] = [
  {
    id: 'anom_01',
    title: 'Frequency Shift',
    type: 'Carrier Instability / LO Drift',
    timestamp: 17.82,
    timestampFormatted: '17.82 s',
    severity: 'MEDIUM',
    durationMs: 420,
    description: 'Sudden abrupt carrier offset jump of +142.5 kHz detected in I/Q demodulation track, deviating from expected Class A channel raster.',
    frequencyOffset: '+142.5 kHz',
    amplitudeDrop: '-1.2 dB',
    snrDegradation: '3.4 dB',
    recommendedAction: 'Verify receiver PLL lock stability and Doppler correction compensation filters.',
    metrics: {
      expected: '2.410000 GHz ± 5 kHz',
      observed: '2.410142 GHz',
      deviation: '+142.5 kHz (+28.5σ)',
    }
  },
  {
    id: 'anom_02',
    title: 'Spectral Expansion',
    type: 'Out-of-Band Spectral Regrowth',
    timestamp: 24.17,
    timestampFormatted: '24.17 s',
    severity: 'LOW',
    durationMs: 650,
    description: 'Instantaneous occupied bandwidth increased by 38% accompanied by elevated non-linear intermodulation distortion side lobes.',
    frequencyOffset: '0.0 kHz',
    amplitudeDrop: '+2.8 dB (Peak)',
    snrDegradation: '1.8 dB',
    recommendedAction: 'Check transmitter power amplifier saturation and digital pre-distortion (DPD) parameters.',
    metrics: {
      expected: '2.04 MHz 99% OBW',
      observed: '2.81 MHz 99% OBW',
      deviation: '+770 kHz (+37.7%)',
    }
  },
  {
    id: 'anom_03',
    title: 'Signal Dropout',
    type: 'Deep Amplitude Fade / Jamming Burst',
    timestamp: 28.93,
    timestampFormatted: '28.93 s',
    severity: 'HIGH',
    durationMs: 890,
    description: 'Critical signal power attenuation exceeding 24 dB resulting in total constellation collapse and momentary synchronization frame loss.',
    frequencyOffset: '-12.0 kHz',
    amplitudeDrop: '-24.6 dB',
    snrDegradation: '14.2 dB',
    recommendedAction: 'Inspect RF path obstruction, multipath null condition or intentional pulse interference event.',
    metrics: {
      expected: '0.923 Peak Norm',
      observed: '0.074 Peak Norm',
      deviation: '-91.9% amplitude loss',
    }
  }
];
