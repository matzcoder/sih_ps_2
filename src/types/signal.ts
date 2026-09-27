export type FileType = 'IQ' | 'WAV';

export type SignalStatus = 'COMPLETED' | 'PROCESSING' | 'PENDING' | 'FAILED' | 'FLAGGED';

export type AnomalySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SignalAnalysis {
  id: string;
  fileName: string;
  fileType: FileType;
  fileSize: string;
  duration: number; // in seconds
  samplingRate: string;
  snr: number; // in dB
  bandwidth: string;
  centerFrequency: string;
  classification: string;
  confidence: number; // 0 to 100
  anomalies: number;
  status: SignalStatus;
  timestamp: string;
  modulationType?: string;
  rms?: number;
  peakAmplitude?: number;
  spectralEntropy?: number;
  crestFactor?: number;
  spectralCentroid?: string;
  zeroCrossingRate?: string;
}

export interface WaveformDataPoint {
  time: number;
  inPhase: number;      // I channel
  quadrature: number;   // Q channel
  magnitude: number;
  phase: number;
}

export interface SpectrumDataPoint {
  frequency: number; // MHz or kHz
  amplitude: number; // dBm or normalized dB
  noiseFloor: number;
  peakMarker?: boolean;
}

export interface SpectrogramBin {
  time: number;
  frequency: number;
  intensity: number; // 0 to 1
}

export interface SignalDNAMetric {
  dimension: string;
  value: number; // 0 to 100
  fullMark: number;
  description: string;
}

export interface SignalParameters {
  rms: number;
  peakAmplitude: number;
  spectralEntropy: number;
  dominantFrequency: string;
  bandwidth: string;
  crestFactor: number;
  spectralCentroid: string;
  zeroCrossingRate: string;
  snr: number;
  dnaScore: number;
}

export interface AnomalyEvent {
  id: string;
  title: string;
  type: string;
  timestamp: number; // in seconds
  timestampFormatted: string;
  severity: AnomalySeverity;
  durationMs: number;
  description: string;
  frequencyOffset?: string;
  amplitudeDrop?: string;
  snrDegradation?: string;
  recommendedAction: string;
  metrics: {
    expected: string;
    observed: string;
    deviation: string;
  };
}

export interface ClassificationClass {
  name: string;
  confidence: number;
  description: string;
  color?: string;
}

export interface ModelConsensusItem {
  modelName: string;
  architecture: string;
  confidence: number;
  prediction: string;
  status: 'High Match' | 'Moderate Match' | 'Concurring';
}

export interface ExplainableEvidence {
  id: string;
  isSupporting: boolean;
  title: string;
  detail: string;
  featureWeight: number; // 0 to 100
  category: 'Spectral' | 'Temporal' | 'Modulation' | 'Noise' | 'Constellation';
}

export interface SimilarSignal {
  id: string;
  signalId: string;
  name: string;
  similarityScore: number; // 0 to 100
  bandwidth: string;
  snr: number;
  classification: string;
  fileType: FileType;
  modulation: string;
  timestamp: string;
  distanceMetric: number;
  sharedFeatures: string[];
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'ERROR';
  progress: number; // 0 to 100
  executionTimeMs?: number;
}

export interface SystemMetrics {
  signalsAnalyzed: number;
  anomaliesDetected: number;
  classificationConfidence: number;
  averageSNR: number;
  storageUsed: string;
  dspThroughput: string;
  gpuLoad: number;
  activeSensors: number;
}

export interface ReportData {
  id: string;
  signal: SignalAnalysis;
  parameters: SignalParameters;
  dnaMetrics: SignalDNAMetric[];
  anomalies: AnomalyEvent[];
  classification: {
    primaryClass: string;
    confidence: number;
    distribution: ClassificationClass[];
    consensus: ModelConsensusItem[];
    fusionScore: number;
  };
  evidence: ExplainableEvidence[];
  similarSignals: SimilarSignal[];
  summaryText: string;
  generatedAt: string;
  analystNotes?: string;
}

export interface SystemSettings {
  autoPreprocessing: boolean;
  featureExtraction: boolean;
  aiClassification: boolean;
  anomalyDetection: boolean;
  explainableAI: boolean;
  automaticReport: boolean;
  confidenceThreshold: number;
  sensitivityLevel: 'Low' | 'Medium' | 'High' | 'Aggressive';
  dspEngine: 'CUDA Accelerated' | 'OpenCL' | 'CPU Multi-threaded';
  telemetryStream: boolean;
  spectralResolution: '512' | '1024' | '2048' | '4096';
}
