import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../hooks/useAnalysis';
import { api } from '../services/api';
import { UploadZone } from '../components/signal/UploadZone';
import { AnalysisPipeline } from '../components/signal/AnalysisPipeline';
import { Toast } from '../components/common/Toast';
import { Radio, Sparkles, FileCode, Cpu, ShieldCheck } from 'lucide-react';

export const AnalyzeSignal: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'error' | 'success' | 'warning'; title: string; message: string } | null>(null);

  const {
    stages,
    currentStageIndex,
    overallProgress,
    isAnalyzing,
    runAnalysis,
    resetPipeline,
  } = useAnalysis();

  const handleFileSelected = (file: File) => {
    setUploadError(null);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'iq' && ext !== 'wav') {
      const errMsg = `Unsupported file format .${ext}. Only .IQ and .WAV files are supported.`;
      setUploadError(errMsg);
      setToast({
        type: 'error',
        title: 'UNSUPPORTED FORMAT',
        message: errMsg,
      });
      return;
    }
    setSelectedFile(file);
    setToast({
      type: 'success',
      title: 'FILE BUFFER READY',
      message: `Loaded ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB) into DSP staging buffer.`,
    });
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setUploadError(null);
    resetPipeline();
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    try {
      // 1. Upload simulation
      await api.uploadSignal(selectedFile);

      // 2. Run multi-stage pipeline simulation
      const targetId = 'signal_042'; // Target identifier
      await runAnalysis(targetId);

      // 3. Short delay to display 100% complete state, then navigate to workspace
      setTimeout(() => {
        navigate(`/workspace/${targetId}`);
      }, 800);
    } catch (err: any) {
      setToast({
        type: 'error',
        title: 'ANALYSIS FAILURE',
        message: err.message || 'Signal processing encountered a fatal anomaly.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#232F48] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center">
              <Radio className="w-4 h-4 text-[#FF6B00] animate-pulse" />
            </div>
            <div>
              <h1 className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                SIGNAL INGESTION &amp; DSP PIPELINE
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Feed raw IQ recordings or baseband WAV files into the 8-stage automated classifier.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#FFB000] bg-[#161F33] px-3.5 py-2 rounded-lg border border-[#232F48] shadow-sm">
          <Sparkles className="w-4 h-4 text-[#FF6B00]" />
          <span>GPU ACCELERATED PIPELINE</span>
        </div>
      </div>

      {/* Main Container: either Upload Zone or Active Analysis Pipeline */}
      {isAnalyzing ? (
        <div className="py-4">
          <AnalysisPipeline
            stages={stages}
            currentStageIndex={currentStageIndex}
            overallProgress={overallProgress}
            fileName={selectedFile ? selectedFile.name : 'signal_042.iq'}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <UploadZone
            onFileSelected={handleFileSelected}
            onStartAnalysis={handleStartAnalysis}
            selectedFile={selectedFile}
            onClearFile={handleClearFile}
            isLoading={isAnalyzing}
            error={uploadError}
          />

          {/* Quick Demo Pre-load Action */}
          <div className="p-4 rounded-xl bg-[#0F1523]/80 border border-[#232F48] hover:border-[#FF6B00]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-white uppercase block">
                  OR TEST WITH PRE-RECORDED BENCHMARK FILE:
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  signal_042.iq (48.2 MB // Tactical FHSS Recording)
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const mockFile = new File(['mock raw iq binary content data'], 'signal_042.iq', {
                  type: 'application/octet-stream',
                });
                handleFileSelected(mockFile);
              }}
              className="px-4 py-2.5 rounded-lg bg-[#161F33] hover:bg-[#FF6B00] hover:text-white border border-[#232F48] hover:border-[#FF6B00] text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider transition-all shadow-sm hover:shadow-[0_0_15px_rgba(255,107,0,0.35)]"
            >
              LOAD DEMO FILE
            </button>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#0F1523]/60 border border-[#232F48] space-y-1.5">
              <div className="flex items-center gap-2 text-[#FF6B00] font-bold">
                <Cpu className="w-4 h-4" />
                <span>CUDA ACCELERATED</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Automatic real-time quadrature balance correction, DC bias stripping, and Welch PSD extraction.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F1523]/60 border border-[#232F48] space-y-1.5">
              <div className="flex items-center gap-2 text-[#FFB000] font-bold">
                <Radio className="w-4 h-4" />
                <span>DUAL FORMAT SUPPORT</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Direct ingest of interleaved 32-bit float IQ binary stream or calibrated baseband WAV audio recordings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F1523]/60 border border-[#232F48] space-y-1.5">
              <div className="flex items-center gap-2 text-[#FF4D4D] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>ANOMALY TELEMETRY</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Automatic event localization for phase discontinuity, deep fade dropouts, and spectral regrowth.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
