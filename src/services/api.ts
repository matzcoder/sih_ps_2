import {
  SignalAnalysis,
  SignalParameters,
  SignalDNAMetric,
  AnomalyEvent,
  SimilarSignal,
  ReportData,
  SystemMetrics,
  PipelineStage,
  ClassificationClass,
  ModelConsensusItem,
  ExplainableEvidence
} from '../types/signal';
import { mockSignals, defaultSignalParameters, defaultDnaMetrics } from '../data/mockSignals';
import { mockAnomalies } from '../data/mockAnomalies';
import { mockSimilarSignals } from '../data/mockSimilarity';

// Simulated network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// PIPELINE STAGES DEFINITION
export const PIPELINE_STAGES: PipelineStage[] = [
  { id: '1', name: 'FILE VALIDATION', description: 'Verifying IQ / WAV container headers & endianness', status: 'PENDING', progress: 0 },
  { id: '2', name: 'PREPROCESSING', description: 'DC offset correction & I/Q quadrature balance', status: 'PENDING', progress: 0 },
  { id: '3', name: 'FEATURE EXTRACTION', description: 'Computing FFT, Welch PSD, Higher-order Cumulants', status: 'PENDING', progress: 0 },
  { id: '4', name: 'SIGNAL DNA GENERATION', description: '7-dimensional biometric RF signature synthesis', status: 'PENDING', progress: 0 },
  { id: '5', name: 'AI CLASSIFICATION', description: 'Multi-model inference across Deep CNN & Forest models', status: 'PENDING', progress: 0 },
  { id: '6', name: 'ANOMALY DETECTION', description: 'Dynamic thresholding & spatial-temporal outlier scans', status: 'PENDING', progress: 0 },
  { id: '7', name: 'EXPLAINABLE AI', description: 'SHAP / Integrated Gradients attribution mapping', status: 'PENDING', progress: 0 },
  { id: '8', name: 'REPORT GENERATION', description: 'Automated intelligence dossier compilation', status: 'PENDING', progress: 0 },
];

export const classificationClasses: ClassificationClass[] = [
  { name: 'Class A', confidence: 94.7, description: 'Tactical Frequency Hopping / DSSS Military Telemetry' },
  { name: 'Class B', confidence: 3.8, description: 'Commercial UAV Telemetry / GFSK Subcarrier' },
  { name: 'Class C', confidence: 1.1, description: 'Analog Beacon / Distress Swept Tone' },
  { name: 'Unknown', confidence: 0.4, description: 'Uncorrelated Ambient Noise Floor' },
];

export const modelConsensusList: ModelConsensusItem[] = [
  { modelName: 'Deep ResNet-1D / CNN', architecture: '1D Convolutional Neural Network', confidence: 91.4, prediction: 'Class A', status: 'High Match' },
  { modelName: 'Ensemble Random Forest', architecture: '500-Tree Cumulant Classifier', confidence: 87.6, prediction: 'Class A', status: 'Moderate Match' },
  { modelName: 'Heuristic Rule Engine', architecture: 'RF Parameter & Raster Boundary Engine', confidence: 98.2, prediction: 'Class A', status: 'High Match' },
];

export const explainableEvidenceList: ExplainableEvidence[] = [
  { id: 'e1', isSupporting: true, title: 'Spectral shape matches Class A', detail: 'High correlation (0.97) with tactical pulse sinc-squared power spectral density envelope.', featureWeight: 94, category: 'Spectral' },
  { id: 'e2', isSupporting: true, title: 'Bandwidth within expected range', detail: 'Occupied bandwidth of 2.04 MHz fits the 2.00–2.08 MHz Class A military channel specification.', featureWeight: 91, category: 'Spectral' },
  { id: 'e3', isSupporting: true, title: 'Modulation characteristics match', detail: 'I/Q constellation shows 4 distinct QPSK quadrant clusters with tight phase variance.', featureWeight: 96, category: 'Modulation' },
  { id: 'e4', isSupporting: true, title: 'Temporal characteristics match', detail: 'Hop dwell duration and periodic frame preamble conform strictly to tactical protocol.', featureWeight: 88, category: 'Temporal' },
  { id: 'e5', isSupporting: true, title: 'Constellation features match', detail: 'Normalized EVM (Error Vector Magnitude) below 4.2% aligns with high-grade digital transmitters.', featureWeight: 90, category: 'Constellation' },
  { id: 'e6', isSupporting: false, title: 'Moderate noise contamination', detail: 'Slight SNR degradation around 28.9s causes momentary dispersion in constellation cluster points.', featureWeight: 24, category: 'Noise' },
];

class ApiService {
  /**
   * Uploads an IQ or WAV file (Frontend simulation ready for FastAPI)
   */
  async uploadSignal(file: File): Promise<SignalAnalysis> {
    await delay(600);
    const extension = file.name.split('.').pop()?.toUpperCase();
    if (extension !== 'IQ' && extension !== 'WAV') {
      throw new Error(`Unsupported file type .${extension}. Only .IQ and .WAV files are supported.`);
    }

    const newSignal: SignalAnalysis = {
      id: `signal_${Math.floor(100 + Math.random() * 900)}`,
      fileName: file.name,
      fileType: extension as 'IQ' | 'WAV',
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      duration: extension === 'IQ' ? 32.4 : 45.0,
      samplingRate: extension === 'IQ' ? '20 MHz' : '48 kHz',
      snr: 18.7,
      bandwidth: extension === 'IQ' ? '2.04 MHz' : '32.0 kHz',
      centerFrequency: extension === 'IQ' ? '2.41 GHz' : '433.92 MHz',
      classification: 'Class A (Tactical FHSS)',
      confidence: 94.7,
      anomalies: 3,
      status: 'PENDING',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      modulationType: 'QPSK / DSSS',
      rms: 0.418,
      peakAmplitude: 0.923,
      spectralEntropy: 0.73,
      crestFactor: 2.21,
      spectralCentroid: '2.412 GHz',
      zeroCrossingRate: '1.42 MHz',
    };

    return newSignal;
  }

  async getAnalysis(id: string): Promise<SignalAnalysis> {
    await delay(300);
    const found = mockSignals.find(s => s.id === id);
    if (!found) {
      // Fallback to signal_042 with id swapped
      return { ...mockSignals[0], id, fileName: `${id}.iq` };
    }
    return found;
  }

  async getSignalDNA(id: string): Promise<{ parameters: SignalParameters; metrics: SignalDNAMetric[] }> {
    await delay(350);
    return {
      parameters: defaultSignalParameters,
      metrics: defaultDnaMetrics,
    };
  }

  async getAnomalies(id: string): Promise<AnomalyEvent[]> {
    await delay(300);
    return mockAnomalies;
  }

  async getClassification(id: string) {
    await delay(300);
    return {
      primaryClass: 'CLASS A',
      confidence: 94.7,
      distribution: classificationClasses,
      consensus: modelConsensusList,
      fusionScore: 93.7,
      evidence: explainableEvidenceList,
      explanationText:
        'The signal exhibits prominent characteristics of a Tactical Frequency Hopping / Direct Sequence Spread Spectrum transmission. High spectral symmetry and 4-quadrant constellation clustering provide strong confidence for Class A identification, with an ensemble consensus of 93.7% across deep learning, tree, and deterministic rule engines.'
    };
  }

  async getSimilarSignals(id: string): Promise<SimilarSignal[]> {
    await delay(300);
    return mockSimilarSignals;
  }

  async generateReport(id: string): Promise<ReportData> {
    await delay(400);
    const signal = await this.getAnalysis(id);
    const dna = await this.getSignalDNA(id);
    const anomalies = await this.getAnomalies(id);
    const classification = await this.getClassification(id);
    const similarSignals = await this.getSimilarSignals(id);

    return {
      id: `REP-${id.toUpperCase()}-${Date.now().toString().slice(-4)}`,
      signal,
      parameters: dna.parameters,
      dnaMetrics: dna.metrics,
      anomalies,
      classification: {
        primaryClass: classification.primaryClass,
        confidence: classification.confidence,
        distribution: classification.distribution,
        consensus: classification.consensus,
        fusionScore: classification.fusionScore,
      },
      evidence: classification.evidence,
      similarSignals,
      summaryText: classification.explanationText,
      generatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      analystNotes: 'Verified tactical waveform with nominal RF parameters. 3 transient anomalies logged for telemetry audit.',
    };
  }

  async getSystemMetrics(): Promise<SystemMetrics> {
    await delay(200);
    return {
      signalsAnalyzed: 1284,
      anomaliesDetected: 87,
      classificationConfidence: 94.7,
      averageSNR: 18.6,
      storageUsed: '4.82 TB / 16 TB',
      dspThroughput: '1.42 GSamples/s',
      gpuLoad: 68.4,
      activeSensors: 14,
    };
  }

  async getHistory(filterType: string = 'All', searchQuery: string = ''): Promise<SignalAnalysis[]> {
    await delay(200);
    let results = [...mockSignals];

    if (filterType === 'IQ') {
      results = results.filter(s => s.fileType === 'IQ');
    } else if (filterType === 'WAV') {
      results = results.filter(s => s.fileType === 'WAV');
    } else if (filterType === 'Anomaly') {
      results = results.filter(s => s.anomalies > 0);
    } else if (filterType === 'Complete') {
      results = results.filter(s => s.status === 'COMPLETED');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        s =>
          s.fileName.toLowerCase().includes(q) ||
          s.classification.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    return results;
  }
}

export const api = new ApiService();
